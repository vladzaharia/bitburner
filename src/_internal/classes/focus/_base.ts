import { NS } from "Netscript";

import { IFocusable } from "/_internal/interfaces/focus.js";

/**
 * Abstract class handling priority and sleep returns.
 * @abstract
 * @class
 */
export abstract class BaseFocusable implements IFocusable {
    /** The name of the focusable. */
    public name: string;

    /** The Netscript object. */
    protected _ns: NS;

    /** Priority of this focusable. */
    private _priority: number;

    /** Time to sleep after a successful focus event. */
    private _sleepTime: number = 15 * 60 * 1000;

    /**
     * Constructs a new focusable action.
     *
     * @param {string} name - The name of this focusable.
     * @param {NS} ns - The Netscript object.
     * @param {number} priority - Priority this action should run at, lower first.
     * @param {number} sleepTime - Time to sleep after a successful focus event, defaults to 15 minutes.
     */
    public constructor(
        name: string,
        ns: NS,
        priority: number,
        sleepTime = 15 * 60 * 1000
    ) {
        this.name = name;
        this._ns = ns;
        this._priority = priority;
        this._sleepTime = sleepTime;
    }

    public getPriority(): number {
        return this._priority;
    }

    /**
     * @virtual Must be overridden by implementing classes.
     */
    public canFocus(): boolean {
        return false;
    }

    /**
     * Executes a focus action, returning a predefined sleep time.
     *
     * @returns {number} `_sleepTime` if successful, -1 otherwise.
     */
    public focus(): number {
        if (this._focus()) {
            // Don't focus if low priority
            // TODO: Figure out which augmentation nullifies this requirement
            if (this.getPriority() > 50) {
                this._ns.print(
                    `[focus] Disabling focus as priority ${this.getPriority()} is > 50`
                );
                this._ns.singularity.setFocus(false);
            }
            return this._sleepTime;
        } else {
            return -1;
        }
    }

    /**
     * Execute focus using `ns.singularity`
     *
     * @returns {boolean} Whether the focus action was successful.
     */
    protected _focus(): boolean {
        throw new Error("Must be implemented in subclasses.");
    }
}
