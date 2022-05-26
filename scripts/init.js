/** @param { import("../lib/NetscriptDefinition").NS } ns */
export async function main(ns) {
    ns.disableLog("ALL");

    const files = ns.ls("home").filter((file) => file.startsWith("/node"));

    for (let i = 0; i < files.length; i++) {
        const filename = files[i];

        ns.kill(filename, "home");
        ns.exec(filename, "home");
        await ns.sleep(5 * 1000);
    }
}