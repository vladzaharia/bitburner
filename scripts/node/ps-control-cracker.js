import { crackHost } from "/helpers/crack.js";
import { getCrackableHosts, getRootedHosts } from "/helpers/discover.js";

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    while (true) {
        const crackableHosts = await getCrackableHosts(ns);
    
        for (let i = 0; i < crackableHosts.length; i++) {
            const hostname = crackableHosts[i];
            await crackHost(ns, hostname);
        }
    
        await getRootedHosts(ns, crackableHosts);

        await ns.sleep(15 * 60 * 1000);
    }
}