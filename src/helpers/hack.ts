import { NS } from "Netscript";

/** 
 * @param {NS} ns
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
 * @param {NS} ns
 * @param {string} hostname 
 */
export async function hack(ns: NS, hostname: string) {
    ns.print(`[hack] Executing hack on ${hostname}`);
    return await ns.hack(hostname);
}