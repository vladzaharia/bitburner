import { NS } from "Netscript";

import { HacknetPurchaser } from "/_internal/classes/purchaser/hacknet.js";
import { sleep } from "/helpers/sleep.js";

/** Gain per level upgrade (manually added) */
const MONEY_PER_LEVEL = 6.751;

/** Gain per RAM upgrade (manually added) */
const MONEY_PER_RAM = 74.856;

/** Gain per core upgrade (manually added) */
const MONEY_PER_CORE = 39.38;

/**
 * Automatically maintain Hacknet nodes.
 *
 * Each cycle will:
 *  - Upgrade any nodes to "baseline" (first node).
 *  - Compare cost/benefit of each upgrade.
 *  - Purchase best available upgrade across all nodes or purchase a new node.
 *
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /node/ps-control-hacknet.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    const hacknet = ns.hacknet;
    const hacknetPurchaser = new HacknetPurchaser(ns);

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_HACKNET.js", "home")) {
            // Upgrade all nodes to baseline
            await hacknetPurchaser.upgradeAllNodesToBaseline();

            // Get cost of new node
            const newNodeCost = hacknetPurchaser.getPurchaseCost({
                upgrade: "node",
            });
            ns.print(`[hacknet] New node cost ${newNodeCost}`);

            // Get cost and benefit of purchasing 5 level upgrades
            const levelCost = hacknetPurchaser.getPurchaseCost({
                upgrade: "level",
            });
            const levelAdv =
                levelCost === Infinity
                    ? Infinity
                    : Math.floor(levelCost / (MONEY_PER_LEVEL * 5));
            ns.print(
                `[hacknet] Level cost ${levelCost}, cost/benefit ${levelAdv}`
            );

            // Get cost and benefit of purchasing 1 RAM upgrade
            const ramCost = hacknetPurchaser.getPurchaseCost({
                upgrade: "ram",
            });
            const ramAdv =
                ramCost === Infinity
                    ? Infinity
                    : Math.floor(ramCost / MONEY_PER_RAM);
            ns.print(`[hacknet] RAM cost ${ramCost}, cost/benefit ${ramAdv}`);

            // Get cost and benefit of purchasing 1 core upgrade
            const coreCost = hacknetPurchaser.getPurchaseCost({
                upgrade: "core",
            });
            const coreAdv = Math.floor(coreCost / MONEY_PER_CORE);
            ns.print(
                `[hacknet] Core cost ${coreCost}, cost/benefit ${coreAdv}`
            );

            // End script if no upgrades possible
            if (
                levelCost === Infinity &&
                ramCost === Infinity &&
                coreCost === Infinity
            ) {
                ns.print(`[hacknet] No further upgrades possible!`);
                return;
            }

            // Purchase best upgrade
            if (
                hacknetPurchaser.canPurchase({ upgrade: "node" }) &&
                hacknet.numNodes() < hacknet.maxNumNodes()
            ) {
                ns.print(`[hacknet] Buying new node`);
                hacknet.purchaseNode();
            } else if (
                shouldSkip(ns, coreCost, levelAdv, coreAdv) ||
                shouldSkip(ns, coreCost, ramAdv, coreAdv)
            ) {
                if (shouldSkip(ns, ramCost, levelAdv, ramAdv)) {
                    if (hacknetPurchaser.canPurchase({ upgrade: "level" })) {
                        ns.print(`[hacknet] Upgrading level`);
                        hacknetPurchaser.purchaseOnAllNodes({
                            upgrade: "level",
                            num: 5,
                        });
                    } else {
                        ns.print(`[hacknet] Skipping upgrades`);
                        await sleep(ns, 5 * 60 * 1000);
                    }
                } else {
                    ns.print(`[hacknet] Upgrading RAM`);
                    hacknetPurchaser.purchaseOnAllNodes({ upgrade: "ram" });
                }
            } else {
                ns.print(`[hacknet] Upgrading cores`);
                hacknetPurchaser.purchaseOnAllNodes({ upgrade: "core" });
            }

            await sleep(ns, 2 * 1000, false);
        } else {
            ns.print(`[hacknet] Found file /flags/SKIP_HACKNET.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}

/**
 * Check if we should skip buying an upgrade.
 *
 * Will return true if we don't have enough money, or the cost/benefit is low.
 * Returns false if the upgrade is highly advantageous to buy.
 *
 * @param {number} moneyAvail - The player's available money.
 * @param {number} cost2 - The cost of upgrade2.
 * @param {number} benefit1 - The cost/benefit of upgrade1.
 * @param {number} benefit2 - The cost/benefit of upgrade2.
 * @returns {boolean} Whether upgrade2 should be bought over upgrade1.
 */
function shouldSkip(
    ns: NS,
    cost2: number,
    benefit1: number,
    benefit2: number
): boolean {
    const moneyAvail = ns.getServerMoneyAvailable("home");
    const costSkip = cost2 > moneyAvail;
    const benefitSkip = benefit1 < benefit2;
    const costOverride =
        benefit2 * 100 < benefit1 ||
        (benefit2 * 2 < benefit1 && cost2 < moneyAvail * 3);

    if (costOverride) {
        return !costOverride;
    }
    return costSkip || benefitSkip;
}
