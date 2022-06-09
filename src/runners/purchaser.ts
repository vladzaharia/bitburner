import { NS } from "Netscript";

import { sleep } from "/helpers/sleep.js";

/** RAM to purchase, determined by available money and cost for max servers. */
let RAM = 8;

/** Cost of server per GB of RAM. */
const PRICE_PER_GB = 55000 * 25;

/** Number of workers per pool. */
const WORKERS_PER_POOL = 8;

/** Money reserved for worker servers. */
const MONEY_MULTIPLIER = 0.5;

/**
 * Automatically maintain personal servers.
 *
 * Each cycle will:
 *  - Check for RAM upgrade based on available money.
 *  - If RAM needs upgrading, sell all purchased servers.
 *  - Fill available servers up to capacity in pools.
 *
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /node/ps-control-purchaser.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_PURCHASER.js", "home")) {
            let purchasedServers = ns.getPurchasedServers();

            // Determine worker RAM
            const availMoney = Math.floor(
                ns.getServerMoneyAvailable("home") * MONEY_MULTIPLIER
            );
            ns.print(`[purchaser] Available money ${availMoney}`);

            // Check for upgrades from 16GB - 1TB
            checkForUpgrade(ns, availMoney, 4096, purchasedServers);
            checkForUpgrade(ns, availMoney, 2048, purchasedServers);
            checkForUpgrade(ns, availMoney, 1024, purchasedServers);
            checkForUpgrade(ns, availMoney, 512, purchasedServers);
            checkForUpgrade(ns, availMoney, 256, purchasedServers);
            checkForUpgrade(ns, availMoney, 128, purchasedServers);
            checkForUpgrade(ns, availMoney, 64, purchasedServers);
            checkForUpgrade(ns, availMoney, 32, purchasedServers);
            checkForUpgrade(ns, availMoney, 16, purchasedServers);

            purchasedServers = ns.getPurchasedServers();
            let i = purchasedServers.length; // Total purchased servers
            let j = 0; // Worker pool
            let k = 0; // Server in pool
            const max = ns.getPurchasedServerLimit();

            // End script if no upgrades possible
            if (RAM === 1024 && purchasedServers.length === max) {
                ns.print(`[purchaser] No further upgrades possible!`);
                return;
            }

            ns.print(
                `[purchaser] Purchased servers ${i}/${max}: ${purchasedServers}`
            );

            // Determine j, k
            if (i > 0) {
                const regex = /^ps-worker(\d)-(\d)$/;
                const latestServer =
                    purchasedServers[purchasedServers.length - 1];
                ns.print(`[purchaser] Checking latest server ${latestServer}`);

                const match = latestServer.match(regex);

                if (match) {
                    j = parseInt(match[1], 10);
                    k = parseInt(match[2], 10) + 1;
                }
            }

            while (i < max) {
                // Check if last node in pool
                if (k >= WORKERS_PER_POOL) {
                    k = 0;
                    j++;
                }

                // Purchase a worker node
                const purchased = purchaseServer(
                    ns,
                    RAM,
                    `worker${j}`,
                    k.toString()
                );

                if (purchased) {
                    purchasedServers = ns.getPurchasedServers();
                    i = purchasedServers.length;
                    k++;

                    await sleep(ns, 1000, false);
                } else {
                    await sleep(ns, 5 * 60 * 1000, false);
                }
            }

            ns.print(`[purchaser] At max personal servers (${max})`);
            await sleep(ns, 30 * 60 * 1000);
        } else {
            ns.print(`[watcher] Found file /flags/SKIP_PURCHASER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}

/**
 * Check RAM level based on available money, and sell servers if needed.
 *
 * @param {NS} ns - The Netscript object.
 * @param {number} availMoney - The player's available money.
 * @param {number} ram - The amount of RAM to check for.
 * @param {string[]} purchasedServers - The current list of purchased servers.
 */
function checkForUpgrade(
    ns: NS,
    availMoney: number,
    ram: number,
    purchasedServers: string[]
) {
    ns.print(
        `[purchaser] Checking for ${ram}GB upgrade, ${
            PRICE_PER_GB * ram
        } < ${availMoney} && ${RAM} < ${ram}`
    );

    if (PRICE_PER_GB * ram < availMoney && RAM < ram) {
        RAM = ram;
        ns.print(`[purchaser] Setting RAM to ${ram} and selling servers`);
        sellWorkerServers(ns, purchasedServers);
    }
}

/**
 * Purchase a new server, with hostname `ps-[type]-[name]`.
 *
 * @param {NS} ns - The Netscript object.
 * @param {number} ram - Amount of RAM in new server.
 * @param {string} type - The type of server, either "control" or "worker[pool]".
 * @param {string} name - The name of the server.
 * @returns {boolean} Whether the server was purchased.
 */
function purchaseServer(
    ns: NS,
    ram: number,
    type: string,
    name: string
): boolean {
    const availMoney = Math.floor(
        ns.getServerMoneyAvailable("home") * MONEY_MULTIPLIER
    );
    const neededMoney = ns.getPurchasedServerCost(ram);

    // Check if we have enough money to purchase a server
    if (availMoney > neededMoney) {
        // Determine server name
        const fullName = `ps-${type}-${name}`;

        ns.print(
            `[purchaser] Purchasing server: ${fullName}, ${ram}GB for $${neededMoney}`
        );
        ns.purchaseServer(fullName, ram);
        return true;
    } else {
        ns.print(`[purchaser] Need more money: ${availMoney}/${neededMoney}`);
        return false;
    }
}

/**
 * Sells all worker servers, with hostnames starting with "pserv" or "ps-worker".
 *
 * @param {NS} ns - The Netscript object.
 * @param {string[]} allServers - The list of all personal servers.
 */
function sellWorkerServers(ns: NS, allServers: string[]) {
    if (!allServers || allServers.length === 0) {
        return;
    }

    const purchasedWorkers = allServers.filter(
        (hn) => hn.startsWith("pserv") || hn.startsWith("ps-worker")
    );

    if (ns.getServerMaxRam(purchasedWorkers[0]) < RAM) {
        purchasedWorkers.forEach((hn) => sellServer(ns, hn));
    } else {
        ns.print(`Servers already satisfy ${RAM}GB RAM requirement`);
    }
}

/**
 * Sell a single server.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname of the server to sell.
 */
function sellServer(ns: NS, hostname: string) {
    ns.killall(hostname);
    ns.deleteServer(hostname);
}