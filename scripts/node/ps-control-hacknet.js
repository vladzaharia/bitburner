const MONEY_PER_LEVEL = 2.15;
const MONEY_PER_RAM = 5.72;
const MONEY_PER_CORE = 27.24;

// Amount of money dedicated to upgrades
const MONEY_MULTIPLIER = 0.05;

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    ns.disableLog("ALL");

	const hacknet = ns.hacknet;

	while (true) {
		const numNodes = hacknet.numNodes();

		const moneyAvail = Math.floor(ns.getServerMoneyAvailable("home") * MONEY_MULTIPLIER);
        ns.print(`[ps-control-hacknet] Available money ${moneyAvail}`);

		const levelCost = Math.ceil(hacknet.getLevelUpgradeCost(0, 1) * numNodes);
		const levelAdv = Math.floor(levelCost / MONEY_PER_LEVEL);
		ns.print(`[ps-control-hacknet] Level cost ${levelCost}, cost/benefit ${levelAdv}`);

		const ramCost = Math.ceil(hacknet.getRamUpgradeCost(0, 1) * numNodes);
		const ramAdv = (ramCost === Infinity) ? 0 : Math.floor(ramCost / MONEY_PER_RAM);
		ns.print(`[ps-control-hacknet] RAM cost ${ramCost}, cost/benefit ${ramAdv}`);

		const coreCost = Math.ceil(hacknet.getCoreUpgradeCost(0, 1) * numNodes);
		const coreAdv = Math.floor(levelCost / MONEY_PER_CORE);
		ns.print(`[ps-control-hacknet] Core cost ${coreCost}, cost/benefit ${coreAdv}`);

		if (coreCost > moneyAvail || levelAdv > coreAdv || ramAdv > coreAdv) {
			if (ramCost > moneyAvail || levelAdv > ramAdv) {
				if (levelCost < moneyAvail) {
					ns.print(`[ps-control-hacknet] Upgrading level`);
					upgradeOnAll(hacknet, hacknet.upgradeLevel);
				} else {
					ns.print(`[ps-control-hacknet] Skipping upgrades`);
					await ns.sleep(5 * 60 * 1000);		
				}
			} else {
				ns.print(`[ps-control-hacknet] Upgrading RAM`);
				upgradeOnAll(hacknet, hacknet.upgradeRam);
			}
		} else {
			ns.print(`[ps-control-hacknet] Upgrading cores`);
			upgradeOnAll(hacknet, hacknet.upgradeCore);
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