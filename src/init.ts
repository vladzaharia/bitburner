import { NS } from "Netscript";

/**
 * All runners to execute.
 * @type {string[]}
 */
const RUNNERS: string[] = [
    // "cracker.js",
    "sf4/backdoor-cracker.js",
    "sf4/home.js",
    "sf4/joiner.js",
    "sf4/focus.js",
    "worker.js",
    "scheduler.js",
    "hacknet.js",
    // "watcher.js",
];

/**
 * Execute set of automated scripts, based on `RUNNERS`.
 * @category Executable
 * @export
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    // Kill and execute runners on "home"
    for (const filename of RUNNERS.map((f) => `/runners/${f}`)) {
        ns.kill(filename, "home");
        ns.exec(filename, "home");

        await ns.sleep(5 * 1000);
    }
}
