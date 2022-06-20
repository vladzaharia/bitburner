import { NS } from "Netscript";

import { Scripts } from "/_internal/types/scripts.js";

/** Path to hack script to execute on hosts. */
export class Script {
    /** The Netscript object. */
    private _ns: NS;

    /** The name of the script */
    private _filename: Scripts;

    /**
     * Create new script instance.
     *
     * @param {NS} ns - The Netscript object.
     * @param {Scripts} name - The name of the script.
     */
    public constructor(ns: NS, name: Scripts) {
        this._ns = ns;
        this._filename = name;
    }

    /**
     * Execute the script, copying it if necessary.
     * @async
     *
     * @param {string} hostname - The hostname on which to execute the script.
     * @returns {boolean} Whether the script was successfully executed.
     */
    public async execute(
        hostname: string,
        threads: number,
        args: string[]
    ): Promise<boolean> {
        const filename = this._filename;

        // SCP if not executing on home.
        if (hostname !== "home") {
            this._ns.print(`[script] Copying ${filename} to ${hostname}`);
            await this._ns.scp(filename, hostname);
        }

        this._ns.print(
            `[script] Executing ${filename} on ${hostname}, threads ${threads}, args ${args}`
        );
        return this._ns.exec(filename, hostname, threads, ...args) !== -1;
    }
}
