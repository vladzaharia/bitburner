import { NS } from "Netscript";

import { Scanner } from "/_internal/classes/scanner.js";

/**
 * Get all available and crackable hosts via Terminal, to a default depth of 5.
 * @category Executable
 * @export
 *
 * @example <caption>Discover hosts to depth of 5.</caption>
 * ```shell
 * run /helpers/discover.js
 * ```
 *
 * @example <caption>Discover hosts to passed in depth.</caption>
 * ```shell
 * run /helpers/discover.js [depth]
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.clearLog();
    ns.disableLog("ALL");

    const scanner = new Scanner(ns);

    ns.print(`[discover] All known hosts: ${scanner.getHostnames("all")}`);
    ns.print(`[discover] Worker hosts: ${scanner.getHostnames("worker")}`);
    ns.print(
        `[discover] Crackable hosts: ${scanner.getHostnames("crackable")}`
    );
    ns.print(`[discover] Rooted hosts: ${scanner.getHostnames("rooted")}`);
    ns.print(`[discover] Hackable hosts: ${scanner.getHostnames("hackable")}`);
}
