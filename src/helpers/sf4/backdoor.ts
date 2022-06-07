import { NS } from "Netscript";
import { crack } from "../crack";
import { getRoute } from "/helpers/discover.js";

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
        throw "Function must be called with 1+ hostnames";
    }

    const hostnames: string[] = ns.args as string[];

    for (let i = 0; i < hostnames.length; i++) {
        const hostname = hostnames[i];

        ns.print(`[backdoor] Executing crack on ${hostname}`);

        await backdoor(ns, getRoute(ns, hostname));
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
export async function backdoor(ns: NS, route: string[] | false) {
    ns.print(`[backdoor] Connecting ${route}`);

    if (route) {
        //(ns as any).connect("home");
        ns.print(route.map((hn) => `${hn} [${ns.hasRootAccess(hn)}]`));

        if (true) {
            // Connect to target via route
            for (let i = 0; i < route.length; i++) {
                ns.singularity.connect(route[i]);
            }

            // Crack host
            crack(ns, route[route.length - 1]);

            // Backdoor host
            ns.singularity.installBackdoor();

            await ns.sleep(10 * 1000);
        } else {
            //nop
        }
    } else {
        ns.print(`[backdoor] No route to host!`);
    }
}