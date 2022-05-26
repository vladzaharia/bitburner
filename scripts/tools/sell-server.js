/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    let purchasedServers = [];

    if (ns.args.length > 0) {
        purchasedServers = ns.args;
    } else {
        purchasedServers = await ns.getPurchasedServers();
        purchasedServers = purchasedServers.filter((hn) => hn.startsWith("pserv") || hn.startsWith("ps-worker"));    
    }

	for (let i = 0; i < purchasedServers.length; i++) {
		await ns.killall(purchasedServers[i]);
		await ns.deleteServer(purchasedServers[i]);
	}
}