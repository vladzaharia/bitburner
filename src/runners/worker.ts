import { NS } from "Netscript";

import { WorkerStore } from "/_internal/classes/store/worker.js";
import { sleep } from "/helpers/sleep.js";

/**
 * Automatically maintain personal servers.
 *
 * Each cycle will:
 *  - Check for RAM upgrade based on available money.
 *  - If RAM needs upgrading, sell all purchased servers.
 *  - Fill available servers up to capacity in pools.
 *
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /node/ps-control-purchaser.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    const workerStore = new WorkerStore(ns);

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_PURCHASER.js", "home")) {
            ns.print(
                `[purchaser] Available money ${workerStore.getAvailableMoney()}`
            );

            // Sell servers if we need to upgrade RAM
            workerStore.sellServersIfNeeded();

            let purchasedServers = workerStore.getWorkers();
            const max = ns.getPurchasedServerLimit();

            // End script if no upgrades possible
            if (
                workerStore.getCurrentRAM() === 2048 &&
                purchasedServers.length === max
            ) {
                ns.print(`[purchaser] No further upgrades possible!`);
                return;
            }

            ns.print(
                `[purchaser] Purchased servers ${purchasedServers.length}/${max}`
            );

            while (purchasedServers.length < max) {
                const purchased = await workerStore.purchase({
                    ram: workerStore.getCurrentRAM(),
                });

                if (purchased) {
                    purchasedServers = workerStore.getWorkers();

                    await sleep(ns, 1000, false);
                }
            }

            ns.print(`[purchaser] At max personal servers (${max})`);
            await sleep(ns, 30 * 60 * 1000);
        } else {
            ns.print(`[watcher] Found file /flags/SKIP_PURCHASER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}
