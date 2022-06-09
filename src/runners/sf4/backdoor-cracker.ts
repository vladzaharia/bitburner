import { NS } from "Netscript";

import { crack } from "/helpers/crack";
import {
    getCrackableHosts,
    getRootedHosts,
    getRoute,
} from "/helpers/discover.js";
import { backdoor } from "/helpers/sf4/backdoor.js";
import { sleep } from "/helpers/sleep.js";

/**
 * Automatically backdoor all available hosts.
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /node/ps-control-backdoor.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_CRACKER.js", "home")) {
            ns.print(`[cracker] Cracking all possible nodes`);
            const crackableHosts = getCrackableHosts(ns);
            ns.clearLog();

            // Crack all possible hosts
            crackableHosts.forEach((hn) => crack(ns, hn));

            ns.print(`[cracker] Finished cracking nodes, backdooring`);

            const rootedHosts = getRootedHosts(ns);

            // Backdoor all rooted hosts
            for (const hostname of rootedHosts) {
                await backdoor(ns, getRoute(ns, hostname));
                await sleep(ns, 10 * 1000, false);
            }

            ns.print(`[cracker] Finished backdooring nodes`);
            await sleep(ns, 15 * 60 * 1000);
        } else {
            ns.print(`[cracker] Found file /flags/SKIP_CRACKER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}
