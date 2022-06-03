import { NS } from "Netscript";
import { crack } from "/helpers/crack.js";
import { getCrackableHosts, getRootedHosts } from "/helpers/discover.js";

/**
 * Automatically crack all available hosts.
 * @category Executable
 *
 * @example
 * ```shell
 * run /node/ps-control-cracker.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_CRACKER.js", "home")) {
            const crackableHosts = getCrackableHosts(ns);

            ns.clearLog();

            crackableHosts.forEach((hn) => crack(ns, hn));

            getRootedHosts(ns, crackableHosts);

            ns.print(
                `[cracker] Finished cracking nodes, sleeping for 5min at ${new Date().toTimeString()}`
            );
            await ns.sleep(5 * 60 * 1000);
        } else {
            ns.print(
                `[cracker] Found file /flags/SKIP_CRACKER.js, sleeping for 1min at ${new Date().toTimeString()}`
            );
            await ns.sleep(60 * 1000);
        }
    }
}
