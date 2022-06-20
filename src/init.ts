import { NS } from "Netscript";

import { ADVANCED_RUNNERS, RUNNERS } from "/_internal/constants/scripts.js";

/**
 * Execute set of automated scripts, based on `RUNNERS`.
 * @category Executable
 * @export
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");
    ns.toast("Initializing...", "info");

    // Kill all scripts on home
    ns.killall("home");

    let runners = RUNNERS;

    // Update runners if we have enough RAM
    if (ns.getServerMaxRam("home") > 256) {
        runners = [...ADVANCED_RUNNERS, ...RUNNERS.slice(1)];
    }

    // Execute all necessary scripts
    for (const filename of runners.map((f) => `/runners/${f}`)) {
        ns.toast(`Running ${filename}...`, "info");
        ns.exec(filename, "home");
        await ns.sleep(5 * 1000);
    }
}
