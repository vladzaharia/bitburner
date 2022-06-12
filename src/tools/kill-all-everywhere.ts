import { NS } from "Netscript";

import { Scanner } from "/_internal/classes/scanner.js";

/**
 * Kill all scripts on all known servers.
 * @category Executable
 * @export
 *
 * @example <caption>Kill all scripts, everywhere.</caption>
 * ```shell
 * run /tools/kill-all-everywhere.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    const scanner = new Scanner(ns);
    const allServers = [
        ...scanner.getHostnames("rooted"),
        ...scanner.getHostnames("worker"),
        "home",
    ];

    allServers.forEach((hn) => ns.killall(hn));
}
