import { NS } from "Netscript";

import { AugmentationStore } from "/_internal/classes/store/augmentations.js";
import { sleep } from "/helpers/sleep.js";

/**
 * Automatically purchase and install augmentations, or if endgame is available, try destroying w0r1d_d43m0n.
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /reset.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");
    ns.clearLog();

    const augmentationStore = new AugmentationStore(ns);
    let augmentationToPurchase = augmentationStore.getAugmentationToPurchase();

    ns.print(`[reset] Purchasing augmentations...`);
    while (augmentationToPurchase) {
        augmentationStore.purchase(augmentationToPurchase);
        augmentationToPurchase = augmentationStore.getAugmentationToPurchase();

        await sleep(ns, 2 * 1000);
    }

    // Install augmentations and run init.js script
    ns.print(`[reset] Installing augmentations...`);
    ns.singularity.installAugmentations("init.js");
}
