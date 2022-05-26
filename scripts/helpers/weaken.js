/** 
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 */
export async function main(ns) {
	if (ns.args.length === 0) {
		throw "Function must be called with 1+ hostnames"
	}

	const hostnames = ns.args;

	while (true) {
		const j = Math.floor(Math.random() * hostnames.length);
		const hostname = hostnames[j];
		await weaken(ns, hostname);
	}
}

/** 
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {string} hostname 
 */
export async function weaken(ns, hostname) {
    ns.print(`[weaken] Executing weaken on ${hostname}`);
    await ns.weaken(hostname);
}