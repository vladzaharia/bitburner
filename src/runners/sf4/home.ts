import { NS } from "Netscript";

import { sleep } from "/_internal/classes/sleep.js";
import { HomeStore } from "/_internal/classes/store/home.js";

/**
 * Automatically upgrade "home" server.
 *
 * Each cycle will:
 *  - Check for cheapest upgrade of Tor, RAM, or Darkweb program.
 *  - Purchase upgrade, if possible.
 *
 * **Note:** Requires access to `singularity`, either on BN4 or SF4.
 *
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /runner/sf4/home.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    const homeStore = new HomeStore(ns);

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_PURCHASER.js", "home")) {
            ns.print(`[home] Available money ${homeStore.getAvailableMoney()}`);

            // Get best available purchase.
            const upgrade = homeStore.getCheapestUpgrade();
            if (upgrade) {
                await homeStore.purchase({ upgrade: upgrade });
            } else {
                ns.print(`[home] Nu purchase available right now!`);
            }

            await sleep(ns, 5 * 60 * 1000);
        } else {
            ns.print(`[home] Found file /flags/SKIP_PURCHASER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}
