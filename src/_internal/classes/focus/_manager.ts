import { NS } from "Netscript";

import { IFocusable } from "/_internal/interfaces/focus.js";

/**
 * Manages `IFocusable` objects, executing based on priority.
 * @class
 */
export class FocusManager implements IFocusable {
    /** The name of the focusable. */
    public name = "Manager";

    /** The Netscript object. */
    private _ns: NS;

    /** All registered focus actions. */
    private _registered: IFocusable[] = [];

    /**
     * Creates a new manager capable of handling multiple `IFocusable`s.
     * @constructor
     *
     * @param {NS} ns - The Netscript object
     */
    public constructor(ns: NS) {
        this._ns = ns;
    }

    /**
     * Registers a new `IFocusable` with this manager.
     */
    public register(focusable: IFocusable) {
        this._registered.push(focusable);
    }

    /**
     * Returns whether any registered focus actions are executable.
     *
     * @returns {boolean} True if any registered actions are available, false otherwise.
     */
    public canFocus(): boolean {
        return this._registered.some((f) => f.canFocus());
    }

    /**
     * Executes `focus()` on highest priority item which `canFocus()`.
     *
     * @returns {number} Whether the focus action was successful.
     */
    public focus(): number {
        // Sort focusables by priority.
        const sorted = this._registered.sort(
            (a, b) => a.getPriority() - b.getPriority()
        );

        this._ns.print(`[manager] ${sorted.length} total focusables`);
        sorted.forEach((s) =>
            this._ns.print(
                `[manager] ${s.name}: ${s.getPriority()} / ${s.canFocus()}`
            )
        );

        for (const focusable of sorted) {
            if (focusable.canFocus()) {
                this._ns.toast(`Focusing on ${focusable.name}...`);
                return focusable.focus();
            }
        }

        return -1;
    }

    /**
     * Not applicable to the FocusManager.
     */
    getPriority(): number {
        throw new Error("Method not implemented.");
    }

    /**
     * Not applicable to the FocusManager.
     */
    shouldRunInBackground(): boolean {
        throw new Error("Method not implemented.");
    }

    /**
     * Not applicable to the FocusManager.
     */
    getFocusTime(): number {
        throw new Error("Method not implemented.");
    }
}
