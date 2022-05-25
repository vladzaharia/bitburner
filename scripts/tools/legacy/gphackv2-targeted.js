import { hackWeakenGrow } from "/helpers/hack.js";

/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	ns.enableLog("hack");
	ns.enableLog("weaken");
	ns.enableLog("grow");

	if (ns.args.length === 0) {
		throw `Function must be called with hostnames as separate args`;
	}

	const hackableHosts = ns.args;

	while (true) {
		const j = Math.floor(Math.random() * hackableHosts.length);
		const hostname = hackableHosts[j];

		ns.print(`[gphackv2] Executing hack on ${hostname}`)

		await hackWeakenGrow(ns, hostname);
	}
}