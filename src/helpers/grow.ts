import { NS } from "Netscript";

/** 
 * Grow host(s) from Terminal.
 * 
 * @example <caption>Grow single passed in host.</caption>
 * run /helpers/grow.js [host0]
 * 
 * @example <caption>Grow multiple passed in hosts.</caption>
 * run /helpers/grow.js [host0] ... [hostn]
 * 
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length === 0) {
        throw "Function must be called with 1+ hostnames";
    }

    const hostnames = ns.args as string[];

    while (true) {
        const j = Math.floor(Math.random() * hostnames.length);
        const hostname = hostnames[j];
        await grow(ns, hostname);
    }
}

/** 
 * Grow host on `hostname`.
 * @async
 * 
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The host to grow.
 * @returns {Promise<number>} - The amount by which the server's money grew. 
 */
export async function grow(ns: NS, hostname: string): Promise<number> {
    ns.print(`[grow] Executing grow on ${hostname}`);
    return await ns.grow(hostname);
}