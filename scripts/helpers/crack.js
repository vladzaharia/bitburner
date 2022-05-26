const ALL_OPENERS = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
	if (ns.args.length === 0) {
		throw "Function must be called with 1+ hostnames"
	}

	const hostnames = ns.args;

	for (let i = 0; i < hostnames.length; i++) {
		const hostname = hostnames[i];

		ns.print(`[crack] Executing crack on ${hostname}`)

		await crackHost(ns, hostname);
	}
}

/** 
 * @param { import("../../lib/NetscriptDefinition").NS } ns 
 * @param {string} hostname
 */
export async function crackHost(ns, hostname) {
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

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function getPortOpeners(ns) {
	const availableOpeners = [];

	for (let i = 0; i < ALL_OPENERS.length; i++) {
		const opener = ALL_OPENERS[i];
		const canUse = await ns.fileExists(opener, "home");
		if (canUse) {
			availableOpeners.push(opener);
		}
	}

	return availableOpeners;
}

/** 
 * @param { import("../../lib/NetscriptDefinition").NS } ns 
 * @param {string} hostname
 */
async function useAllOpeners(ns, hostname) {
	// Run available openers
	const availableOpeners = await getPortOpeners(ns);
	for (let i = 0; i < availableOpeners.length; i++) {
		await useOpener(ns, hostname, availableOpeners[i]);
	}
}

/** 
 * @param { import("../../lib/NetscriptDefinition").NS } ns 
 * @param {string} hostname
 */
async function useOpener(ns, hostname, opener) {
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