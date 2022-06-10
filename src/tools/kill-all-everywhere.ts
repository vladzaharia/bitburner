import { NS } from "Netscript";

import { getPersonalServers, getRootedHosts } from "/helpers/discover.js";

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
    const allServers = [
        ...getRootedHosts(ns),
        ...getPersonalServers(ns),
        "home",
    ];

    allServers.forEach((hn) => ns.killall(hn));
}
