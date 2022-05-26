import { getRootedHosts, getWorkerServers } from "/helpers/discover.js";
import { exec, scp } from "/tools/scp-exec.js";

const SCRIPTS = {
    "/helpers/hack.js": 50,
    "/helpers/weaken.js": 25,
    "/helpers/grow.js": 25
};
const HOSTS_PER_POOL = 6;

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    const firstRun = true;
    let pools = await getPools(ns);

    while (true) {
        if (firstRun) {
            for (let i = 0; i < pools.length; i++) {
                ns.print(`[ps-control-scheduler] Executing on pool ${i} with servers: ${pools[i]}`);
                await executeOnPool(ns, pools[i]);
            }
        } else {
            const newPools = await getPools(ns);
            const newNodes = getNewNodes(pools, newPools);

            if (newNodes.length > 0) {
                ns.print(`[ps-control-scheduler] Executing on new nodes: ${newNodes}`);
                await executeOnPool(ns, newNodes);
            } else {
                ns.print("No new nodes found");
            }
        }
    }
}

/**
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @returns {string[][]}
 */
async function getPools(ns) {
    const workers = await getWorkerServers(ns);
    const rootedNodes = await getRootedHosts(ns);
    return [... splitWorkers(ns, workers), ... splitHostnames(ns, rootedNodes)];
}

/**
 * @param {string[][]} oldPools
 * @param {string[][]} newPools
 * @returns {string[]}
 */
function getNewNodes(oldPools, newPools) {
    const oldNodes = oldPools.flat();
    const newNodes = newPools.flat();

    return newNodes.filter((hn) => oldNodes.indexOf(hn) === -1);
}

/**
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {string[]} hostnames 
 * @returns {string[][]}
 */
 function splitHostnames(ns, hostnames) {
    let finalHostnames = [];
    let currentPoolHostnames = [];

    for (let i = 0; i < hostnames.length; i++) {
        if (i % HOSTS_PER_POOL === 0) {
            finalHostnames = [... finalHostnames, currentPoolHostnames];
            currentPoolHostnames = [];
        }

        currentPoolHostnames.push(hostnames[i])
    }

    return finalHostnames;
}

/**
 *  @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {string[]} hostnames 
 * @returns {string[][]}
 */
function splitWorkers(ns, hostnames) {
    let finalHostnames = [];
    let currentPool = 0;
    let currentPoolHostnames = [];
    const regex = /^ps-worker(\d)-(\d)$/;

    hostnames.forEach(hn => {
        const match = hn.match(regex);

        if (match[1] > currentPool) {
            ns.print(`[ps-control-scheduler] New pool found ${match[1]}`);
            finalHostnames = [... finalHostnames, currentPoolHostnames];
            currentPool = match[1];
            currentPoolHostnames = [];
        }

        ns.print(`[ps-control-scheduler] Added ${hn} to pool ${currentPool}`);
        currentPoolHostnames.push(hn);
    });

    finalHostnames = [... finalHostnames, currentPoolHostnames];

    return finalHostnames;
}

async function executeOnPool(ns, hostnames) {
	const args = await getRootedHosts(ns);
    let finalScripts = { ... SCRIPTS };
    const scriptKeys = Object.keys(finalScripts);

    for (let i = 0; i < hostnames.length; i++) {
		const hostname = hostnames[i];
        const ramAvail = ns.getServerMaxRam(hostname);

        if (ramAvail > 0) {
            ns.print(`[ps-control-scheduler] Killing existing scripts on ${hostname}`);
            await ns.killall(hostname);

            for (let j = 0; j < scriptKeys.length; j++) {
                const filename = scriptKeys[j];
                const scriptWeightPct = finalScripts[filename] / Object.values(finalScripts).reduce((n, t) => n + t, 0);
                const threads = Math.floor((ramAvail / ns.getScriptRam(filename)) * scriptWeightPct);
                let fnArgs = args.slice();
                fnArgs = fnArgs.filter((hn, k) => k % hostnames.length === i % hostnames.length);

                ns.print(`[ps-control-scheduler] Executing ${filename} on ${hostname} with ${scriptWeightPct * 100}% threads`);
                await scp(ns, hostname, filename);
                await exec(ns, hostname, filename, threads, fnArgs);

                await ns.sleep(100);
            }

            await ns.sleep(500);
        }
	}
}