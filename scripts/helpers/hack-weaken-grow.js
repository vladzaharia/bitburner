import { grow } from "/helpers/grow.js";
import { hack } from "/helpers/hack.js";
import { weaken } from "/helpers/weaken.js";

// Min security level to interact with server
const SEC_LEVEL_THRESHOLD = 7;
const MONEY_PCT_THRESHOLD = 0.5;

/** 
 * @param {NS} ns
 */
export async function main(ns) {
	if (ns.args.length === 0) {
		throw "Function must be called with 1+ hostnames"
	}

	const hostnames = ns.args;

	while (true) {
		const j = Math.floor(Math.random() * hostnames.length);
		const hostname = hostnames[j];

		ns.print(`[hack] Executing hack on ${hostname}`)

		await hackWeakenGrow(ns, hostname);
	}
}

/** 
 * @param {NS} ns
 * @param {string} hostname 
 */
export async function hackWeakenGrow(ns, hostname) {
	// Get security level info
	const secLevel = ns.getServerSecurityLevel(hostname);
	const secMin = ns.getServerMinSecurityLevel(hostname);
	const secThresh = secMin + SEC_LEVEL_THRESHOLD;

	// Get money info
	const moneyAvail = Math.round(ns.getServerMoneyAvailable(hostname));
	const moneyMax = ns.getServerMaxMoney(hostname);
	const moneyThresh = Math.round(moneyMax * MONEY_PCT_THRESHOLD);

	// Run basic hacking w/ auto-grow/weaken
	if (moneyMax > 0) {
		ns.print(`[hack] Executing hack/weaken/grow on ${hostname}, Level ${secLevel}/${secThresh}, Money ${moneyAvail}/${moneyThresh}`);
		if ((moneyAvail < 100000) || (moneyAvail < moneyThresh)) {
			return await grow(ns, hostname);
		}

		return await hack(ns, hostname).then(async (amtMoney) => {
			if ((amtMoney === 0) && (secLevel > secThresh)) {
				return await weaken(ns, hostname);
			} else if ((amtMoney > 0) && (moneyAvail < moneyThresh)) {
				return await grow(ns, hostname);
			}
		});
	}
}