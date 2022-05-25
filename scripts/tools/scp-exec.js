import { getControlServers, getRootedHosts, getPersonalServers, getWorkerServers } from "/helpers/discover.js";

/** @param {NS} ns */
export async function main(ns) {
	let hostnames = await getPersonalServers(ns);
	const hackableHosts = await getRootedHosts(ns, [], 5);
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
			await getPersonalServers(ns);
			hostnames = hostnames.filter((hn) => hn.indexOf(hostnameArg) !== -1);
			ns.print(`[scp-exec] Filtered based on ${hostnameArg}: ${hostnames}`);
		}

		// Execute alternative script
		if (ns.args.length > 1) {
			filename = ns.args[1];
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

        if (ns.args.contains("targets") && ns.args.length < 4) {
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

/** 
 * @param {NS} ns
 * @param {string} hostname
 * @param {string} filename
 */
export async function scp(ns, hostname, filename) {
    const additionalFiles = ns.ls("home").filter((file) => file.startsWith("/helpers") || file.startsWith("/node"));

    ns.print(`[scp-exec] Copying helper scripts and ${filename} to ${hostname}`);
    await ns.scp([filename, ... additionalFiles], hostname);
}

/** 
 * @param {NS} ns
 * @param {string} hostname
 * @param {string} filename
 * @param {number} threads
 * @param {string[]} args
 */
export async function exec(ns, hostname, filename, threads, args) {
    if (threads === 0) {
        threads = Math.floor(ns.getServerMaxRam(hostname) / ns.getScriptRam(filename));
    }

    ns.print(`[scp-exec] Executing ${filename} on ${hostname} with threads: ${threads}, args: ${args}`);
    await ns.exec(filename, hostname, threads, ... args);
}