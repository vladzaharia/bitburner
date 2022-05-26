import { getHackableHosts, getPersonalServers } from "/helpers/discover.js";

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    ns.disableLog("ALL");

    while (true) {
        const hackableHosts = await getHackableHosts(ns);
        const personalServers = await getPersonalServers(ns);

        ns.clearLog();
    
        for (let i = 0; i < hackableHosts.length; i++) {
            const hostname = hackableHosts[i];
            
            const secLevel = ns.getServerSecurityLevel(hostname);
            const secMin = ns.getServerMinSecurityLevel(hostname);
        
            // Get money info
            const moneyAvail = Math.round(ns.getServerMoneyAvailable(hostname));
            const moneyMax = ns.getServerMaxMoney(hostname);

            const ram = ns.getServerMaxRam(hostname);
        
            ns.print(`[ps-control-watcher] Host ${hostname}, ${ram}GB, Money ${moneyAvail}/${moneyMax}, Sec ${secLevel}/${secMin}`);
        }

        for (let i = 0; i < personalServers.length; i++) {
            const hostname = personalServers[i];
            const ram = ns.getServerMaxRam(hostname);
            ns.print(`[ps-control-watcher] Server ${hostname}, ${ram}GB`);
        }
        
        await ns.sleep(5 * 60 * 1000);
    }
}