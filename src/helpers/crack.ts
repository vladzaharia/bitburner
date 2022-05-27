import { NS } from "Netscript";

const ALL_OPENERS = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];

/** @param { NS } ns */
export async function main(ns: NS) {
	if (ns.args.length === 0) {
		throw "Function must be called with 1+ hostnames";
	}

	const hostnames: string[] = ns.args as string[];

	for (let i = 0; i < hostnames.length; i++) {
		const hostname = hostnames[i];

		ns.print(`[crack] Executing crack on ${hostname}`)

		await crackHost(ns, hostname);
	}
}

/** 
 * @param {NS} ns 
 * @param {string} hostname
 */
export async function crackHost(ns: NS, hostname: string) {
	// Nuke host first
	if (!ns.hasRootAccess(hostname)) {
		if (ns.getServerNumPortsRequired(hostname) > 0) {
			await useAllOpeners(ns, hostname);
		}

		await ns.print(`[crack] Nuking ${hostname}`)
		await ns.nuke(hostname);

		// Backdoor host
		// ns.installBackdoor();
	} else {
		ns.print(`[crack] ${hostname} already cracked!`)
	}
}

/** 
 * @param {NS} ns
 */
export function getPortOpeners(ns: NS): string[] {
	const availableOpeners: string[] = [];

	for (let i = 0; i < ALL_OPENERS.length; i++) {
		const opener = ALL_OPENERS[i];
		const canUse = ns.fileExists(opener, "home");
		if (canUse) {
			availableOpeners.push(opener);
		}
	}

	return availableOpeners;
}

/** 
 * @param {NS} ns 
 * @param {string} hostname
 */
async function useAllOpeners(ns: NS, hostname: string) {
	// Run available openers
	const availableOpeners = getPortOpeners(ns);
	for (let i = 0; i < availableOpeners.length; i++) {
		await useOpener(ns, hostname, availableOpeners[i]);
	}
}

/** 
 * @param {NS} ns 
 * @param {string} hostname
 * @param {string} opener
 */
async function useOpener(ns: NS, hostname: string, opener: string) {
	await ns.print(`[crack] Using ${opener} on ${hostname}`)

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
			throw "Unknown opener!";
	}
}