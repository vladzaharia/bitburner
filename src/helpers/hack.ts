import { NS } from "Netscript";

/**
 * Hack host(s) from Terminal.
 *
 * @example <caption>Hack single passed in host.</caption>
 * ```shell
 * run /helpers/hack.js [host0]
 * ```
 *
 * @example <caption>Hack multiple passed in hosts.</caption>
 * ```shell
 * run /helpers/hack.js [host0] ... [hostn]
 * ```
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
        await hack(ns, hostname);
    }
}

/**
 * Hack host at `hostname`.
 * @async
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - Host to hack.
 * @returns {Promise<number>} The amount of money that was hacked.
 */
export async function hack(ns: NS, hostname: string): Promise<number> {
    ns.print(`[hack] Executing hack on ${hostname}`);
    return await ns.hack(hostname);
}
