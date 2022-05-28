import { Hacknet, NS } from "Netscript";

const MONEY_PER_LEVEL = 8.668;
const MONEY_PER_RAM = 31830;
const MONEY_PER_CORE = 198.278;

// Amount of money dedicated to upgrades
const MONEY_MULTIPLIER = 0.1;

/** 
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

	const hacknet = ns.hacknet;

	while (true) {
		ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_HACKNET.js", "home")) {
			const numNodes = hacknet.numNodes();

			const moneyAvail = Math.floor(ns.getServerMoneyAvailable("home") * MONEY_MULTIPLIER);
			ns.print(`[ps-control-hacknet] Available money ${moneyAvail}`);

			const newNodeCost = Math.ceil(hacknet.getPurchaseNodeCost());
			ns.print(`[ps-control-hacknet] New node cost ${newNodeCost}`);

			const levelCost = Math.ceil(hacknet.getLevelUpgradeCost(0, 1) * numNodes);
			const levelAdv = (levelCost === Infinity) ? Infinity : Math.floor(levelCost / MONEY_PER_LEVEL);
			ns.print(`[ps-control-hacknet] Level cost ${levelCost}, cost/benefit ${levelAdv}`);

			const ramCost = Math.ceil(hacknet.getRamUpgradeCost(0, 1) * numNodes);
			const ramAdv = (ramCost === Infinity) ? Infinity : Math.floor(ramCost / MONEY_PER_RAM);
			ns.print(`[ps-control-hacknet] RAM cost ${ramCost}, cost/benefit ${ramAdv}`);

			const coreCost = Math.ceil(hacknet.getCoreUpgradeCost(0, 1) * numNodes);
			const coreAdv = Math.floor(coreCost / MONEY_PER_CORE);
			ns.print(`[ps-control-hacknet] Core cost ${coreCost}, cost/benefit ${coreAdv}`);

			const baseNode = hacknet.getNodeStats(0);
			for (let i = 0; i < numNodes; i++) {
				const node = hacknet.getNodeStats(i);

				if (node.production < baseNode.production) {
					upgradeToBaseline(ns, i);
					await ns.sleep(1000);
				}
			}

			if (shouldSkip(ns, moneyAvail, coreCost, levelAdv, coreAdv) || shouldSkip(ns, moneyAvail, coreCost, ramAdv, coreAdv)) {
				if (shouldSkip(ns, moneyAvail, ramCost, levelAdv, ramAdv)) {
					if (levelCost < moneyAvail) {
						ns.print(`[ps-control-hacknet] Upgrading level`);
						upgradeOnAll(hacknet, hacknet.upgradeLevel);
					} else {
						ns.print(`[ps-control-hacknet] Skipping upgrades, sleeping for 5min at ${new Date().toTimeString()}`);
						await ns.sleep(5 * 60 * 1000);		
					}
				} else {
					ns.print(`[ps-control-hacknet] Upgrading RAM`);
					upgradeOnAll(hacknet, hacknet.upgradeRam);
				}
			} else if (newNodeCost < moneyAvail && hacknet.numNodes < hacknet.maxNumNodes) {
				ns.print(`[ps-control-hacknet] Buying new node`);
				hacknet.purchaseNode();
			} else {
				ns.print(`[ps-control-hacknet] Upgrading cores`);
				upgradeOnAll(hacknet, hacknet.upgradeCore);
			}

			await ns.sleep(1000);
		} else {
			ns.print(`[ps-control-hacknet] Found file /flags/SKIP_HACKNET.js, sleeping for 1min at ${new Date().toTimeString()}`);
			await ns.sleep(60 * 1000);
		}
	}
}

/**
 * @param {number} moneyAvail
 * @param {number} cost1 
 * @param {number} cost2 
 * @param {number} benefit1 
 * @param {number} benefit2 
 */
function shouldSkip(ns: NS, moneyAvail: number, cost2: number, benefit1: number, benefit2: number) {
	const costSkip = cost2 > moneyAvail;
	const benefitSkip = benefit1 < benefit2
	const costOverride = (benefit2 * 100 < benefit1) || (benefit2 * 2 < benefit1) && (cost2 < moneyAvail * 3);

	if (costOverride) {
		return !costOverride;
	}
	return (costSkip || benefitSkip);
}

/** 
 * @param {Hacknet} hacknet 
 * @param {function} fn
 */
function upgradeOnAll(hacknet: Hacknet, fn: (i: number, n: number) => boolean) {
	const numNodes = hacknet.numNodes();

	for (let i = 0; i < numNodes; i++) {
		fn(i, 1);
	}
}

/** 
 * @param {NS} ns - The Netscript object.
 * @param {number} index
 */
function upgradeToBaseline(ns: NS, index: number) {
	ns.print(`[ps-control-hacknet] Upgrading ${index} to baseline stats`);

	const hacknet = ns.hacknet;
	const baseNode = hacknet.getNodeStats(0);
	const node = hacknet.getNodeStats(index);

	if (node.level < baseNode.level) {
		ns.print(`[ps-control-hacknet] Upgrading level ${node.level} -> ${baseNode.level}`);
		hacknet.upgradeLevel(index, baseNode.level - node.level);
	}
	if (node.ram < baseNode.ram) {
		ns.print(`[ps-control-hacknet] Upgrading RAM ${node.ram} -> ${baseNode.ram}`);
		hacknet.upgradeRam(index, Math.log2(baseNode.ram) - Math.log2(node.ram));
	}
	if (node.cores < baseNode.cores) {
		ns.print(`[ps-control-hacknet] Upgrading cores ${node.cores} -> ${baseNode.cores}`);
		hacknet.upgradeCore(index, baseNode.cores - node.cores);
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