import { NS } from "Netscript";

/**
 * Sell servers from the Terminal.
 * @category Executable
 *
 * @example <caption>Sell a single server with given hostname.</caption>
 * ```shell
 * run /tools/sell-server.js [host]
 * ```
 *
 * @example <caption>Sell multiple servers with given hostnames.</caption>
 * ```shell
 * run /tools/sell-server.js [host0] ... [hostn]
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length === 0) {
        throw "Function must be called with servers to sell!";
    }

    const purchasedServers = ns.args as string[];

    for (let i = 0; i < purchasedServers.length; i++) {
        ns.killall(purchasedServers[i]);
        ns.deleteServer(purchasedServers[i]);
    }
}
