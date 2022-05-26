const PRICE_PER_GB = 55000 * 25;
const CONTROL_SERVERS = ["purchaser",  "hacknet", "cracker", "scheduler"];
let RAM = 8;
const WORKERS_PER_POOL = 8;

// Amount of money dedicated to servers
const MONEY_MULTIPLIER = 0.50;

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    ns.disableLog("ALL");

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_PURCHASER.js", "home")) {
            let purchasedServers = ns.getPurchasedServers();

            // Determine worker RAM
            const availMoney = Math.floor(ns.getServerMoneyAvailable("home") * MONEY_MULTIPLIER);
            ns.print(`[ps-control-purchaser] Available money ${availMoney}`);

            // Check for upgrades from 16 - 512GB
            await checkForUpgrade(ns, availMoney, 512, purchasedServers);
            await checkForUpgrade(ns, availMoney, 256, purchasedServers);
            await checkForUpgrade(ns, availMoney, 128, purchasedServers);
            await checkForUpgrade(ns, availMoney, 64, purchasedServers);
            await checkForUpgrade(ns, availMoney, 32, purchasedServers);
            await checkForUpgrade(ns, availMoney, 16, purchasedServers);
            
            let i = purchasedServers.length; // Total purchased servers
            let j = 0; // Worker pool
            let k = 0; // Server in pool
            let max = ns.getPurchasedServerLimit();

            ns.print(`[ps-control-purchaser] Purchased servers ${i}/${max}: ${purchasedServers}`)

            // Determine j, k
            if (i > 0) {
                const regex = /^ps-worker(\d)-(\d)$/;
                const latestServer = purchasedServers[purchasedServers.length - 1];
                ns.print(`[ps-control-purchaser] Checking latest server ${latestServer}`)

                const match = latestServer.match(regex);
                
                j = parseInt(match[1], 10);
                k = parseInt(match[2], 10) + 1;
            }

            while (i < max) {
                // // Ensure Control servers are purchased
                // for (let j = 0; j < CONTROL_SERVERS.length; j++) {
                //     if (purchasedServers.indexOf("ps-control-"+CONTROL_SERVERS[j]) === -1) {
                //         let ram = 8;
                //         if (CONTROL_SERVERS[j] === "purchaser") {
                //             ram = 16
                //         }

                //         await purchaseServer(ns, ram, "control", CONTROL_SERVERS[j]);
                //     }
                // }

                // Check if last node in pool
                if (k >= WORKERS_PER_POOL) {
                    k = 0;
                    j++;
                }

                // Purchase a worker node
                const purchased = await purchaseServer(ns, RAM, `worker${j}`, k);

                if (purchased) {
                    purchasedServers = ns.getPurchasedServers();
                    i = purchasedServers.length;
                    k++;

                    await ns.sleep(1000);
                } else {
                    await ns.sleep(5 * 60 * 1000);
                }
            }

            ns.print(`[ps-control-purchaser] At max personal servers (${max}), sleeping for 30min at ${new Date().toTimeString()}`);
            await ns.sleep(30 * 60 * 1000);
        } else {
            ns.print(`[ps-control-watcher] Found file /flags/SKIP_PURCHASER.js, sleeping for 1min at ${new Date().toTimeString()}`);
            await ns.sleep(60 * 1000);
        }
    }
}

/**
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {number} ram
 * @param {string[]} purchasedServers
 */
async function checkForUpgrade(ns, availMoney, ram, purchasedServers) {
    ns.print(`[ps-control-purchaser] Checking for ${ram}GB upgrade, ${PRICE_PER_GB * ram} < ${availMoney} && ${RAM} < ${ram}`);

    if ((PRICE_PER_GB * ram) < availMoney && RAM < ram) {
        RAM = ram;
        ns.print(`[ps-control-purchaser] Setting RAM to ${ram} and selling servers`);
        await sellWorkerServers(ns, purchasedServers);
    } 
}

/**
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {number} ram
 * @param {string} type
 * @param {string} name
 */
async function purchaseServer(ns, ram, type, name) {
    const availMoney = Math.floor(ns.getServerMoneyAvailable("home") * MONEY_MULTIPLIER);
    const neededMoney = ns.getPurchasedServerCost(ram);
    
    // Check if we have enough money to purchase a server
    if (availMoney > neededMoney) {
        // Determine server name
        const fullName = `ps-${type}-${name}`;

        ns.print(`[ps-control-purchaser] Purchasing server: ${fullName}, ${ram}GB for $${neededMoney}`);
        return ns.purchaseServer(fullName, ram);
    } else {
        ns.print(`[ps-control-purchaser] Need more money: ${availMoney}/${neededMoney}`);
        return false;
    }
}

/**
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {string[]} allServers
 */
async function sellWorkerServers(ns, allServers) {
    if (!allServers || allServers.length === 0) {
        return;
    }

    const purchasedWorkers = allServers.filter((hn) => hn.startsWith("pserv") || hn.startsWith("ps-worker"));

    if (ns.getServerMaxRam(purchasedWorkers[0]) < RAM) {
        for (let i = 0; i < purchasedWorkers.length; i++) {
            await sellServer(ns, purchasedWorkers[i]);
        }
    } else {
        ns.print(`Servers already satisfy ${RAM}GB RAM requirement`);
    }
}

/**
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {string} hostname
 */
async function sellServer(ns, hostname) {
    await ns.killall(hostname);
    await ns.deleteServer(hostname);
}