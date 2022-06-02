import { NS } from "Netscript";
import {
    getControlServers,
    getRootedHosts,
    getPersonalServers,
    getWorkerServers,
    getHosts,
} from "/helpers/discover.js";
import { exec } from "/helpers/exec.js";
import { scp } from "/helpers/scp.js";

/**
 * Copy and execute a given file on a given host.
 * @category Executable
 *
 * @example <caption>Copy and execute /helpers/hack-weaken-grow.js on all personal and rooted servers.</caption>
 * ```shell
 * run /tools/scp-exec.js
 * ```
 *
 * @example <caption>Copy and execute script on given host.</caption>
 * ```shell
 * run /tools/scp-exec.js [host] [path-to-script]
 * ```
 *
 * @example <caption>Copy and execute script on worker servers.</caption>
 * ```shell
 * run /tools/scp-exec.js worker [path-to-script]
 * ```
 *
 * @example <caption>Copy and execute script on host with given threads and args.</caption>
 * ```shell
 * run /tools/scp-exec.js [host] [path-to-script] [threads] [arg0] ... [argn]
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    const hackableHosts = getRootedHosts(ns);
    let hostnames = [...getPersonalServers(ns), ...hackableHosts];
    let threads = 0;
    let filename = "/helpers/hack-weaken-grow.js";
    let args = hackableHosts;

    ns.print(
        `[scp-exec] Found ${hostnames.length} personal servers: ${hostnames}`
    );

    // Filter based on arg[0] if provided
    if (ns.args.length > 0) {
        const hostnameArg = ns.args[0] as string;

        if (hostnameArg === "control") {
            hostnames = getControlServers(ns);
            ns.print(`[scp-exec] Filtered to control servers: ${hostnames}`);
        } else if (hostnameArg === "worker") {
            hostnames = getWorkerServers(ns);
            ns.print(`[scp-exec] Filtered to worker servers: ${hostnames}`);
        } else if (hostnameArg === "rooted") {
            hostnames = getRootedHosts(ns);
            ns.print(`[scp-exec] Filtered to worker servers: ${hostnames}`);
        } else {
            hostnames = getHosts(ns, 10).filter(
                (hn) => hn.indexOf(hostnameArg) !== -1
            );
            ns.print(
                `[scp-exec] Filtered based on ${hostnameArg}: ${hostnames}`
            );
        }

        // Execute alternative script
        if (ns.args.length > 1) {
            filename = ns.args[1] as string;
            args = [];
            ns.print(`[scp-exec] Executing alternative script: ${filename}`);

            // Change number of threads
            if (ns.args.length > 2) {
                threads = ns.args[2] as number;
                ns.print(
                    `[scp-exec] Executing alternative thread count: ${threads}`
                );

                // Send rest of arguments to the script
                if (ns.args.length > 3) {
                    args = ns.args.slice(3) as string[];
                }
            }
        }
    }

    for (let i = 0; i < hostnames.length; i++) {
        const hostname = hostnames[i];
        let fnArgs = args.slice();

        if (ns.args.indexOf("targets") !== -1 && ns.args.length < 4) {
            fnArgs = fnArgs.filter(
                (hn, j) => j % hostnames.length === i % hostnames.length
            );
        }

        // Kill existing scripts
        ns.print(
            `[scp-exec] Killing existing script instance(s) on ${hostname}`
        );
        const runningProc = ns
            .ps(hostname)
            .filter((proc) => proc.filename === filename);
        runningProc.forEach((proc) =>
            ns.kill(proc.filename, hostname, ...proc.args)
        );

        // Copy and execute
        await scp(ns, hostname, [filename]);
        exec(ns, hostname, filename, threads, fnArgs);

        await ns.sleep(1000);
    }
}
