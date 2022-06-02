import { NS } from "Netscript";

/**
 * Weaken host(s) from Terminal.
 *
 * @example <caption>Weaken single passed in host.</caption>
 * run /helpers/weaken.js [host0]
 *
 * @example <caption>Weaken multiple passed in hosts.</caption>
 * run /helpers/weaken.js [host0] ... [hostn]
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
        await weaken(ns, hostname);
    }
}

/**
 * Weaken host at `hostname`.
 * @async
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - Host to weaken.
 * @returns {Promise<number>} The amount by which the server's security level was decreased.
 */
export async function weaken(ns: NS, hostname: string): Promise<number> {
    ns.print(`[weaken] Executing weaken on ${hostname}`);
    return await ns.weaken(hostname);
}
