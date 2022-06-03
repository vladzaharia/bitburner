import { NS } from "Netscript";
import { getPersonalServers, getRootedHosts } from "/helpers/discover";

/**
 * Kill all scripts on all known servers.
 * @category Executable
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

    for (let i = 0; i < allServers.length; i++) {
        ns.killall(allServers[i]);
    }
}
