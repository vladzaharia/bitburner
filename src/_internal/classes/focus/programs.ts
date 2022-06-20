import { NS } from "Netscript";

import { BaseFocusable } from "/_internal/classes/focus/_base.js";
import { LOW_PRIORITY, TOP_PRIORITY } from "/_internal/constants/focus.js";
import { PROGRAMS } from "/_internal/constants/programs.js";
import { IProgram } from "/_internal/interfaces/program.js";

/**
 * Focusable managing the creation of new programs.
 * @class
 * @extends BaseFocusable
 */
export class ProgramFocusable extends BaseFocusable {
    /** Internal focus store. */
    private _focusTime: number | undefined;

    /**
     * Creates a focuser that manages program creation.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {number} priority - Priority this focuser should run at, defaults to `1`.
     */
    public constructor(ns: NS, priority = LOW_PRIORITY) {
        super("Program creation", ns, priority, 30 * 60 * 1000);
    }

    /**
     * Returns default priority if openers can be created, `Infinity` otherwise.
     *
     * @returns {number} The priority of the action.
     */
    public override getPriority(): number {
        return PROGRAMS.some((p) => this._canCreate(p) && !!p.isOpener)
            ? TOP_PRIORITY
            : super.getPriority();
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
        this._ns.print(
            `[programs] ${
                PROGRAMS.filter((p) => this._canCreate(p) && !!p.isOpener)
                    .length
            } openers and ${
                PROGRAMS.filter((p) => this._canCreate(p) && !p.isOpener).length
            } other programs available to create: ${PROGRAMS.filter((p) =>
                this._canCreate(p)
            )}`
        );

        for (const program of PROGRAMS) {
            if (this._canCreate(program)) {
                this._ns.print(`[programs] Creating ${program.name}`);
                this._focusTime = program.create.time;

                return this._ns.singularity.createProgram(program.name);
            }
        }

        return false;
    }

    /**
     * Get time to focus, if set by program.
     *
     * @returns {number} Time to focus, set by program or default.
     */
    public override getFocusTime(): number {
        return this._focusTime || super.getFocusTime();
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
