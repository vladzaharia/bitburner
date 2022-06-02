import { NS } from "Netscript";
import { Backdoor } from "/helpers/backdoor.js";
import { Discover } from "/helpers/discover.js";

/** 
 * Automatically backdoor all available hosts.
 * 
 * @example
 * run /node/ps-control-backdoor.js
 * 
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_CRACKER.js", "home")) {
            const rootedHosts = Discover.getRootedHosts(ns);

            ns.clearLog();

            for (let i = 0; i < rootedHosts.length; i++) {
                const hostname = rootedHosts[i];
                await Backdoor.backdoor(ns, Discover.getRoute(ns, hostname));

                await ns.sleep(10 * 1000);
            }

            ns.print(`[ps-control-cracker] Finished backdooring nodes, sleeping for 15min at ${new Date().toTimeString()}`);
            await ns.sleep(15 * 60 * 1000);
        } else {
            ns.print(`[ps-control-cracker] Found file /flags/SKIP_BACKDOOR.js, sleeping for 1min at ${new Date().toTimeString()}`);
            await ns.sleep(60 * 1000);
        }

    }
}