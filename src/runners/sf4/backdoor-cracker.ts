import { NS } from "Netscript";

import { Scanner } from "/_internal/classes/scanner.js";
import { crack } from "/helpers/crack";
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

    const scanner = new Scanner(ns);

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_CRACKER.js", "home")) {
            ns.print(`[cracker] Cracking all possible nodes`);
            const crackableHosts = scanner.getHostnames("crackable");
            ns.clearLog();

            // Crack all possible hosts
            crackableHosts.forEach((hn) => crack(ns, hn));

            ns.print(`[cracker] Finished cracking nodes, backdooring`);

            const hackableHosts = scanner
                .getHostnames("hackable")
                .filter((hn) => hn !== "home" && !hn.startsWith("ps-"));

            // Backdoor all rooted hosts
            for (const hostname of hackableHosts) {
                const host = scanner.getHost(hostname);

                await backdoor(ns, host.route);
                await sleep(ns, 1000, false);
            }

            ns.print(`[cracker] Finished backdooring nodes`);
            await sleep(ns, 5 * 60 * 1000);
        } else {
            ns.print(`[cracker] Found file /flags/SKIP_CRACKER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}
