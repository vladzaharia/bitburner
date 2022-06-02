import { NS } from "Netscript";

/** 
 * Execute a given file on a given host.
 * 
 * **Note:** Script must exist on host. Use `/tools/scp-exec.js` to scp and execute.
 * 
 * @example <caption>Execute a script on a host.</caption>
 * run /helpers/exec.js [host] [path-to-script]
 * 
 * @example <caption>Execute a script on a host with given threads.</caption>
 * run /helpers/exec.js [host] [path-to-script] [threads]
 * 
 * @example <caption>Execute a script on a host with given threads and args.</caption>
 * run /helpers/exec.js [host] [path-to-script] [threads] [arg0] ... [argn]
 * 
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length < 2) {
        throw "Function must be called with hostname and filename, threads and args optional";
    }

    Exec.exec(ns, ns.args[0] as string, ns.args[1] as string, ns.args[2] as number, ns.args.splice(3) as string[]);
}

export module Exec {
    /** 
     * Execute `filename` on `hostname` with given `threads` and `args`
     * 
     * **Note:** Script must exist on host. Use `/tools/scp-exec.js` to scp and execute.
     * 
     * @param {NS} ns - The Netscript object.
     * @param {string} hostname - The hostname to execute script on.
     * @param {string} filename - The absolute path to the script.
     * @param {number} threads - Optional number of threads to execute script with, defaults to 1.
     * @param {string[]} args - Optional args to pass to the script.
     * @returns {boolean} Whether the script was successfully run.
     */
    export function exec(ns: NS, hostname: string, filename: string, threads: number = 1, args: string[] = []): boolean {
        if (threads === 0) {
            threads = Math.floor(ns.getServerMaxRam(hostname) / ns.getScriptRam(filename));
        }

        ns.print(`[exec] Executing ${filename} on ${hostname} with threads: ${threads}, args: ${args}`);
        return ns.exec(filename, hostname, threads, ...args) > 0;
    }
}
