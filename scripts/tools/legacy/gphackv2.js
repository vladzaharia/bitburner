import { getHackableHosts } from "/helpers/discover-hosts.js";
import { crackHost } from "/helpers/crack.js";
import { hackWeakenGrow } from "/helpers/basic.js";

/** @param {NS} ns */
export async function main(ns) {
	const hackableHosts = await getHackableHosts(ns);

	ns.disableLog("ALL");
	ns.enableLog("nuke");
	ns.enableLog("hack");
	ns.enableLog("weaken");
	ns.enableLog("grow");

	while (true) {
		const j = Math.floor(Math.random() * hackableHosts.length);
		const hostname = hackableHosts[j];

		ns.print(`[gphackv2] Executing crack/hack on ${hostname}`)

		await crackHost(ns, hostname);
		await hackWeakenGrow(ns, hostname);
	}
}