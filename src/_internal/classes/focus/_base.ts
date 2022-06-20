import { NS } from "Netscript";

import { MEDIUM_PRIORITY } from "/_internal/constants/focus";
import { IFocusable } from "/_internal/interfaces/focus.js";

/**
 * Abstract class handling priority and sleep returns.
 * @abstract
 * @class
 * @implements IFocusable
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

    /** Field to pull detail from. */
    private _detailField: string | undefined;

    /**
     * Creates a new focusable action.
     * @constructor
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
        detailField?: string,
        sleepTime = 15 * 60 * 1000
    ) {
        this.name = name;
        this._ns = ns;
        this._priority = priority;
        this._detailField = detailField;
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
            // Check if we should disable focus
            if (this.shouldRunInBackground()) {
                this._ns.print(`[focus] Disabling focus for this task`);
                this._ns.singularity.setFocus(false);
            }

            return this.getFocusTime();
        } else {
            return -1;
        }
    }

    /**
     * Checks if the action should run in the background, defaults to if priority is > 50.
     *
     * @returns {boolean} True if this can run in the background, False if it needs to be in the foreground.
     */
    public shouldRunInBackground(): boolean {
        return (
            this.getPriority() > MEDIUM_PRIORITY ||
            this._ns.singularity
                .getOwnedAugmentations()
                .includes("Neuroreceptor Management Implant")
        );
    }

    /**
     * Get time needed for task, defaults to `this._sleepTime`.
     *
     * @returns {number} The time to sleep before running the manager again.
     */
    public getFocusTime(): number {
        return this._sleepTime;
    }

    /**
     * Returns value from preset field.
     *
     * @returns {string} Value of `this._detailField` if set, "" otherwise
     */
    public getDetailText(): string {
        if (this._detailField) {
            return this[this._detailField];
        } else {
            return "";
        }
    }

    /**
     * Execute focus using `ns.singularity`, must be implemented by subclass.
     * @virtual Must be overridden by implementing classes.
     *
     * @returns {boolean} Whether the focus action was successful.
     */
    protected _focus(): boolean {
        throw new Error("Must be implemented in subclasses.");
    }
}
