import { NS } from "Netscript";

/**
 * Execute all node/* scripts on "home"
 * @category Executable
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    const files = ns.ls("home").filter((file) => file.startsWith("/node"));

    for (const filename of files) {
        ns.kill(filename, "home");
        ns.exec(filename, "home");

        await ns.sleep(5 * 1000);
    }
}
