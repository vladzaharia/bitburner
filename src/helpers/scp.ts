import { NS } from "Netscript";

/**
 * Copy `filename`, along with helper files, to `hostname`.
 * @category Executable
 *
 * @example <caption>Copy `filename` to `host`.</caption>
 * ```shell
 * run /helpers/scp.js [host] [filename]
 * ```
 *
 * @example <caption>Copy multiple files to `host`.</caption>
 * ```shell
 * run /helpers/hack.js [host] [file0] ... [filen]
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    if (ns.args.length < 2) {
        throw "Function must be called with hostname and filename";
    }

    await scp(ns, ns.args[0] as string, ns.args.slice(1) as string[]);
}

/**
 * Copy `filenames`, along with helper scripts in `/helpers` to `hostname`.
 * @category Importable
 * @async
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The host to copy files to.
 * @param {string[]} filenames - The files to copy, in addition to all files in `/helpers`.
 * @returns {Promise<boolean>} Whether the files were copied over successfully.
 */
export async function scp(
    ns: NS,
    hostname: string,
    filenames: string[]
): Promise<boolean> {
    const additionalFiles = ns
        .ls("home")
        .filter((file) => file.startsWith("/helpers"));

    ns.print(`[scp] Copying helper scripts and ${filenames} to ${hostname}`);
    return await ns.scp([...filenames, ...additionalFiles], hostname);
}
