/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    if (ns.args < 2) {
        throw "Function must be called with hostname and RAM!";
    }
    
    const hostname = ns.args[0];
    const ram = ns.args[1];

    const availMoney = Math.floor(ns.getServerMoneyAvailable("home"));
    const neededMoney = ns.getPurchasedServerCost(ram);
    
    // Check if we have enough money to purchase a server
    if (availMoney > neededMoney) {
        ns.purchaseServer(hostname, ram);
    } else {
        ns.print(`[purchase-server] Need more money: ${availMoney}/${neededMoney}`);
    }
}