import { NS } from "Netscript";
import { getRoute } from "/helpers/discover.js";

/**
 * Get route to a host using the Terminal.
 * @category Executable
 *
 * @example <caption>Gets route to single passed in host.</caption>
 * ```shell
 * run /helpers/backdoor.js [host0]
 * ```
 *
 * @example <caption>Gets route to multiple passed in hosts.</caption>
 * ```shell
 * run /helpers/backdor.js [host0] ... [hostn]
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length === 0) {
        throw "Function must be called with 1+ hostnames";
    }

    const hostnames: string[] = ns.args as string[];

    for (let i = 0; i < hostnames.length; i++) {
        const hostname = hostnames[i];

        ns.print(`[route] Getting route to ${hostname}`);

        await printRoute(ns, getRoute(ns, hostname));
    }
}

/**
 * Connect to a host chain using `route` and backdoor the last server.
 * @alpha Does not currently backdoor, only prints out route.
 * @category Importable
 *
 * @param {NS} ns - The Netscript object.
 * @param {string[]} route - Route to use to backdoor, including target.
 */
export async function printRoute(ns: NS, route: string[] | false) {
    ns.print(`[route] Connecting ${route}`);

    if (route) {
        //(ns as any).connect("home");
        ns.print(route.map((hn) => `${hn} [${ns.hasRootAccess(hn)}]`));
    } else {
        ns.print(`[route] No route to host!`);
    }
}