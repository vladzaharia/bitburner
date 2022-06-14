import { NS } from "Netscript";

import { FocusManager } from "/_internal/classes/focus/_manager.js";
import { FactionFocusable } from "/_internal/classes/focus/factions";
import { ProgramFocusable } from "/_internal/classes/focus/programs.js";
import { sleep } from "/helpers/sleep.js";

/**
 * Automatically manage user's focus.
 *
 * Each cycle will:
 *  - Check what is currently focusable.
 *  - Execute highest priority focusable.
 *
 * Currently enrolled focusables:
 *  - Program creation
 *
 * **Note:** Requires access to `singularity`, either on BN4 or SF4.
 *
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /runner/sf4/focus.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    const focusManager = new FocusManager();

    // Register Program creation
    focusManager.register(new ProgramFocusable(ns));
    focusManager.register(new FactionFocusable(ns));

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_FOCUSER.js", "home")) {
            // Check if anything if focusable
            if (focusManager.canFocus()) {
                const sleepTime = focusManager.focus();
                if (sleepTime > 0) {
                    ns.print(`[focus] Focusing...`);
                    await sleep(ns, sleepTime);
                } else {
                    ns.print(`[focus] Failed to focus! Trying again...`);
                    await sleep(ns, 5 * 1000, false);
                }
            } else {
                ns.print(`[focus] Can't focus on anything!`);
                await sleep(ns, 5 * 60 * 1000);
            }
        } else {
            ns.print(`[home] Found file /flags/SKIP_FOCUSER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}