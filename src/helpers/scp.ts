import { NS } from "Netscript";

/** 
 * @param {NS} ns
 */
export async function main(ns: NS) {
	if (ns.args.length < 2) {
		throw "Function must be called with hostname and filename";
	}

    await scp(ns, ns.args[0] as string, ns.args[1] as string);
}

/** 
 * @param {NS} ns
 * @param {string} hostname
 * @param {string} filename
 */
 export async function scp(ns: NS, hostname: string, filename: string) {
    const additionalFiles = ns.ls("home").filter((file) => file.startsWith("/helpers") || file.startsWith("/node"));

    ns.print(`[scp] Copying helper scripts and ${filename} to ${hostname}`);
    await ns.scp([filename, ... additionalFiles], hostname);
}