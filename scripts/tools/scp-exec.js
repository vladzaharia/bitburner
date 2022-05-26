import { getControlServers, getRootedHosts, getPersonalServers, getWorkerServers } from "/helpers/discover.js";
import { exec } from "/helpers/exec.js";
import { scp } from "/helpers/scp.js";

/** @param { import("../../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
	let hostnames = await getPersonalServers(ns);
	const hackableHosts = await getRootedHosts(ns);
	let threads = 0;
	let filename = "/helpers/hack-weaken-grow.js";
	let args = hackableHosts;

	ns.print(`[scp-exec] Found ${hostnames.length} personal servers: ${hostnames}`);

	// Filter based on arg[0] if provided
	if (ns.args.length > 0) {
		const hostnameArg = ns.args[0];

		if (hostnameArg === "control") {
			hostnames = await getControlServers(ns);
			ns.print(`[scp-exec] Filtered to control servers: ${hostnames}`);
		} else if (hostnameArg === "worker") {
			hostnames = await getWorkerServers(ns);
			ns.print(`[scp-exec] Filtered to worker servers: ${hostnames}`);
		} else {
			hostnames = hostnames.filter((hn) => hn.indexOf(hostnameArg) !== -1);
			ns.print(`[scp-exec] Filtered based on ${hostnameArg}: ${hostnames}`);
		}

		// Execute alternative script
		if (ns.args.length > 1) {
			filename = ns.args[1];
            args = [];
			ns.print(`[scp-exec] Executing alternative script: ${filename}`);

			// Change number of threads
			if (ns.args.length > 2) {
				threads = ns.args[2];
				ns.print(`[scp-exec] Executing alternative thread count: ${threads}`);

				// Send rest of arguments to the script
				if (ns.args.length > 3) {
					args = ns.args.slice(3);
				}
			}
		}		
	}

	for (let i = 0; i < hostnames.length; i++) {
		const hostname = hostnames[i];
        let fnArgs = args.slice();

        if (ns.args.indexOf("targets") !== -1 && ns.args.length < 4) {
            fnArgs = fnArgs.filter((hn, j) => j % hostnames.length === i % hostnames.length);
        }

		// Kill existing scripts
		ns.print(`[scp-exec] Killing existing scripts on ${hostname}`);
	 	await ns.killall(hostname);

		// Copy and execute
		await scp(ns, hostname, filename);		
		await exec(ns, hostname, filename, threads, fnArgs);
		
		await ns.sleep(1000);
	}
}
