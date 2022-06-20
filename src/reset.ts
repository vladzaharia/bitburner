import { NS } from "Netscript";

import { AugmentationStore } from "/_internal/classes/store/augmentations.js";
import { sleep } from "/helpers/sleep.js";

/** Order to run bitnodes, will try to fill. */
const BITNODE_ORDER = [1, 4];

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
 * @example Skip Red Pill check
 * ```shell
 * run /reset.js true
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");
    ns.clearLog();

    if (
        ns.singularity.getOwnedAugmentations().includes("The Red Pill") &&
        !(ns.args[0] as boolean)
    ) {
        ns.print(
            `[reset] Red Pill owned, checking if we can destroy w0r1d_d43m0n`
        );
        const level = ns.getHackingLevel();
        const reqLevel = ns.getServerRequiredHackingLevel("w0r1d_d43m0n");

        if (level > reqLevel) {
            const available = ns
                .getOwnedSourceFiles()
                .filter((os) => os.lvl < 3);
            const priority = available.filter((os) =>
                BITNODE_ORDER.includes(os.n)
            );

            let bitnode = available[0];

            if (priority.length > 0) {
                bitnode = priority[0];
            }

            ns.print(
                `[reset] Destroying w0r1d_d43m0n and hopping to BN${bitnode.n} (${bitnode.lvl}/3)`
            );
            ns.singularity.destroyW0r1dD43m0n(bitnode.n, "init.js");
        } else {
            ns.print(
                `[reset] Do not have enough hacking level ${level}/${reqLevel}`
            );
        }
    } else {
        const augmentationStore = new AugmentationStore(ns);
        let augmentationToPurchase =
            augmentationStore.getAugmentationToPurchase();

        ns.print(`[reset] Purchasing augmentations...`);
        while (augmentationToPurchase) {
            augmentationStore.purchase(augmentationToPurchase);
            augmentationToPurchase =
                augmentationStore.getAugmentationToPurchase();

            await sleep(ns, 2 * 1000);
        }

        // Install augmentations and run init.js script
        ns.print(`[reset] Installing augmentations...`);
        ns.singularity.installAugmentations("init.js");
    }
}
