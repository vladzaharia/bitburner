import { NS } from "Netscript";

import { Scanner } from "/_internal/classes/scanner.js";
import { crack } from "/helpers/crack.js";
import { sleep } from "/helpers/sleep.js";

/**
 * Automatically crack all available hosts.
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /runner/cracker.js
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
            const crackableHosts = scanner.getHostnames("crackable");

            ns.clearLog();

            ns.print(`[cracker] Crackable hosts: ${crackableHosts}`);

            crackableHosts.forEach((hn) => crack(ns, hn));

            ns.print(
                `[cracker] Hackable hosts: ${scanner.getHostnames("hackable")}`
            );
            ns.print(
                `[cracker] Rooted hosts: ${scanner.getHostnames("rooted")}`
            );

            ns.print(`[cracker] Finished cracking nodes`);
            await sleep(ns, 5 * 60 * 1000);
        } else {
            ns.print(`[cracker] Found file /flags/SKIP_CRACKER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}
