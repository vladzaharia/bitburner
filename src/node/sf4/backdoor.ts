import { NS } from "Netscript";
import { backdoor } from "/helpers/sf4/backdoor.js";
import { getRootedHosts, getRoute } from "/helpers/discover.js";
import { sleep } from "/helpers/sleep.js";

/**
 * Automatically backdoor all available hosts.
 * @category Executable
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
            const rootedHosts = getRootedHosts(ns);

            ns.clearLog();

            for (let i = 0; i < rootedHosts.length; i++) {
                const hostname = rootedHosts[i];
                await backdoor(ns, getRoute(ns, hostname));
                await sleep(ns, 10 * 1000, false);
            }

            ns.print(`[cracker] Finished backdooring nodes`);
            await sleep(ns, 15 * 60 * 1000);
        } else {
            ns.print(`[cracker] Found file /flags/SKIP_BACKDOOR.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}
