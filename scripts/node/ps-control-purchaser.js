const PRICE_PER_GB = 55000;
const CONTROL_SERVERS = ["purchaser",  "hacknet", "cracker", "scheduler"];
let RAM = 8;
const WORKERS_PER_POOL = 6;

// Amount of money dedicated to servers
const MONEY_MULTIPLIER = 0.50;

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    ns.disableLog("ALL");

    while (true) {
        let purchasedServers = ns.getPurchasedServers();

        // Determine worker RAM
        const availMoney = Math.floor(ns.getServerMoneyAvailable("home") * MONEY_MULTIPLIER);
        ns.print(`[ps-control-purchaser] Available money ${availMoney}`);

        if (availMoney > 1000000000 && RAM < 64) {
            RAM = 512;
            ns.print(`[ps-control-purchaser] Setting RAM to ${RAM} and selling servers`);
            await sellWorkerServers(ns, purchasedServers);
        } else if (availMoney > 500000000 && RAM < 64) {
            RAM = 256;
            ns.print(`[ps-control-purchaser] Setting RAM to ${RAM} and selling servers`);
            await sellWorkerServers(ns, purchasedServers);
        } else if (availMoney > 125000000 && RAM < 64) {
            RAM = 128;
            ns.print(`[ps-control-purchaser] Setting RAM to ${RAM} and selling servers`);
            await sellWorkerServers(ns, purchasedServers);
        } else if (availMoney > 50000000 && RAM < 64) {
            RAM = 64;
            ns.print(`[ps-control-purchaser] Setting RAM to ${RAM} and selling servers`);
            await sellWorkerServers(ns, purchasedServers);
        } else if (availMoney > 10000000 && RAM < 32) {
            RAM = 32;
            ns.print(`[ps-control-purchaser] Setting RAM to ${RAM} and selling servers`);
            await sellWorkerServers(ns, purchasedServers);
        } else if (availMoney > 1000000 && RAM < 16) {
            RAM = 16;
            ns.print(`[ps-control-purchaser] Setting RAM to ${RAM} and selling servers`);
            await sellWorkerServers(ns, purchasedServers);
        } 
        
        let i = purchasedServers.length; // Total purchased servers
        let j = 0; // Worker pool
        let k = 0; // Server in pool
        let max = ns.getPurchasedServerLimit();

        ns.print(`[ps-control-purchaser] Purchased servers ${i}/${max}`)

        while (i < max) {
            // Ensure Control servers are purchased
            for (let j = 0; j < CONTROL_SERVERS.length; j++) {
                if (purchasedServers.indexOf("ps-control-"+CONTROL_SERVERS[j]) === -1) {
                    let ram = 8;
                    if (CONTROL_SERVERS[j] === "purchaser") {
                        ram = 16
                    }

                    await purchaseServer(ns, ram, "control", CONTROL_SERVERS[j]);
                }
            }

            // Purchase a worker node
            const purchased = await purchaseServer(ns, RAM, `worker${j}`, k);

            if (purchased) {
                purchasedServers = ns.getPurchasedServers();
                i = purchasedServers.length;
                k++;

                // Check if last node in pool
                if (k === WORKERS_PER_POOL) {
                    k = 0;
                    j++;
                }

                await ns.sleep(1000);
            } else {
                await ns.sleep(15 * 60 * 1000);
            }
        }

        ns.print(`[ps-control-purchaser] At max personal servers (${max})`);
        await ns.sleep(60 * 60 * 1000);
    }
}

/**
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {number} ram
 * @param {string} type
 * @param {string} name
 */
async function purchaseServer(ns, ram, type, name) {
    const availMoney = Math.floor(ns.getServerMoneyAvailable("home"));
    const neededMoney = ns.getPurchasedServerCost(ram);
    
    // Check if we have enough money to purchase a server
    if (availMoney > neededMoney) {
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