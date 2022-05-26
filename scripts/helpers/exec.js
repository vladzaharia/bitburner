/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
	if (ns.args.length < 2) {
		throw "Function must be called with hostname and filename, threads and args optional";
	}

    await exec(ns, ns.args[0], ns.args[1], ns.args[2] || 1, ... (ns.args.splice(3) || []));
}

/** 
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {string} hostname
 * @param {string} filename
 * @param {number} threads
 * @param {string[]} args
 */
 export async function exec(ns, hostname, filename, threads, args) {
    if (threads === 0) {
        threads = Math.floor(ns.getServerMaxRam(hostname) / ns.getScriptRam(filename));
    }

    ns.print(`[exec] Executing ${filename} on ${hostname} with threads: ${threads}, args: ${args}`);
    await ns.exec(filename, hostname, threads, ... args);
}