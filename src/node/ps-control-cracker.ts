import { NS } from "Netscript";
import { Crack } from "/helpers/crack.js";
import { Discover } from "/helpers/discover.js";

/** 
 * Automatically crack all available hosts.
 * 
 * @example
 * run /node/ps-control-cracker.js
 * 
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_CRACKER.js", "home")) {
            const crackableHosts = Discover.getCrackableHosts(ns);

            ns.clearLog();

            for (let i = 0; i < crackableHosts.length; i++) {
                const hostname = crackableHosts[i];
                Crack.crack(ns, hostname);
            }

            Discover.getRootedHosts(ns, crackableHosts);

            ns.print(`[ps-control-cracker] Finished cracking nodes, sleeping for 15min at ${new Date().toTimeString()}`);
            await ns.sleep(15 * 60 * 1000);
        } else {
            ns.print(`[ps-control-cracker] Found file /flags/SKIP_CRACKER.js, sleeping for 1min at ${new Date().toTimeString()}`);
            await ns.sleep(60 * 1000);
        }

    }
}