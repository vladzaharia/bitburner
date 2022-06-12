import { NS } from "Netscript";

/**
 * Hack host(s) from Terminal.
 * @category Executable
 * @export
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
 * @category Importable
 * @export
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

/**
 * Check if `hostname` can be hacked by current hacking level.
 * @export
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to check.
 * @returns {boolean} Whether `hostname` can be cracked.
 */
export function canHack(ns: NS, hostname: string): boolean {
    const level = ns.getHackingLevel();
    const levelRequired = ns.getServerRequiredHackingLevel(hostname);
    const isRooted = ns.hasRootAccess(hostname);

    ns.print(
        `[discover] Hostname ${hostname}, Rooted ${isRooted}, Level ${level}/${levelRequired}`
    );

    return isRooted && level >= levelRequired && !hostname.startsWith("ps-");
}
