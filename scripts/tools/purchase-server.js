/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    if (ns.args < 2) {
        throw "Function must be called with RAM and 1+ hostnames!";
    }

    const ram = ns.args[0];
    const hostnames = ns.args.split(1);

    for (let i = 0; i < hostnames.length; i++) {
        const hostname = hostnames[i];
        const availMoney = Math.floor(ns.getServerMoneyAvailable("home"));
        const neededMoney = ns.getPurchasedServerCost(ram);
    
        // Check if we have enough money to purchase a server
        if (availMoney > neededMoney) {
            ns.purchaseServer(hostname, ram);
        } else {
            ns.print(`[purchase-server] Need more money: ${availMoney}/${neededMoney}`);
        }
    }

}