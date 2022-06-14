import { NS } from "Netscript";

import { BaseFocusable } from "/_internal/classes/focus/_base.js";
import { PROGRAMS } from "/_internal/constants/programs.js";
import { IProgram } from "/_internal/interfaces/program.js";

/**
 * Focusable managing the creation of new programs.
 * @class
 */
export class ProgramFocusable extends BaseFocusable {
    /**
     * Creates a focuser that manages program creation.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {number} priority - Priority this focuser should run at, defaults to `1`.
     */
    public constructor(ns: NS, priority = 1) {
        super(ns, priority, 30 * 60 * 1000);
    }

    /**
     * Returns default priority if openers can be created, `Infinity` otherwise.
     *
     * @returns {number} The priority of the action.
     */
    public override getPriority(): number {
        return PROGRAMS.some((p) => this._canCreate(p) && !!p.isOpener)
            ? super.getPriority()
            : Infinity;
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
     * - Program's hacking level is below our current level
     * - If port opener, can't currently be bought on the darkweb
     *
     * @returns {boolean} Whether the program exists on disk.
     */
    private _canCreate(program: IProgram): boolean {
        return (
            !this._ns.fileExists(program.name) &&
            program.create.skill < this._ns.getHackingLevel() &&
            !(
                program.isOpener &&
                program.darkweb.cost < this._ns.getServerMoneyAvailable("home")
            )
        );
    }
}
