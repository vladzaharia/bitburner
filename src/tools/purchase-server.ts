import { NS } from "Netscript";

/** 
 * @param {NS} ns
 */
export async function main(ns: NS) {
    if (ns.args.length < 2) {
        throw "Function must be called with RAM and 1+ hostnames!";
    }

    const ram = ns.args[0] as number;
    const hostnames = ns.args.splice(1) as string[];

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