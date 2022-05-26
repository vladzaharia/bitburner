import { getHackableHosts } from "/helpers/discover.js";

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    ns.disableLog("ALL");

    while (true) {
        const hackableHosts = await getHackableHosts(ns);
    
        for (let i = 0; i < hackableHosts.length; i++) {
            const hostname = hackableHosts[i];
            
            const secLevel = ns.getServerSecurityLevel(hostname);
            const secMin = ns.getServerMinSecurityLevel(hostname);
        
            // Get money info
            const moneyAvail = Math.round(ns.getServerMoneyAvailable(hostname));
            const moneyMax = ns.getServerMaxMoney(hostname);
        
            ns.print(`[ps-control-watcher] Host ${hostname}, Money ${moneyAvail}/${moneyMax}, Sec ${secLevel}/${secMin}`);
        }
        
        await ns.sleep(5 * 60 * 1000);
    }
}