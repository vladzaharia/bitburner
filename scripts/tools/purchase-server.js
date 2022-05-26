/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    // RAM amount, configurable as arg[0]
    let ram = 64;

    // Number of servers and max, configurable as arg[1]
    const purchasedServers = ns.getPurchasedServers();
    const newPurchasedServers = [];
    let i = purchasedServers.length;
    let max = ns.getPurchasedServerLimit();
    
    if (ns.args.length > 0) {
        ram = ns.args[0];

        if (ns.args.length > 1) {
            max = ns.args[1];
        }
    }

    while (i < max) {
        const availMoney = Math.floor(ns.getServerMoneyAvailable("home"));
        const neededMoney = ns.getPurchasedServerCost(ram);
        // Check if we have enough money to purchase a server
        if (availMoney > neededMoney) {
            var hostname = ns.purchaseServer(`pserv-${ram}g-${i}`, ram);
            ++i;
            newPurchasedServers.push(hostname);
        } else {
            ns.print(`[purchase-server] Need more money: ${availMoney}/${neededMoney}`);
            await ns.sleep(60*1000);
        }
    }

    ns.print(`[purchase-server] New servers: ${newPurchasedServers}`);
    ns.print(`[purchase-server] All servers: ${purchasedServers.concat(newPurchasedServers)}`);

    return newPurchasedServers;
}