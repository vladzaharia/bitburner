import { NS } from "Netscript";

/**
 * Sell servers from the Terminal.
 * @category Executable
 * @export
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
        throw new Error("Function must be called with servers to sell!");
    }

    for (const hostname of ns.args as string[]) {
        ns.killall(hostname);
        ns.deleteServer(hostname);
    }
}
