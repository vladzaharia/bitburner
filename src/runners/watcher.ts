import { NS } from "Netscript";

import { Scanner } from "/_internal/classes/scanner.js";
import { sleep } from "/helpers/sleep.js";

/**
 * Automatically report on hackable and personal servers.
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /runner/watcher.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    const scanner = new Scanner(ns);

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_WATCHER.js", "home")) {
            const hackableHosts = scanner.getHostnames("hackable");
            const personalServers = scanner.getHostnames("worker");

            ns.clearLog();

            personalServers.forEach((hn) =>
                ns.print(`[watcher] Server ${hn}, ${ns.getServerMaxRam(hn)}GB`)
            );

            hackableHosts.forEach((hn) =>
                ns.print(
                    `[watcher] Host ${hn}, ${ns.getServerMaxRam(
                        hn
                    )}GB, Money ${Math.round(
                        ns.getServerMoneyAvailable(hn)
                    )}/${ns.getServerMaxMoney(
                        hn
                    )}, Sec ${ns.getServerSecurityLevel(
                        hn
                    )}/${ns.getServerMinSecurityLevel(hn)}`
                )
            );

            ns.print(`[watcher] Finished listing servers`);
            await sleep(ns, 5 * 60 * 1000);
        } else {
            ns.print(`[watcher] Found file /flags/SKIP_WATCHER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}
