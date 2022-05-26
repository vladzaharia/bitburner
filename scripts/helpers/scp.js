/** 
 * @param { import("../../lib/NetscriptDefinition").NS } ns
 * @param {string} hostname
 * @param {string} filename
 */
 export async function scp(ns, hostname, filename) {
    const additionalFiles = ns.ls("home").filter((file) => file.startsWith("/helpers") || file.startsWith("/node"));

    ns.print(`[scp-exec] Copying helper scripts and ${filename} to ${hostname}`);
    await ns.scp([filename, ... additionalFiles], hostname);
}