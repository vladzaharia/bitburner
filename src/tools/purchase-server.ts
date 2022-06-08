import { NS } from "Netscript";

/**
 * Purchase new servers from the Terminal.
 * @category Executable
 * @export
 *
 * @example <caption>Purchase a single server with given RAM.</caption>
 * ```shell
 * run /tools/purchase-server.js [ram] [host0]
 * ```
 *
 * @example <caption>Purchase multiple servers, each with given RAM.</caption>
 * ```shell
 * run /tools/purchase-server.js [ram] [host0] ... [hostn]
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length < 2) {
        throw "Function must be called with RAM and 1+ hostnames!";
    }

    const ram = ns.args[0] as number;
    const hostnames = ns.args.splice(1) as string[];

    for (const hostname of hostnames) {
        const availMoney = Math.floor(ns.getServerMoneyAvailable("home"));
        const neededMoney = ns.getPurchasedServerCost(ram);

        // Check if we have enough money to purchase a server
        if (availMoney > neededMoney) {
            ns.purchaseServer(hostname, ram);
        } else {
            ns.print(
                `[purchase-server] Need more money: ${availMoney}/${neededMoney}`
            );
        }
    }
}
