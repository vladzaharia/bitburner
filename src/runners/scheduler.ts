import { NS } from "Netscript";

import { Scanner } from "/_internal/classes/scanner.js";
import { exec } from "/helpers/exec.js";
import { scp } from "/helpers/scp.js";
import { sleep } from "/helpers/sleep.js";

/** Path to hack script to execute on hosts. */
const HACK_SCRIPT = "/helpers/hack.js";

/** Path to weaken script to execute on hosts. */
const WEAKEN_SCRIPT = "/helpers/weaken.js";

/** Path to grow script to execute on hosts. */
const GROW_SCRIPT = "/helpers/grow.js";

/** Weights of individual scripts, used to determine thread count. */
const SCRIPTS: { [key: string]: number } = {};
SCRIPTS[HACK_SCRIPT] = 25;
SCRIPTS[WEAKEN_SCRIPT] = 25;
SCRIPTS[GROW_SCRIPT] = 50;

/** Number of hosts per pool, for rooted servers. */
const HOSTS_PER_POOL = 8;

/** Minimum server money % to hack. */
const MIN_SERVER_MONEY_PCT = 0.25;

/** Minimum security level threshold to stop weakening. */
const MIN_SEC_LEVEL = 2;

/**
 * Automatically execute a parallelized HWG cycle on all availbe hosts.
 *
 * On each pool, will:
 *  - Split hackable hosts by workers in pool
 *  - Check if any host is low on money
 *  - Execute 80W/20G (if money needed) or 25H/25W/50G scripts on hosts in pool
 *
 * Pools:
 *  - Personal worker pools, ps-worker[0..n]
 *  - Rooted server pools, with `HOSTS_PER_POOL`
 *  - ["home"]
 *
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /node/ps-control-scheduler.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    const scanner = new Scanner(ns);

    while (true) {
        const pools = getPools(ns, scanner);
        const args = scanner.getHostnames("hackable");

        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_SCHEDULER.js", "home")) {
            for (let i = 0; i < pools.length; i++) {
                ns.print(
                    `[scheduler] Executing on pool ${i} with servers: ${pools[i]}`
                );
                await executeOnPool(ns, pools[i], args);
            }

            ns.print(`[scheduler] Executing on home`);
            await executeOnPool(ns, ["home"], args);

            ns.print(`[scheduler] Finished scheduling nodes`);
            await sleep(ns, 15 * 60 * 1000);
        } else {
            ns.print(`[scheduler] Found file /flags/SKIP_SCHEDULER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}

/**
 * Get all pools available.
 *
 * @param {NS} ns - The Netscript object.
 * @param {Scanner} scanner - Scanner class to use for hostname lookups.
 * @returns {string[][]} All pools - worker, rooted and home.
 */
function getPools(ns: NS, scanner: Scanner): string[][] {
    const workers = scanner.getHostnames("worker");
    ns.print(`[scheduler] Workers: ${workers}`);

    const rootedNodes = scanner.getHostnames("rooted");
    ns.print(`[scheduler] Rooted nodes: ${rootedNodes}`);

    return [...splitHostnames(ns, workers), ...splitHostnames(ns, rootedNodes)];
}

/**
 * Split hostnames into pools.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string[]} hostnames - Hostnames to split into pools.
 * @returns {string[][]} The pools of `hostnames` split into pools based on `HOSTS_PER_POOL.
 */
function splitHostnames(ns: NS, hostnames: string[]): string[][] {
    let finalHostnames: string[][] = [];
    let currentPoolHostnames: string[] = [];

    hostnames.forEach((hn, i) => {
        if (i === HOSTS_PER_POOL) {
            ns.print(`[scheduler] New pool created`);
            finalHostnames = [...finalHostnames, currentPoolHostnames];
            currentPoolHostnames = [];
        }

        ns.print(`[scheduler] Added ${hn} to pool ${currentPoolHostnames}`);
        currentPoolHostnames.push(hn);
    });

    finalHostnames = [...finalHostnames, currentPoolHostnames];

    return finalHostnames;
}

/**
 * Execute HWG scripts on all hosts in pool.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string[]} hostnames - The hostnames to run the HWG script on.
 * @param {string[]} args - Args to run the scripts with.
 */
async function executeOnPool(ns: NS, hostnames: string[], args: string[]) {
    // Sort hostnames by RAM, descending order
    hostnames = hostnames.sort(
        (hn1, hn2) => ns.getServerMaxRam(hn2) - ns.getServerMaxRam(hn1)
    );

    const scriptKeys = Object.keys(SCRIPTS);
    const scriptArgs: { [key: string]: string[] } = {};

    scriptKeys.forEach((f) => (scriptArgs[f] = getFilteredArgs(ns, f, args)));

    // Sort args by money available, descending order
    args = args.sort(
        (hn1, hn2) =>
            ns.getServerMoneyAvailable(hn2) - ns.getServerMoneyAvailable(hn1)
    );

    // For each host in pool, grab args, check if need to h/w/g and execute
    for (let i = 0; i < hostnames.length; i++) {
        const hostname = hostnames[i];

        const finalScripts = { ...SCRIPTS };

        let ramAvail = ns.getServerMaxRam(hostname);

        // Reserve space on home for node scripts
        if (hostname === "home") {
            ramAvail = ramAvail - 16;
            finalScripts[HACK_SCRIPT] = 0;
        }

        ns.print(
            `[scheduler] Final Weights ${Object.values(
                finalScripts
            )}, RAM ${ramAvail}`
        );

        // Basic check that RAM is available
        if (ramAvail > 0) {
            for (const filename of scriptKeys) {
                // Kill all running instances of script
                killRunningScript(ns, hostname, filename);

                const fnArgs = scriptArgs[filename].filter(
                    (hn, k) => k % hostnames.length === i % hostnames.length
                );

                const scriptWeightPct =
                    finalScripts[filename] /
                    Object.values(finalScripts).reduce((n, t) => n + t, 0);

                const threads = Math.floor(
                    (ramAvail * scriptWeightPct) /
                        ns.getScriptRam(filename) /
                        fnArgs.length
                );

                if (threads > 0) {
                    ns.print(
                        `[scheduler] Executing ${filename} on ${hostname} with ${
                            scriptWeightPct * 100
                        }% threads`
                    );

                    await scp(ns, hostname, [filename]);

                    fnArgs.forEach((hn) =>
                        exec(ns, hostname, filename, threads, [hn])
                    );
                }
                await sleep(ns, 100, false);
            }
            await sleep(ns, 500, false);
        }
    }
}

/**
 * Kills all running instances of script, regardless of threads and args.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to kill script on.
 * @param {string} filename - Which script to kill.
 */
function killRunningScript(ns: NS, hostname: string, filename: string) {
    ns.print(
        `[scheduler] Killing existing instance of ${filename} on ${hostname}`
    );

    // Get running instance(s)
    const runningProc = ns
        .ps(hostname)
        .filter((proc) => proc.filename === filename);

    // Kill instance(s)
    runningProc.forEach((proc) =>
        ns.kill(proc.filename, hostname, ...proc.args)
    );
}

/**
 * Exclude servers which wouldn't benefit from a weaken/grow operation.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} filename - Which script to check against.
 * @param {string[]} args - Existing list of arguments.
 * @returns {string[]} List of arguments without unnecessary hostnames.
 */
function getFilteredArgs(ns: NS, filename: string, args: string[]): string[] {
    return args.slice().filter((hn) => shouldExecute(ns, hn, filename));
}

/**
 * Checks whether `hostname` should execute `filename`.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to check for.
 * @param {string} filename - Which script to check against.
 * @returns {boolean} Whether the script should be executed.
 */
function shouldExecute(ns: NS, hostname: string, filename: string): boolean {
    if (filename === GROW_SCRIPT) {
        return shouldGrow(ns, hostname);
    } else if (filename === WEAKEN_SCRIPT) {
        return shouldWeaken(ns, hostname);
    } else if (filename === HACK_SCRIPT) {
        return shouldHack(ns, hostname);
    }

    return true;
}

/**
 * Check whether `hostname` should be hacked.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to check.
 * @returns {boolean} Whether `hostname` should be hacked.
 */
function shouldHack(ns: NS, hostname: string): boolean {
    const avail = ns.getServerMoneyAvailable(hostname);
    const max = ns.getServerMaxMoney(hostname);

    // Only hack if above threshold.
    return max > 0 && avail > max * MIN_SERVER_MONEY_PCT;
}

/**
 * Check whether `hostname` should be grown.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to check.
 * @returns {boolean} Whether `hostname` should be grown.
 */
function shouldGrow(ns: NS, hostname: string): boolean {
    const avail = ns.getServerMoneyAvailable(hostname);
    const max = ns.getServerMaxMoney(hostname);

    // Always grow if possible
    return max > 0 && avail < max;
}

/**
 * Check whether `hostname` should be weakened.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to check.
 * @returns {boolean} Whether `hostname` should be weakened.
 */
function shouldWeaken(ns: NS, hostname: string): boolean {
    const avail = ns.getServerSecurityLevel(hostname);
    const min = ns.getServerMinSecurityLevel(hostname);

    // Weaken if above threshold
    return avail > min + MIN_SEC_LEVEL;
}
