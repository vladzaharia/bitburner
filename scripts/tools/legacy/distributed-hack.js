import { getControlServers, getRootedHosts, getPersonalServers, getWorkerServers } from "/helpers/discover.js";
import { exec, scp } from "/tools/scp-exec.js";

const SCRIPTS = {
    "/helpers/hack.js": 50,
    "/helpers/weaken.js": 25,
    "/helpers/grow.js": 25
}

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
	let hostnames = await getPersonalServers(ns);
    let pools = [];

	// Filter based on arg[0] if provided
	if (ns.args.length > 0) {
		const hostnameArg = ns.args[0];

	    if (hostnameArg === "worker") {
			hostnames = await getWorkerServers(ns);
            pools = splitWorkers(ns, hostnames);
            ns.print(`[distributed-hack] Using worker servers: ${hostnames}`);
		} else if (hostnameArg === "rooted") {
			hostnames = await getRootedHosts(ns);
			ns.print(`[distributed-hack] Using rooted servers: ${hostnames}`);
		} else {
			hostnames = hostnames.filter((hn) => hn.indexOf(hostnameArg) !== -1);
			ns.print(`[distributed-hack] Filtered based on ${hostnameArg}: ${hostnames}`);
		}
	}

    if (pools.length === 0) {
        pools = splitHostnames(ns, hostnames);
    }

    for (let i = 0; i < pools.length; i++) {
        ns.print(`[distributed-hack] Executing on pool ${i} with servers: ${pools[i]}`);
        await executeOnPool(ns, pools[i]);
    }
}

/**
 * @param {string[]} hostnames 
 * @returns {string[]}
 */
 function splitHostnames(ns, hostnames) {
    let finalHostnames = [];
    let currentPoolHostnames = [];

    const hostsPerPool = 6;
    for (let i = 0; i < hostnames.length; i++) {
        if (i % 6 === 0) {
            finalHostnames = [... finalHostnames, currentPoolHostnames];
            currentPoolHostnames = [];
        }

        currentPoolHostnames.push(hostnames[i])
    }

    return finalHostnames;
}

/**
 * @param {string[]} hostnames 
 * @returns {string[]}
 */
function splitWorkers(ns, hostnames) {
    let finalHostnames = [];
    let currentPool = 0;
    let currentPoolHostnames = [];
    const regex = /^ps-worker(\d)-(\d)$/;

    hostnames.forEach(hn => {
        const match = hn.match(regex);

        if (match[1] > currentPool) {
            ns.print(`[distributed-hack] New pool found ${match[1]}`);
            finalHostnames = [... finalHostnames, currentPoolHostnames];
            currentPool = match[1];
            currentPoolHostnames = [];
        }

        ns.print(`[distributed-hack] Added ${hn} to pool ${currentPool}`);
        currentPoolHostnames.push(hn);
    });

    finalHostnames = [... finalHostnames, currentPoolHostnames];

    return finalHostnames;
}

async function executeOnPool(ns, hostnames) {
	const args = await getRootedHosts(ns);
    let finalScripts = { ... SCRIPTS };
    const scriptKeys = Object.keys(finalScripts);

    // Change hack/weaken/grow percents
    if (ns.args.length > 1) {
        for (let i = 1; i < ns.args.length && i < (finalScripts.length - 1); i++) {
            finalScripts[scriptKeys[i-1]] = ns.args[i];
        }
    }

    for (let i = 0; i < hostnames.length; i++) {
		const hostname = hostnames[i];
        const ramAvail = ns.getServerMaxRam(hostname);

        if (ramAvail > 0) {
            ns.print(`[distributed-hack] Killing existing scripts on ${hostname}`);
            await ns.killall(hostname);

            for (let j = 0; j < scriptKeys.length; j++) {
                const filename = scriptKeys[j];
                const scriptWeightPct = finalScripts[filename] / Object.values(finalScripts).reduce((n, t) => n + t, 0);
                const threads = Math.floor((ramAvail / ns.getScriptRam(filename)) * scriptWeightPct);
                let fnArgs = args.slice();
                fnArgs = fnArgs.filter((hn, k) => k % hostnames.length === i % hostnames.length);

                ns.print(`[distributed-hack] Executing ${filename} on ${hostname} with ${scriptWeightPct * 100}% threads`);
                await scp(ns, hostname, filename);
                await exec(ns, hostname, filename, threads, fnArgs);

                await ns.sleep(100);
            }

            await ns.sleep(500);
        }
	}
}