import { NS } from "Netscript";
import { getPortOpeners } from "/helpers/crack.js";

const DEPTH = 2;

let foundHosts: string[] = [];

/** 
 * @param {NS} ns
 */
export async function main(ns: NS) {
	let depth: number = DEPTH;

	if (ns.args.length === 1) {
		depth = ns.args[0] as number;
	}

	const allHosts = await getHosts(ns, depth);
	await getCrackableHosts(ns, allHosts, depth);
	return allHosts;
}

/** 
 * @param {NS} ns 
 * @param {number} depth
 */
export async function getHosts(ns: NS, depth: number): Promise<string[]> {
	ns.disableLog("ALL");

	foundHosts = [];

	let allHosts = await scanHost(ns, "home", depth, 0);
	allHosts = allHosts.filter((h, index) => allHosts.indexOf(h) === index);

	ns.print(`[discover] All hosts: ${allHosts}`);

	return allHosts;
}

/** 
 * @param {NS} ns 
 */
export async function getPersonalServers(ns: NS): Promise<string[]> {
	ns.disableLog("ALL");

	let hostnames = await ns.scan("home");
	hostnames = hostnames.filter(hn => hn.startsWith("pserv-") || hn.startsWith("ps-"));

	ns.print(`[discover] Personal servers: ${hostnames}`);

	return hostnames;
}

/** 
 * @param {NS} ns 
 */
export async function getControlServers(ns: NS): Promise<string[]> {
	let hostnames = await getPersonalServers(ns);
	hostnames = hostnames.filter(hn => hn.startsWith("ps-control"));

	ns.print(`[discover] Control servers: ${hostnames}`);

	return hostnames;
}

/** 
 * @param {NS} ns 
 */
export async function getWorkerServers(ns: NS): Promise<string[]> {
	let hostnames = await getPersonalServers(ns);
	hostnames = hostnames.filter(hn => !hn.startsWith("ps-control"));

	ns.print(`[discover] Worker servers: ${hostnames}`);

	return hostnames;
}

/** 
 * @param {NS} ns
 * @param {string[]} hostnames
 * @param {number} depth
 */
export async function getCrackableHosts(ns: NS, hostnames: string[], depth: number): Promise<string[]> {
	let finalHostnames = hostnames;
	const crackableHosts: string[] = [];

	ns.disableLog("ALL");
	
	if (!hostnames || hostnames.length === 0) {
		finalHostnames = await getHosts(ns, depth || 10);
	}

	ns.print(`[discover] Checking crackability on hosts: ${crackableHosts}`);

	for (let i = 0; i < finalHostnames.length; i++) {
		const hostCanCrack = await canCrack(ns, finalHostnames[i]);

		if (hostCanCrack) {
			crackableHosts.push(finalHostnames[i]);
		}
	}

	ns.print(`[discover] Crackable hosts: ${crackableHosts}`);

	return crackableHosts;
}

/** 
 * @param {NS} ns
 * @param {string[]} hostnames
 * @param {number} depth
 */
 export async function getHackableHosts(ns: NS, hostnames: string[], depth: number): Promise<string[]> {
	let finalHostnames = hostnames;
	const rootedHosts: string[] = [];

	ns.disableLog("ALL");
	
	if (!hostnames || hostnames.length === 0) {
		finalHostnames = await getHosts(ns, depth || 10);
	}

	for (let i = 0; i < finalHostnames.length; i++) {
		const hostIsRooted = await ns.hasRootAccess(finalHostnames[i]);
		const hostCanHaveMoney = await ns.getServerMaxMoney(finalHostnames[i]);

		if (hostIsRooted && (hostCanHaveMoney > 0)) {
			rootedHosts.push(finalHostnames[i]);
		}
	}

	ns.print(`[discover] Rooted hosts: ${rootedHosts}`);

	return rootedHosts;
}

/** 
 * @param {NS} ns
 * @param {string[]} hostnames
 * @param {number} depth
 */
export async function getRootedHosts(ns: NS, hostnames: string[], depth: number): Promise<string[]> {
	let finalHostnames = hostnames;
	const rootedHosts: string[] = [];

	ns.disableLog("ALL");
	
	if (!hostnames || hostnames.length === 0) {
		finalHostnames = await getHosts(ns, depth || 10);
	}

	for (let i = 0; i < finalHostnames.length; i++) {
		const hostIsRooted = await ns.hasRootAccess(finalHostnames[i]);

		if (hostIsRooted) {
			rootedHosts.push(finalHostnames[i]);
		}
	}

	ns.print(`[discover] Rooted hosts: ${rootedHosts}`);

	return rootedHosts;
}

/** 
 * @param {NS} ns
 * @param {string} hostname 
 * @param {number} maxDepth
 * @param {number} curDepth
 */
async function scanHost(ns: NS, hostname: string, maxDepth: number, curDepth: number): Promise<string[]> {
	ns.print(`[discover] Scanning ${hostname}, depth ${curDepth}/${maxDepth}`);
	
	let hostnames = await ns.scan(hostname);
	foundHosts.push(hostname);

	hostnames = hostnames.filter(hn => hn !== "home" && !hn.startsWith("pserv-") && !hn.startsWith("ps-"));

	const hostnamesToScan = hostnames.filter(hn => foundHosts.indexOf(hn) === -1);
	// ns.print(`[discover] Need to scan ${hostnamesToScan}, depth ${curDepth}/${maxDepth}`);

	if (curDepth <= maxDepth) {
		for (let i = 0; i < hostnamesToScan.length; i++) {
			let newHostnames = await scanHost(ns, hostnamesToScan[i], maxDepth, curDepth + 1);
			newHostnames = newHostnames.filter(hn => hn !== "home" && !hn.startsWith("pserv-"));
			hostnames = hostnames.concat(newHostnames);
			// ns.print(`[discover] Found ${newHostnames}`);
		}
	}

	return hostnames;
}

/** 
 * @param {NS} ns
 * @param {string} hostname 
 */
async function canCrack(ns: NS, hostname: string): Promise<boolean> {
	const level = ns.getHackingLevel();
	const levelRequired = ns.getServerRequiredHackingLevel(hostname);
	const numPorts = await getNumPorts(ns);
	const numPortsRequired = ns.getServerNumPortsRequired(hostname);

	ns.print(`[discover] Hostname ${hostname}, Level ${level}/${levelRequired}, Ports ${numPorts}/${numPortsRequired}`)

	return level >= levelRequired && numPorts >= numPortsRequired;
}

/** 
 * @param {NS} ns
 */
async function getNumPorts(ns: NS): Promise<number> {
	const availableOpeners = await getPortOpeners(ns);
	return availableOpeners.length;
}