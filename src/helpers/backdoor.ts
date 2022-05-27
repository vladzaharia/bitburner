import { NS } from "Netscript";
import { getRoute } from "/helpers/discover.js";

/** @param { NS } ns */
export async function main(ns: NS) {
	if (ns.args.length === 0) {
		throw "Function must be called with 1+ hostnames";
	}

	const hostnames: string[] = ns.args as string[];

	for (let i = 0; i < hostnames.length; i++) {
		const hostname = hostnames[i];

		ns.print(`[backdoor] Executing crack on ${hostname}`)

		await backdoorHost(ns, await getRoute(ns, hostname));
	}
}

/** 
 * @param {NS} ns 
 * @param {string[]} route
 */
export async function backdoorHost(ns: NS, route: string[]) {
    ns.print(`[backdoor] Connecting ${route}`);

    if (route) {
        //(ns as any).connect("home");

        if (true) {            
            // Connect to target via route
            // for (let i = 0; i < route.length; i++) {
            //     (ns as any).connect(route);
            // }

            // Backdoor host
            //(ns as any).installBackdoor();
            
            ns.sleep(10000);
        } else {
        }
    } else {
        ns.print(`[backdoor] No route to host!`)
    }
}
