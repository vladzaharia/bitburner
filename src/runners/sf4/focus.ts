import { NS } from "Netscript";

import { FocusManager } from "/_internal/classes/focus/_manager.js";
import { CompanyFocusable } from "/_internal/classes/focus/companies.js";
import { CrimeFocusable } from "/_internal/classes/focus/crime.js";
import { FactionFocusable } from "/_internal/classes/focus/factions.js";
import { ProgramFocusable } from "/_internal/classes/focus/programs.js";
import { TrainingFocusable } from "/_internal/classes/focus/train.js";
import { getHumanDuration, sleep } from "/_internal/classes/sleep.js";

/**
 * Automatically manage user's focus.
 *
 * Each cycle will:
 *  - Check what is currently focusable.
 *  - Execute highest priority focusable.
 *
 * Currently enrolled focusables:
 *  - Program creation
 *  - Faction work
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

    const focusManager = new FocusManager(ns);

    // Register Program creation
    focusManager.register(new ProgramFocusable(ns));

    // Register Faction work
    focusManager.register(new FactionFocusable(ns));

    // Register Company work
    focusManager.register(new CompanyFocusable(ns));

    // Register Crime work
    focusManager.register(new CrimeFocusable(ns));

    // Register Training
    focusManager.register(new TrainingFocusable(ns));

    while (true) {
        if (focusManager.decrementFocusTime() > 0) {
            if (!focusManager.isWorking()) {
                ns.print(`[focus] No longer working, clearing focus`);
                focusManager.clearFocus();
            } else {
                await sleep(ns, focusManager.getCheckInterval(), false);
            }
        } else {
            ns.clearLog();

            if (!ns.fileExists("/flags/SKIP_FOCUSER.js", "home")) {
                // Clear any stray focus
                focusManager.clearFocus();

                // Check if anything if focusable
                if (focusManager.canFocus()) {
                    const sleepTime = focusManager.focus();
                    if (sleepTime > 0) {
                        ns.print(
                            `[focus] Focusing for ${getHumanDuration(
                                sleepTime
                            )}, checking every ${getHumanDuration(
                                focusManager.getCheckInterval()
                            )}`
                        );
                        await sleep(
                            ns,
                            Math.min(
                                sleepTime + 1000,
                                focusManager.getCheckInterval()
                            ),
                            false
                        );
                    } else {
                        ns.print(`[focus] Failed to focus! Trying again...`);
                        await sleep(ns, 5 * 1000, false);
                    }
                } else {
                    ns.print(`[focus] Can't focus on anything!`);
                    await sleep(ns, 60 * 1000);
                }
            } else {
                ns.print(`[home] Found file /flags/SKIP_FOCUSER.js`);
                await sleep(ns, 60 * 1000);
            }
        }
    }
}
