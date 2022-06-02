import { NS } from "Netscript";
import { getRoute } from "/helpers/discover.js";

/**
 * Backdoor a host using the Terminal.
 *
 * @example <caption>Backdoor single passed in host.</caption>
 * run /helpers/backdoor.js [host0]
 *
 * @example <caption>Backdoor multiple passed in hosts.</caption>
 * run /helpers/backdor.js [host0] ... [hostn]
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
            // for (let i = 0; i < route.length; i++) {
            //     (ns as any).connect(route);
            // }

            // Backdoor host
            //(ns as any).installBackdoor();

            await ns.sleep(10 * 1000);
        } else {
        }
    } else {
        ns.print(`[backdoor] No route to host!`);
    }
}
