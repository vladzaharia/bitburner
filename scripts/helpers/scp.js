/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
	if (ns.args.length < 2) {
		throw "Function must be called with hostname and filename";
	}

    await scp(ns, ns.args[0], ns.args[1]);
}

/** 
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {string} hostname
 * @param {string} filename
 */
 export async function scp(ns, hostname, filename) {
    const additionalFiles = ns.ls("home").filter((file) => file.startsWith("/helpers") || file.startsWith("/node"));

    ns.print(`[scp-exec] Copying helper scripts and ${filename} to ${hostname}`);
    await ns.scp([filename, ... additionalFiles], hostname);
}