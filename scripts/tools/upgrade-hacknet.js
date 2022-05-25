const MONEY_PER_LEVEL = 29.248;
const MONEY_PER_RAM = 0;
const MONEY_PER_CORE = 413.965;

/** @param {NS} ns */
export async function main(ns) {
	const hacknet = ns.hacknet;

	while (true) {
		const baseNode = hacknet.getNodeStats(0);
		const numNodes = hacknet.numNodes();

		const moneyAvail = ns.getServerMoneyAvailable("home");

		const levelCost = hacknet.getLevelUpgradeCost(0, 1) * numNodes;
		const levelAdv = levelCost / MONEY_PER_LEVEL;
		ns.print(`[upgrade-hacknet] Level cost ${levelCost}, cost/benefit ${levelAdv}`);

		const ramCost = hacknet.getRamUpgradeCost(0, 1) * numNodes;
		const ramAdv = (ramCost === Infinity) ? 0 : (ramCost / MONEY_PER_LEVEL);
		ns.print(`[upgrade-hacknet] RAM cost ${ramCost}, cost/benefit ${ramAdv}`);

		const coreCost = hacknet.getCoreUpgradeCost(0, 1) * numNodes;
		const coreAdv = levelCost / MONEY_PER_CORE;
		ns.print(`[upgrade-hacknet] Core cost ${coreCost}, cost/benefit ${coreAdv}`);

		if (levelAdv > ramAdv && levelAdv > coreAdv && levelCost < moneyAvail) {
			ns.print(`[upgrade-hacknet] Upgrading level`);
			upgradeOnAll(hacknet, hacknet.upgradeLevel);
		} else if (ramAdv > levelAdv && ramAdv > coreAdv && ramCost < moneyAvail) {
			ns.print(`[upgrade-hacknet] Upgrading RAM`);
			upgradeOnAll(hacknet, hacknet.upgradeRam);
		} else if (coreAdv > levelAdv && coreAdv > ramAdv && coreCost < moneyAvail) {
			ns.print(`[upgrade-hacknet] Upgrading cores`);
			upgradeOnAll(hacknet, hacknet.upgradeCore);
		} else {
			ns.print(`[upgrade-hacknet] Skipping upgrades`);
		}

		await ns.sleep(1000);
	}
}

/** @param {Hacknet} hacknet */
function upgradeOnAll(hacknet, fn) {
	const numNodes = hacknet.numNodes();

	for (let i = 0; i < numNodes; i++) {
		fn(i, 1);
	}

}

// /** 
//  * @param {Hacknet} hacknet 
//  * @param {number} nodeId
//  */
// function getNodeUpgradeCost(hacknet, nodeId) {
// 	const baseNode = hacknet.getNodeStats(0);
// 	const node = hacknet.getNodeStats(nodeId);

// 	return hacknet.getLevelUpgradeCost(nodeId, (baseNode.level) - )
// }

// /** @param {Hacknet} hacknet */
// function getNodeBenefit(hacknet) {
// 	const node = hacknet.getNodeStats(0);
// 	return (node.cores * MONEY_PER_CORE) + (node.ram * MONEY_PER_RAM) + (node.level * MONEY_PER_LEVEL);
// }