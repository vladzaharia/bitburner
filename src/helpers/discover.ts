import { NS } from "Netscript";
import { getPortOpeners } from "/helpers/crack.js";

let foundHosts: string[] = [];

/** 
 * Get all available and crackable hosts via Terminal, to a default depth of 5.
 * 
 * @example <caption>Discover hosts to depth of 5.</caption>
 * run /helpers/discover.js
 * @example <caption>Discover hosts to passed in depth.</caption>
 * run /helpers/discover.js [depth]
 * 
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
	let depth: number = 5;

	if (ns.args.length === 1) {
		depth = ns.args[0] as number;
	}

	const allHosts = getHosts(ns, depth);
	getCrackableHosts(ns, allHosts, depth);
	return allHosts;
}

/** 
 * Get available hosts to a specified `depth`.
 * @async
 * 
 * @param {NS} ns - The Netscript object. 
 * @param {number} depth - The depth to search to.
 * @returns {string[]} All hosts available from "home" to `depth`.
 */
export function getHosts(ns: NS, depth: number): string[] {
	ns.disableLog("ALL");

	foundHosts = [];

	let allHosts = scanHost(ns, "home", depth, 0);
	allHosts = allHosts.filter((h, index) => allHosts.indexOf(h) === index);

	ns.print(`[discover] All hosts: ${allHosts}`);

	return allHosts;
}

/** 
 * Get a list of all personal servers.
 * @async
 * 
 * @param {NS} ns - The Netscript object. 
 * @returns {string[]} All personal servers available from "home".
 */
export function getPersonalServers(ns: NS): string[] {
	ns.disableLog("ALL");

	let hostnames = ns.scan("home");
	hostnames = hostnames.filter(hn => hn.startsWith("pserv-") || hn.startsWith("ps-"));

	ns.print(`[discover] Personal servers: ${hostnames}`);

	return hostnames;
}

/** 
 * Get list of all personal Control servers.
 * @async
 * @deprecated Control servers have been superceded by scripts running on "home"
 * 
 * @param {NS} ns - The Netscript object. 
 * @returns {string[]} All Control servers available from "home".
 */
export function getControlServers(ns: NS): string[] {
	let hostnames = getPersonalServers(ns);
	hostnames = hostnames.filter(hn => hn.startsWith("ps-control"));

	ns.print(`[discover] Control servers: ${hostnames}`);

	return hostnames;
}

/** 
 * Get list of all personal Worker servers.
 * @async
 * 
 * @param {NS} ns - The Netscript object. 
 * @returns {string[]} All Worker servers available from "home".
 */
export function getWorkerServers(ns: NS): string[] {
	let hostnames = getPersonalServers(ns);
	hostnames = hostnames.filter(hn => !hn.startsWith("ps-control"));

	ns.print(`[discover] Worker servers: ${hostnames}`);

	return hostnames;
}

/** 
 * Get list of crackable hosts from "home".
 * @async
 * @see "crackable" - Can crack using current hacking level and port openers.
 * 
 * @param {NS} ns - The Netscript object.
 * @param {string[]} hostnames - Optional list of hostnames to check crackability, uses all available servers to `depth`.
 * @param {number} depth - Optional depth to search to, defaults to 10.
 * @returns {string[]} All crackable hosts available from "home".
 */
export function getCrackableHosts(ns: NS, hostnames?: string[], depth?: number): string[] {
	let finalHostnames: string[] = hostnames as string[];
	const crackableHosts: string[] = [];

	ns.disableLog("ALL");

	if (!hostnames || hostnames.length === 0) {
		finalHostnames = getHosts(ns, depth || 10);
	}

	ns.print(`[discover] Checking crackability on hosts: ${crackableHosts}`);

	for (let i = 0; i < finalHostnames.length; i++) {
		const hostCanCrack = canCrack(ns, finalHostnames[i]);

		if (hostCanCrack) {
			crackableHosts.push(finalHostnames[i]);
		}
	}

	ns.print(`[discover] Crackable hosts: ${crackableHosts}`);

	return crackableHosts;
}

/** 
 * Get list of rooted hosts from "home".
 * @async
 * @see "rooted" - Was successfully cracked via `/helpers/crack.js`.

 * @param {NS} ns - The Netscript object.
 * @param {string[]} hostnames - Optional list of hostnames to check crackability, uses all available servers to `depth`.
 * @param {number} depth - Optional depth to search to, defaults to 10.
 * @returns {string[]} All rooted hosts available from "home".
 */
export function getRootedHosts(ns: NS, hostnames?: string[], depth?: number): string[] {
	let finalHostnames = hostnames as string[];
	const rootedHosts: string[] = [];

	ns.disableLog("ALL");

	if (!hostnames || hostnames.length === 0) {
		finalHostnames = getHosts(ns, depth || 10);
	}

	for (let i = 0; i < finalHostnames.length; i++) {
		const hostIsRooted = ns.hasRootAccess(finalHostnames[i]);

		if (hostIsRooted) {
			rootedHosts.push(finalHostnames[i]);
		}
	}

	ns.print(`[discover] Rooted hosts: ${rootedHosts}`);

	return rootedHosts;
}

/** 
 * Get list of hackable hosts from "home".
 * @async
 * @see "hackable" - Is rooted and has max money > 0.
 * 
 * @param {NS} ns - The Netscript object.
 * @param {string[]} hostnames - Optional list of hostnames to check crackability, uses all available servers to `depth`.
 * @param {number} depth - Optional depth to search to, defaults to 10.
 * @returns {string[]} All hackable hosts available from "home".
 */
 export function getHackableHosts(ns: NS, hostnames?: string[], depth?: number): string[] {
	let finalHostnames = hostnames as string[];
	const rootedHosts: string[] = [];

	ns.disableLog("ALL");

	if (!hostnames || hostnames.length === 0) {
		finalHostnames = getHosts(ns, depth || 10);
	}

	for (let i = 0; i < finalHostnames.length; i++) {
		const hostIsRooted = ns.hasRootAccess(finalHostnames[i]);
		const hostCanHaveMoney = ns.getServerMaxMoney(finalHostnames[i]);

		if (hostIsRooted && (hostCanHaveMoney > 0)) {
			rootedHosts.push(finalHostnames[i]);
		}
	}

	ns.print(`[discover] Hackable hosts: ${rootedHosts}`);

	return rootedHosts;
}


/** 
 * Scan a host recursively, up to `maxDepth`.
 * @async
 * 
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to scan.
 * @param {number} maxDepth - The maximum depth to scan to.
 * @param {number} curDepth - The current scan depth, increments each level down.
 * @returns {string[]} All found hosts, down to `maxDepth`.
 */
function scanHost(ns: NS, hostname: string, maxDepth: number, curDepth: number): string[] {
	ns.print(`[discover] Scanning ${hostname}, depth ${curDepth}/${maxDepth}`);

	let hostnames = ns.scan(hostname);
	foundHosts.push(hostname);

	hostnames = hostnames.filter(hn => hn !== "home" && !hn.startsWith("pserv-") && !hn.startsWith("ps-"));

	const hostnamesToScan = hostnames.filter(hn => foundHosts.indexOf(hn) === -1);
	// ns.print(`[discover] Need to scan ${hostnamesToScan}, depth ${curDepth}/${maxDepth}`);

	if (curDepth <= maxDepth) {
		for (let i = 0; i < hostnamesToScan.length; i++) {
			let newHostnames = scanHost(ns, hostnamesToScan[i], maxDepth, curDepth + 1);
			newHostnames = newHostnames.filter(hn => hn !== "home" && !hn.startsWith("pserv-"));
			hostnames = hostnames.concat(newHostnames);
			// ns.print(`[discover] Found ${newHostnames}`);
		}
	}

	return hostnames;
}

/**
 * Get route from "home" to `hostname`.
 * @async
 * 
 * @param {NS} ns - The Netscript object. 
 * @param {string} hostname - The hostname to try and get a path to.
 * @returns {string[] | false} Either the path to the host from home, or false if no path is found.
 */
export function getRoute(ns: NS, hostname: string): string[] | false {
	ns.print(`[discover] Looking for ${hostname}`);

	const alreadyScanned: string[] = [];
	const innerLoop = (target: string, hostnames: string[]) => {
		alreadyScanned.push(target);

		if (hostname === target) {
			ns.print(`[discover] Found ${target} via ${hostnames}`);
			return [... hostnames, target];
		}

		let scannableNames: string[] = ns.scan(target);
		const scanTargets: string[] = scannableNames.filter((hn: string) => !hn.startsWith("ps-") && !alreadyScanned.includes(hn));

		ns.print(`[discover] Scan targets ${scanTargets} already scanned ${alreadyScanned}`);
		if (scanTargets.length > 0) {
			for (let i = 0; i < scanTargets.length; i++) {
				const result = innerLoop(scanTargets[i], [... hostnames, target]);
				if (result) {
					ns.print(`[discover] Passing found path ${result} back up`);
					return result;
				}
			}
			return false;
		} else {
			return false;
		}
	}

	return innerLoop("home", []);
}

/** 
 * Check if `hostname` can be cracked by current hacking level and port openers.
 * @async
 * 
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to check.
 * @returns {boolean} Whether `hostname` can be cracked.
 */
function canCrack(ns: NS, hostname: string): boolean {
	const level = ns.getHackingLevel();
	const levelRequired = ns.getServerRequiredHackingLevel(hostname);
	const numPorts = getPortOpeners(ns).length;
	const numPortsRequired = ns.getServerNumPortsRequired(hostname);

	ns.print(`[discover] Hostname ${hostname}, Level ${level}/${levelRequired}, Ports ${numPorts}/${numPortsRequired}`)

	return level >= levelRequired && numPorts >= numPortsRequired;
}
