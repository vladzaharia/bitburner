import { NS } from "Netscript";

/** 
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length === 0) {
        throw "Function must be called with servers to sell!"
    }
    
    const purchasedServers = ns.args as string[];

	for (let i = 0; i < purchasedServers.length; i++) {
		await ns.killall(purchasedServers[i]);
		await ns.deleteServer(purchasedServers[i]);
	}
}