import { NS } from "Netscript";
import { canHack, getRoute } from "/helpers/discover.js";

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
    ns.clearLog();
    ns.disableLog("ALL");

    if (ns.args.length === 0) {
        throw "Function must be called with 1+ hostnames";
    }

    for (const hostname of ns.args as string[]) {
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
    if (route) {
        const _getRootedString = (hn: string) =>
            `${hn} [` +
            (canHack(ns, hn)
                ? "true"
                : `${ns.getHackingLevel()}/${ns.getServerRequiredHackingLevel(
                      hn
                  )}`) +
            `]`;

        ns.print(
            `[route] Final route: ` + route.map((hn) => _getRootedString(hn))
        );
    } else {
        ns.print(`[route] No route to host!`);
    }
}
