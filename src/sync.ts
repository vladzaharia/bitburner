import { NS } from "Netscript";

// Base URLs
const BASE_URL = "https://bb.vlad.gg/api";
const MANIFEST_PATH = `/res/manifest.json`;

/**
 * Synchronizes files with hosted version. Base URL can be passed in as `args[0]`.
 * @category Executable
 * @export
 *
 * @example <caption>Synchronize with default server</caption>
 * run /sync.js
 *
 * @example <caption>Synchronize with custom server</caption>
 * run /sync.js http://1.2.3.4:8123
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.clearLog();
    ns.disableLog("ALL");

    let serverUrl = BASE_URL;

    if (ns.args.length > 1) {
        throw `Sync can only be called with a single base URL`;
    } else if (ns.args.length === 1) {
        const argUrl = ns.args[0] as string;
        const urlRegex =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})?\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/;

        // Check URL is valid
        if (!argUrl.match(urlRegex) || argUrl.endsWith("/")) {
            throw `Base URL must be of the form https?://example.com(:1234)?(/api)? with no trailing slash.`;
        }

        serverUrl = argUrl;
    }

    const fileList = await getFileList(ns, serverUrl);

    ns.print(`[sync] Retrieved file list ${fileList}`);

    // Download all files from manifest
    for (const file of fileList) {
        const downloaded = await getFile(ns, serverUrl, `/${file}`);

        if (downloaded === null) {
            throw `Download failed!`;
        }
    }

    // Remove unknown scripts
    const unknownScripts = ns
        .ls("home")
        .filter(
            (f) =>
                f.endsWith(".js") &&
                !fileList.includes(f.startsWith("/") ? f.slice(1) : f)
        );

    ns.print(`[sync] Removing ${unknownScripts.length} unknown scripts`);
    unknownScripts.forEach((f) => ns.rm(f, "home"));

    ns.print(
        `[sync] Finished syncing ${fileList.length} files from ${serverUrl}`
    );
}

/**
 * Get file list from `serverUrl` by downloading the manifest file.
 * @async
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} serverUrl - URL of the server (hosted or local) to get file list from.
 * @returns {Promise<string[]>} Final list of files to download from the server, as absolute paths with `~` as `/`.
 */
async function getFileList(ns: NS, serverUrl: string): Promise<string[]> {
    ns.print(`[sync] Downloading manifest from ${serverUrl}`);

    const manifestContent = await getFile(
        ns,
        serverUrl,
        MANIFEST_PATH,
        MANIFEST_PATH.replace("json", "txt")
    );

    if (manifestContent) {
        // Return parsed manifest JSON
        return JSON.parse(manifestContent) as string[];
    }

    // Couldn't get manifest, return empty filelist
    return [];
}

/**
 * Get file list from `serverUrl` by downloading the manifest file.
 * @async
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} serverUrl - URL of the server (hosted or local) to get file from.
 * @param {string} filename - Absolute path of file to download.
 * @param {string} savedFilename - Absolute path of file on disk, defaults to `filename`.
 * @returns {Promise<string | null>} The file contents if successfully downloaded, otherwise null;
 */
async function getFile(
    ns: NS,
    serverUrl: string,
    filename: string,
    savedFilename: string = filename
): Promise<string | null> {
    const slashRegex = new RegExp(/\//, "g");
    const slashMatch = savedFilename.match(slashRegex);

    // Remove leading / if in main directory
    if (slashMatch && slashMatch.length === 1) {
        savedFilename = savedFilename.slice(1);
    }

    ns.print(`[sync] Downloading ${serverUrl}${filename} -> ${savedFilename}`);

    const downloaded = await ns.wget(
        `${serverUrl}${filename}`,
        `${savedFilename}`,
        "home"
    );
    if (downloaded) {
        return ns.read(savedFilename);
    } else {
        return null;
    }
}
