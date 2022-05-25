import { crackHost } from "/helpers/crack.js";
import { getCrackableHosts, getRootedHosts } from "/helpers/discover.js";

/** @param {NS} ns */
export async function main(ns) {
	const crackableHosts = await getCrackableHosts(ns, [], 10);

	for (let i = 0; i < crackableHosts.length; i++) {
		const hostname = crackableHosts[i];
		await crackHost(ns, hostname);
	}

	await getRootedHosts(ns, crackableHosts, 10);
}