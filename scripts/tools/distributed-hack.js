import { getControlServers, getRootedHosts, getPersonalServers, getWorkerServers } from "/helpers/discover.js";
import { exec, scp } from "/tools/scp-exec.js";

const SCRIPTS = {
    "/helpers/hack.js": 50,
    "/helpers/weaken.js": 25,
    "/helpers/grow.js": 25
}

/** @param {NS} ns */
export async function main(ns) {
	let hostnames = await getPersonalServers(ns);
	const args = await getRootedHosts(ns, [], 5);
    let finalScripts = { ... SCRIPTS };
    const scriptKeys = Object.keys(finalScripts);

	ns.print(`[distributed-hack] Found ${hostnames.length} personal servers: ${hostnames}`);

	// Filter based on arg[0] if provided
	if (ns.args.length > 0) {
		const hostnameArg = ns.args[0];

		if (hostnameArg === "control") {
			hostnames = await getControlServers(ns);
			ns.print(`[distributed-hack] Filtered to control servers: ${hostnames}`);
		} else if (hostnameArg === "worker") {
			hostnames = await getWorkerServers(ns);
			ns.print(`[distributed-hack] Filtered to worker servers: ${hostnames}`);
		} else {
			await getPersonalServers(ns);
			hostnames = hostnames.filter((hn) => hn.indexOf(hostnameArg) !== -1);
			ns.print(`[distributed-hack] Filtered based on ${hostnameArg}: ${hostnames}`);
		}

		// Change hack/weaken/grow percents
		if (ns.args.length > 1) {
            for (let i = 1; i < ns.args.length && i < (finalScripts.length - 1); i++) {
                finalScripts[scriptKeys[i-1]] = ns.args[i];
            }
		}
	}

	for (let i = 0; i < hostnames.length; i++) {
		const hostname = hostnames[i];

        ns.print(`[distributed-hack] Killing existing scripts on ${hostname}`);
        await ns.killall(hostname);

        for (let j = 0; j < scriptKeys.length; j++) {
            const filename = scriptKeys[j];
            const scriptWeightPct = finalScripts[filename] / Object.values(finalScripts).reduce((n, t) => n + t, 0);
            const threads = Math.floor((ns.getServerMaxRam(hostname) / ns.getScriptRam(filename)) * scriptWeightPct);
            let fnArgs = args.slice();
            fnArgs = fnArgs.filter((hn, k) => k % hostnames.length === i % hostnames.length);

            ns.print(`[distributed-hack] Executing ${filename} on ${hostname} with ${scriptWeightPct * 100}% threads`);
            await scp(ns, hostname, filename);
            await exec(ns, hostname, filename, threads, fnArgs);

            await ns.sleep(1000);
        }
	}
}