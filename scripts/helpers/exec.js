/** 
 * @param { import("../../lib/NetscriptDefinition").NS } ns
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