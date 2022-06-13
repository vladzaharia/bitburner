import { NS } from "Netscript";

import { ALL_OPENERS } from "/_internal/constants/programs.js";

/**
 * Crack host(s) from Terminal.
 * @category Executable
 * @export
 *
 * @example <caption>Crack single passed in host.</caption>
 * ```shell
 * run /helpers/crack.js [host0]
 * ```
 *
 * @example <caption>Crack multiple passed in hosts.</caption>
 * ```shell
 * run /helpers/crack.js [host0] ... [hostn]
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length === 0) {
        throw new Error("Function must be called with 1+ hostnames");
    }

    for (const hostname of ns.args as string[]) {
        ns.print(`[crack] Executing crack on ${hostname}`);
        crack(ns, hostname);
    }
}

/**
 * Crack given host using available port openers and nuke.
 * @category Importable
 * @export
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - Hostname to crack
 */
export function crack(ns: NS, hostname: string) {
    // Nuke host first
    if (!ns.hasRootAccess(hostname)) {
        if (ns.getServerNumPortsRequired(hostname) > 0) {
            useAllOpeners(ns, hostname);
        }

        ns.print(`[crack] Nuking ${hostname}`);
        ns.nuke(hostname);
    } else {
        ns.print(`[crack] ${hostname} already cracked!`);
    }
}

/**
 * Get available port openers.
 * @category Importable
 * @export
 *
 * @param {NS} ns - The Netscript object.
 * @returns {string[]} Port openers available.
 */
export function getPortOpeners(ns: NS): string[] {
    const availableOpeners: string[] = [];

    for (const opener of ALL_OPENERS) {
        const canUse = ns.fileExists(opener, "home");
        if (canUse) {
            availableOpeners.push(opener);
        }
    }

    return availableOpeners;
}

/**
 * Use all available openers on `hostname`.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to crack.
 */
function useAllOpeners(ns: NS, hostname: string) {
    // Run available openers
    const availableOpeners = getPortOpeners(ns);
    availableOpeners.forEach((op) => useOpener(ns, hostname, op));
}

/**
 * Crack a port on `hostname` using `opener`
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to crack.
 * @param {string} opener - The opener to use.
 */
function useOpener(ns: NS, hostname: string, opener: string) {
    ns.print(`[crack] Using ${opener} on ${hostname}`);

    switch (opener) {
        case "BruteSSH.exe":
            ns.brutessh(hostname);
            return true;
        case "FTPCrack.exe":
            ns.ftpcrack(hostname);
            return true;
        case "relaySMTP.exe":
            ns.relaysmtp(hostname);
            return true;
        case "HTTPWorm.exe":
            ns.httpworm(hostname);
            return true;
        case "SQLInject.exe":
            ns.sqlinject(hostname);
            return true;
        default:
            throw new Error("Unknown opener!");
    }
}
