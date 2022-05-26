/** 
 * @param {NS} ns
 */
export async function main(ns) {
    if (ns.args.length === 0) {
        throw "Function must be called with servers to sell!"
    }
    
    const purchasedServers = ns.args;

	for (let i = 0; i < purchasedServers.length; i++) {
		await ns.killall(purchasedServers[i]);
		await ns.deleteServer(purchasedServers[i]);
	}
}