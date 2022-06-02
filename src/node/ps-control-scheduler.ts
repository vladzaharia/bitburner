import { NS } from "Netscript";
import {
    getHackableHosts,
    getRootedHosts,
    getWorkerServers,
} from "/helpers/discover.js";
import { exec } from "/helpers/exec.js";
import { scp } from "/helpers/scp.js";

const HACK_SCRIPT = "/helpers/hack.js";
const WEAKEN_SCRIPT = "/helpers/weaken.js";
const GROW_SCRIPT = "/helpers/grow.js";

const SCRIPTS: { [key: string]: number } = {};
SCRIPTS[HACK_SCRIPT] = 25;
SCRIPTS[WEAKEN_SCRIPT] = 25;
SCRIPTS[GROW_SCRIPT] = 50;

const HOSTS_PER_POOL = 8;

const MIN_SERVER_MONEY_PCT = 0.5;
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
 * @example
 * ```shell
 * run /node/ps-control-scheduler.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    while (true) {
        const pools = getPools(ns);
        const args = getHackableHosts(ns);

        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_SCHEDULER.js", "home")) {
            for (let i = 0; i < pools.length; i++) {
                ns.print(
                    `[ps-control-scheduler] Executing on pool ${i} with servers: ${pools[i]}`
                );
                await executeOnPool(ns, pools[i], args);
            }

            ns.print(`[ps-control-scheduler] Executing on home`);
            await executeOnPool(ns, ["home"], args);

            ns.print(
                `[ps-control-scheduler] Finished scheduling nodes, sleeping for 1hr at ${new Date().toTimeString()}`
            );
            await ns.sleep(60 * 60 * 1000);
        } else {
            ns.print(
                `[ps-control-scheduler] Found file /flags/SKIP_SCHEDULER.js, sleeping for 1min at ${new Date().toTimeString()}`
            );
            await ns.sleep(60 * 1000);
        }
    }
}

/**
 * Get all pools available.
 *
 * @param {NS} ns - The Netscript object.
 * @returns {string[][]} All pools - worker, rooted and home.
 */
function getPools(ns: NS): string[][] {
    const workers = getWorkerServers(ns);
    ns.print(`[ps-control-scheduler] Workers: ${workers}`);

    const rootedNodes = getRootedHosts(ns);
    ns.print(`[ps-control-scheduler] Rooted nodes: ${rootedNodes}`);

    return [...splitWorkers(ns, workers), ...splitHostnames(ns, rootedNodes)];
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

    for (let i = 0; i < hostnames.length; i++) {
        if (i === HOSTS_PER_POOL) {
            ns.print(`[ps-control-scheduler] New pool created`);
            finalHostnames = [...finalHostnames, currentPoolHostnames];
            currentPoolHostnames = [];
        }

        ns.print(
            `[ps-control-scheduler] Added ${hostnames[i]} to pool ${currentPoolHostnames}`
        );
        currentPoolHostnames.push(hostnames[i]);
    }

    finalHostnames = [...finalHostnames, currentPoolHostnames];

    return finalHostnames;
}

/**
 * Split workers into pools.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string[]} hostnames - The workers to split into pools, based on `ps-worker[n]`.
 * @returns {string[][]} The pools of workers with the same `n`.
 */
function splitWorkers(ns: NS, hostnames: string[]): string[][] {
    let finalHostnames: string[][] = [];
    let currentPool = 0;
    let currentPoolHostnames: string[] = [];
    const regex = /^ps-worker(\d)-(\d)$/;

    hostnames.forEach((hn) => {
        const match = hn.match(regex);

        if (match && parseInt(match[1], 10) > currentPool) {
            ns.print(`[ps-control-scheduler] New pool found ${match[1]}`);
            finalHostnames = [...finalHostnames, currentPoolHostnames];
            currentPool = parseInt(match[1], 10);
            currentPoolHostnames = [];
        }

        ns.print(`[ps-control-scheduler] Added ${hn} to pool ${currentPool}`);
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
    const scriptArgs = {};

    for (let j = 0; j < scriptKeys.length; j++) {
        const filename = scriptKeys[j];
        scriptArgs[filename] = getFilteredArgs(ns, filename, args);
    }

    // Sort args by money available, descending order
    args = args.sort(
        (hn1, hn2) =>
            ns.getServerMoneyAvailable(hn2) - ns.getServerMoneyAvailable(hn1)
    );

    // For each host in pool, grab args, check if need to h/w/g and execute
    for (let i = 0; i < hostnames.length; i++) {
        const hostname = hostnames[i];

        let finalScripts = { ...SCRIPTS };

        let ramAvail = ns.getServerMaxRam(hostname);

        // Reserve space on home for node scripts
        if (hostname === "home") {
            ramAvail = ramAvail - 32;
        }

        ns.print(
            `[ps-control-scheduler] Final Weights ${Object.values(
                finalScripts
            )}, RAM ${ramAvail}`
        );

        // Basic check that RAM is available
        if (ramAvail > 0) {
            for (let j = 0; j < scriptKeys.length; j++) {
                const filename = scriptKeys[j];

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
                        `[ps-control-scheduler] Executing ${filename} on ${hostname} with ${
                            scriptWeightPct * 100
                        }% threads`
                    );

                    killRunningScript(ns, hostname, filename);

                    await scp(ns, hostname, [filename]);

                    for (let k = 0; k < fnArgs.length; k++) {
                        exec(ns, hostname, filename, threads, [fnArgs[k]]);
                    }
                }
                await ns.sleep(100);
            }
            await ns.sleep(500);
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
        `[ps-control-scheduler] Killing existing instance of ${filename} on ${hostname}`
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
 * Get total filtered args.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string[]} args - Args to run the scripts with.
 * @returns {number} Total number of filtered args across scripts.
 */
function getTotalFilteredArgs(ns: NS, args: string[]): number {
    let result = 0;

    const scriptKeys = Object.keys(SCRIPTS);

    for (let j = 0; j < scriptKeys.length; j++) {
        result += getFilteredArgs(ns, scriptKeys[j], args).length;
    }

    return result;
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
