import { NS } from "Netscript";

import { BaseFocusable } from "/_internal/classes/focus/_base.js";
import { PROGRAMS } from "/_internal/constants/programs.js";
import { IProgram } from "/_internal/interfaces/program.js";

/**
 *
 * @class
 */
export class ProgramFocusable extends BaseFocusable {
    /** Whether non-opener scripts should be created, defaults to `false`. */
    private _includeNonOpeners: boolean;

    /**
     * Creates a focuser that manages program creation.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {boolean} includeNonOpeners - Whether non-opener scripts should be created, defaults to `false`.
     * @param {number} priority - Priority this focuser should run at, defaults to `1`.
     */
    public constructor(ns: NS, includeNonOpeners = false, priority = 1) {
        super(ns, priority, 30 * 60 * 1000);
        this._includeNonOpeners = includeNonOpeners;
    }

    /**
     * Checks whether any program is creatable.
     *
     * @returns {boolean} Whether we can currently create any program.
     */
    public canFocus(): boolean {
        return PROGRAMS.some((p) => this._canCreate(p));
    }

    /**
     * Create first available program.
     *
     * @returns {number} Time to sleep if a program was executed, false otherwise.
     */
    protected override _focus(): boolean {
        for (const program of PROGRAMS) {
            if (this._canCreate(program)) {
                return this._ns.singularity.createProgram(program.name);
            }
        }

        return false;
    }

    /**
     * Check if a program can be created. Returns `true` if:
     *
     * - Program doesn't exist on disk
     * - Program is a port opener
     * - Program's hacking level is below our current level
     * - Program can't currently be bought on the darkweb
     *
     * @returns {boolean} Whether the program exists on disk.
     */
    private _canCreate(program: IProgram): boolean {
        return (
            !this._ns.fileExists(program.name) &&
            (program.isOpener || this._includeNonOpeners) &&
            program.hack < this._ns.getHackingLevel() &&
            program.cost > this._ns.getServerMoneyAvailable("home")
        );
    }
}
