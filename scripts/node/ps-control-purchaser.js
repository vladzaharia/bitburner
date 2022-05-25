const PRICE_PER_GB = 55000;
const CONTROL_SERVERS = ["purchaser", "cracker", "scheduler"];
let RAM = 8;
const WORKERS_PER_POOL = 6;

/** @param {NS} ns */
export async function main(ns) {
    let purchasedServers = ns.getPurchasedServers();
    let i = purchasedServers.length; // Total purchased servers
    let j = 0; // Worker pool
    let k = 0; // Server in pool
    let max = ns.getPurchasedServerLimit();

    // Determine worker RAM
    const availMoney = Math.floor(ns.getServerMoneyAvailable("home"));
    
    if (availMoney > 125000000 && RAM < 64) {
        RAM = 128;
    } else if (availMoney > 50000000 && RAM < 64) {
        RAM = 64;
    } else if (availMoney > 10000000 && RAM < 32) {
        RAM = 32;
    } else if (availMoney > 1000000 && RAM < 16) {
        RAM = 16;
    } 

    ns.print(`[ps-control-purchaser] Purchased servers ${i}/${max}: ${purchasedServers}`)

    while (i < max) {
        // Ensure Control servers are purchased
        for (let j = 0; j < CONTROL_SERVERS.length; j++) {
            if (purchasedServers.indexOf("ps-control-"+CONTROL_SERVERS[j]) === -1) {
                await purchaseServer(ns, 8, "control", CONTROL_SERVERS[j]);
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
            await ns.sleep(60 * 1000);
        }
    }

    ns.print(`[ps-control-purchaser] At max personal servers (${max}): ${purchasedServers}`);
}

/**
 * @param {NS} ns
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