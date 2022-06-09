import { Hacknet, NS } from "Netscript";

import { sleep } from "/helpers/sleep.js";

/** Gain per level upgrade (manually added) */
const MONEY_PER_LEVEL = 6.751;

/** Gain per RAM upgrade (manually added) */
const MONEY_PER_RAM = 74.856;

/** Gain per core upgrade (manually added) */
const MONEY_PER_CORE = 39.38;

/** Money reserved for Hacknet upgrades. */
const MONEY_MULTIPLIER = 0.05;

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

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_HACKNET.js", "home")) {
            let numNodes = hacknet.numNodes();

            // Purchase initial node if needed
            if (numNodes === 0) {
                // Purchase and normalize level
                hacknet.purchaseNode();
                hacknet.upgradeLevel(0, 4);

                // Increment numNodes so the rest of the script is happy
                numNodes++;
            }

            // Upgrade all nodes to node[0]
            const baseNode = hacknet.getNodeStats(0);
            for (let i = 0; i < numNodes; i++) {
                const node = hacknet.getNodeStats(i);

                if (node.production < baseNode.production) {
                    upgradeToBaseline(ns, i);
                    await sleep(ns, 1000, false);
                }
            }

            // Get available money for Hacknet upgrades
            const moneyAvail = Math.floor(
                ns.getServerMoneyAvailable("home") * MONEY_MULTIPLIER
            );
            ns.print(`[hacknet] Available money ${moneyAvail}`);

            // Get cost of new node
            const newNodeCost = Math.ceil(hacknet.getPurchaseNodeCost());
            ns.print(`[hacknet] New node cost ${newNodeCost}`);

            // Get cost and benefit of purchasing 5 level upgrades
            const levelCost = Math.ceil(
                hacknet.getLevelUpgradeCost(0, 5) * numNodes
            );
            const levelAdv =
                levelCost === Infinity
                    ? Infinity
                    : Math.floor(levelCost / (MONEY_PER_LEVEL * 5));
            ns.print(
                `[hacknet] Level cost ${levelCost}, cost/benefit ${levelAdv}`
            );

            // Get cost and benefit of purchasing 1 RAM upgrade
            const ramCost = Math.ceil(
                hacknet.getRamUpgradeCost(0, 1) * numNodes
            );
            const ramAdv =
                ramCost === Infinity
                    ? Infinity
                    : Math.floor(ramCost / MONEY_PER_RAM);
            ns.print(`[hacknet] RAM cost ${ramCost}, cost/benefit ${ramAdv}`);

            // Get cost and benefit of purchasing 1 core upgrade
            const coreCost = Math.ceil(
                hacknet.getCoreUpgradeCost(0, 1) * numNodes
            );
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
                newNodeCost < moneyAvail &&
                hacknet.numNodes() < hacknet.maxNumNodes()
            ) {
                ns.print(`[hacknet] Buying new node`);
                hacknet.purchaseNode();
            } else if (
                shouldSkip(ns, moneyAvail, coreCost, levelAdv, coreAdv) ||
                shouldSkip(ns, moneyAvail, coreCost, ramAdv, coreAdv)
            ) {
                if (shouldSkip(ns, moneyAvail, ramCost, levelAdv, ramAdv)) {
                    if (levelCost < moneyAvail) {
                        ns.print(`[hacknet] Upgrading level`);
                        upgradeOnAll(hacknet, hacknet.upgradeLevel, 5);
                    } else {
                        ns.print(`[hacknet] Skipping upgrades`);
                        await sleep(ns, 5 * 60 * 1000);
                    }
                } else {
                    ns.print(`[hacknet] Upgrading RAM`);
                    upgradeOnAll(hacknet, hacknet.upgradeRam);
                }
            } else {
                ns.print(`[hacknet] Upgrading cores`);
                upgradeOnAll(hacknet, hacknet.upgradeCore);
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
    moneyAvail: number,
    cost2: number,
    benefit1: number,
    benefit2: number
): boolean {
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

/**
 * Run upgrade `fn` on all nodes.
 *
 * @param {Hacknet} hacknet - The Hacknet object.
 * @param {function} fn - The `upgradeX` funcrion to run.
 */
function upgradeOnAll(
    hacknet: Hacknet,
    fn: (i: number, n: number) => boolean,
    n = 1
) {
    const numNodes = hacknet.numNodes();

    for (let i = 0; i < numNodes; i++) {
        fn(i, n);
    }
}

/**
 * Upgrade node to "baseline" (first node).
 *
 * @param {NS} ns - The Netscript object.
 * @param {number} index - The hacknet node to upgrade.
 */
function upgradeToBaseline(ns: NS, index: number) {
    ns.print(`[hacknet] Upgrading ${index} to baseline stats`);

    const hacknet = ns.hacknet;
    const baseNode = hacknet.getNodeStats(0);
    const node = hacknet.getNodeStats(index);

    if (node.level < baseNode.level) {
        ns.print(
            `[hacknet] Upgrading level ${node.level} -> ${baseNode.level}`
        );
        hacknet.upgradeLevel(index, baseNode.level - node.level);
    }
    if (node.ram < baseNode.ram) {
        ns.print(`[hacknet] Upgrading RAM ${node.ram} -> ${baseNode.ram}`);
        hacknet.upgradeRam(
            index,
            Math.log2(baseNode.ram) - Math.log2(node.ram)
        );
    }
    if (node.cores < baseNode.cores) {
        ns.print(
            `[hacknet] Upgrading cores ${node.cores} -> ${baseNode.cores}`
        );
        hacknet.upgradeCore(index, baseNode.cores - node.cores);
    }
}

// /**
//  * @param {Hacknet} hacknet
//  * @param {number} nodeId
//  */
// function getNodeUpgradeCost(hacknet, nodeId) {
// 	const baseNode = hacknet.getNodeStats(0);
// 	const node = hacknet.getNodeStats(nodeId);

// 	return hacknet.getLevelUpgradeCost(nodeId, (baseNode.level) - )
// }

// /** @param {Hacknet} hacknet */
// function getNodeBenefit(hacknet) {
// 	const node = hacknet.getNodeStats(0);
// 	return (node.cores * MONEY_PER_CORE) + (node.ram * MONEY_PER_RAM) + (node.level * MONEY_PER_LEVEL);
// }
