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
 *
 * @example
 * run /node/ps-control-scheduler.js
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    while (true) {
        const pools = await getPools(ns);
        const args = await getHackableHosts(ns);

        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_SCHEDULER.js", "home")) {
            for (let i = 0; i < pools.length; i++) {
                ns.print(
                    `[ps-control-scheduler] Executing on pool ${i} with servers: ${pools[i]}`
                );
                await executeOnPool(ns, pools[i], args);
            }

            // ns.print(`[ps-control-scheduler] Executing on home`);
            // await executeOnPool(ns, ["home"], args);

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
    for (let i = 0; i < hostnames.length; i++) {
        const finalScripts = { ...SCRIPTS };
        const scriptKeys = Object.keys(finalScripts);

        const hostname = hostnames[i];
        let ramAvail = ns.getServerMaxRam(hostname);

        if (ramAvail > 0) {
            ns.print(
                `[ps-control-scheduler] Killing existing scripts on ${hostname}`
            );
            let fnArgs = args.slice();

            if (hostname === "home") {
                ramAvail = ramAvail - 24;
            } else {
                fnArgs = fnArgs.filter(
                    (hn, k) => k % hostnames.length === i % hostnames.length
                );

                const hasLowMoney = fnArgs.some((hn) => {
                    const moneyAvail = ns.getServerMoneyAvailable(hn);
                    const maxMoney = ns.getServerMaxMoney(hn);
                    const moneyPct = moneyAvail / maxMoney;

                    ns.print(
                        `${hostname} Money ${moneyAvail} / ${maxMoney} = ${moneyPct} < ${MIN_SERVER_MONEY_PCT}`
                    );

                    return moneyPct < MIN_SERVER_MONEY_PCT;
                });
                if (hasLowMoney) {
                    ns.print(`Low money detected on pool`);
                    finalScripts[GROW_SCRIPT] = 100;
                    finalScripts[HACK_SCRIPT] = 0;
                }
            }

            for (let j = 0; j < scriptKeys.length; j++) {
                const filename = scriptKeys[j];
                const scriptWeightPct =
                    finalScripts[filename] /
                    Object.values(finalScripts).reduce((n, t) => n + t, 0);
                const threads = Math.floor(
                    (ramAvail / ns.getScriptRam(filename)) *
                        (scriptWeightPct - 0.01)
                );

                if (hostname !== "home") {
                    fnArgs = getFilteredArgs(ns, filename, fnArgs);

                    if (fnArgs.length === 0) {
                        fnArgs = getFilteredArgs(ns, filename, args);
                    }
                }

                const runningProc = ns
                    .ps(hostname)
                    .filter((proc) => proc.filename === filename);
                runningProc.forEach((proc) =>
                    ns.kill(proc.filename, hostname, ...proc.args)
                );

                if (threads > 0) {
                    ns.print(
                        `[ps-control-scheduler] Executing ${filename} on ${hostname} with ${
                            scriptWeightPct * 100
                        }% threads`
                    );

                    await scp(ns, hostname, [filename]);
                    exec(ns, hostname, filename, threads, fnArgs);
                }

                await ns.sleep(100);
            }

            await ns.sleep(500);
        }
    }
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
    let fnArgs = args.slice();

    if (filename === GROW_SCRIPT) {
        fnArgs = fnArgs.filter(
            (hn) => ns.getServerMoneyAvailable(hn) < ns.getServerMaxMoney(hn)
        );
    } else if (filename === WEAKEN_SCRIPT) {
        fnArgs = fnArgs.filter(
            (hn) =>
                ns.getServerSecurityLevel(hn) > ns.getServerMinSecurityLevel(hn)
        );
    }

    return fnArgs;
}
