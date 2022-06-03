import { NS } from "Netscript";
import { getHackableHosts, getPersonalServers } from "/helpers/discover.js";

/**
 * Automatically report on hackable and personal servers.
 * @category Executable
 *
 * @example
 * ```shell
 * run /node/ps-control-watcher.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_WATCHER.js", "home")) {
            const hackableHosts = getHackableHosts(ns);
            const personalServers = getPersonalServers(ns);

            ns.clearLog();

            for (let i = 0; i < hackableHosts.length; i++) {
                const hostname = hackableHosts[i];

                const secLevel = ns.getServerSecurityLevel(hostname);
                const secMin = ns.getServerMinSecurityLevel(hostname);

                // Get money info
                const moneyAvail = Math.round(
                    ns.getServerMoneyAvailable(hostname)
                );
                const moneyMax = ns.getServerMaxMoney(hostname);

                const ram = ns.getServerMaxRam(hostname);

                ns.print(
                    `[watcher] Host ${hostname}, ${ram}GB, Money ${moneyAvail}/${moneyMax}, Sec ${secLevel}/${secMin}`
                );
            }

            for (let i = 0; i < personalServers.length; i++) {
                const hostname = personalServers[i];
                const ram = ns.getServerMaxRam(hostname);
                ns.print(`[watcher] Server ${hostname}, ${ram}GB`);
            }

            ns.print(
                `[watcher] Finished listing servers, sleeping for 5min at ${new Date().toTimeString()}`
            );
            await ns.sleep(5 * 60 * 1000);
        } else {
            ns.print(
                `[watcher] Found file /flags/SKIP_WATCHER.js, sleeping for 1min at ${new Date().toTimeString()}`
            );
            await ns.sleep(60 * 1000);
        }
    }
}
