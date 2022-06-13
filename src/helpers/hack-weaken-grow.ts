import { NS } from "Netscript";

import { grow } from "/helpers/grow.js";
import { hack } from "/helpers/hack.js";
import { weaken } from "/helpers/weaken.js";

/** Threshold to stop weakening server. */
const SEC_LEVEL_THRESHOLD = 7;

/** Threshold to stop growing server. */
const MONEY_PCT_THRESHOLD = 0.5;

/** 
 * run /helpers/a serial hack/weaken/grow script via the Terminal.
 * @deprecated Serial HWG has been replaced with `/node/ps-control-scheduler.js` as the recommended way to run HWG.
 * @category Executable
 * @export
 * 
 * @example <caption>Run HWG on a single passed in host.</caption>
 * ```shell
 * run /helpers/hack-weaken-grow.js [host0]
 * ```
 * 
 * @example <caption>Run HWG on multiple passed in hosts.</caption>
 * ```shell
 * run /helpers/hack-weaken-grow.js [host0] ... [hostn]
 * ```

 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length === 0) {
        throw new Error("Function must be called with 1+ hostnames");
    }

    const hostnames = ns.args as string[];

    while (true) {
        const j = Math.floor(Math.random() * hostnames.length);
        const hostname = hostnames[j];

        ns.print(`[hack] Executing hack on ${hostname}`);

        await hackWeakenGrow(ns, hostname);
    }
}

/**
 * Run serial HWG on given `hostname`.
 * @category Importable
 * @export
 * @async
 * @deprecated Serial HWG is not recommended. Please use a parallelized HWG with thread count percentages instead.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to run HWG on.
 * @returns {Promise<number>} The amount of money hacked, minus any growth action taken.
 */
export async function hackWeakenGrow(
    ns: NS,
    hostname: string
): Promise<number> {
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
        ns.print(
            `[hack] Executing hack/weaken/grow on ${hostname}, Level ${secLevel}/${secThresh}, Money ${moneyAvail}/${moneyThresh}`
        );
        if (moneyAvail < 100000 || moneyAvail < moneyThresh) {
            return (await grow(ns, hostname)) * -1;
        }

        return await hack(ns, hostname).then(async (amtMoney: number) => {
            if (amtMoney === 0 && secLevel > secThresh) {
                await weaken(ns, hostname);
            } else if (amtMoney > 0 && moneyAvail < moneyThresh) {
                return amtMoney - (await grow(ns, hostname));
            }

            return amtMoney;
        });
    } else {
        return -1;
    }
}
