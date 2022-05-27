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
		await weaken(ns, hostname);
	}
}

/** 
 * @param {NS} ns
 * @param {string} hostname 
 */
export async function weaken(ns: NS, hostname: string) {
    ns.print(`[weaken] Executing weaken on ${hostname}`);
    await ns.weaken(hostname);
}