import { NS } from "Netscript";

/**
 * Get player object.
 * @category Executable
 * @export
 *
 * @example <caption>Kill all scripts, everywhere.</caption>
 * ```shell
 * run /tools/get-player.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.clearLog();
    ns.print(JSON.stringify(ns.getPlayer(), undefined, 4));
}
