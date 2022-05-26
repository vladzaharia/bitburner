import { NS } from "Netscript";

/** 
 * @param {NS} ns
 */
export async function main(ns: NS) {
	if (ns.args.length < 2) {
		throw "Function must be called with hostname and filename, threads and args optional";
	}

    await exec(ns, ns.args[0] as string, ns.args[1] as string, ns.args[2] as number || 1, (ns.args.splice(3) as string[] || []));
}

/** 
 * @param {NS} ns
 * @param {string} hostname
 * @param {string} filename
 * @param {number} threads
 * @param {string[]} args
 */
 export async function exec(ns: NS, hostname: string, filename: string, threads: number, args: string[]) {
    if (threads === 0) {
        threads = Math.floor(ns.getServerMaxRam(hostname) / ns.getScriptRam(filename));
    }

    ns.print(`[exec] Executing ${filename} on ${hostname} with threads: ${threads}, args: ${args}`);
    await ns.exec(filename, hostname, threads, ... args);
}