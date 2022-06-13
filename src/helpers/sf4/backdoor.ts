import { NS } from "Netscript";

import { Scanner } from "/_internal/classes/scanner.js";

/**
 * Backdoor a host using the Terminal.
 * @alpha Does not currently backdoor, only prints out route.
 * @category Executable
 *
 * @example <caption>Backdoor single passed in host.</caption>
 * ```shell
 * run /helpers/backdoor.js [host0]
 * ```
 *
 * @example <caption>Backdoor multiple passed in hosts.</caption>
 * ```shell
 * run /helpers/backdor.js [host0] ... [hostn]
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length === 0) {
        throw new Error("Function must be called with 1+ hostnames");
    }

    const scanner = new Scanner(ns);

    for (const hostname of ns.args as string[]) {
        ns.print(`[backdoor] Executing crack on ${hostname}`);

        const host = scanner.getHost(hostname);

        await backdoor(ns, host.route);
    }
}

/**
 * Connect to a host chain using `route` and backdoor the last server.
 * @alpha Does not currently backdoor, only prints out route.
 * @category Importable
 * @export
 * @async
 *
 * @param {NS} ns - The Netscript object.
 * @param {string[]} route - Route to use to backdoor, including target.
 */
export async function backdoor(ns: NS, route: string[] | false) {
    if (route) {
        const target = route[route.length - 1];

        ns.print(`[backdoor] Connecting to ${target}`);

        ns.print(route.map((hn) => `${hn} [${ns.hasRootAccess(hn)}]`));
        // Connect to target via route
        for (const host of route) {
            if (!ns.hasRootAccess(host)) {
                ns.print(
                    `[backdoor] Can't reach ${target} as ${host} isn't cracked yet!`
                );
                return;
            }

            ns.singularity.connect(host);
        }

        ns.print(`[backdoor] Backdooring ${target}`);

        // Backdoor host
        await ns.singularity.installBackdoor();
    } else {
        ns.print(`[backdoor] No route to host!`);
    }
}
