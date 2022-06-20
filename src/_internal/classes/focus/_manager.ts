import { NS } from "Netscript";

import { IFocusable } from "/_internal/interfaces/focus.js";

/**
 * Manages `IFocusable` objects, executing based on priority.
 * @class
 * @implements IFocusable
 */
export class FocusManager implements IFocusable {
    /** The name of the focusable. */
    public name = "Manager";

    /** The Netscript object. */
    private _ns: NS;

    /** All registered focus actions. */
    private _registered: IFocusable[] = [];

    /** Currently executing focusable. */
    private _currentFocusable: IFocusable | undefined;

    /** Sleep time left. */
    private _sleepTime: number | undefined;

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
                this._ns.toast(
                    `Focusing on ${
                        focusable.name
                    } ${focusable.getDetailText()}`,
                    "info"
                );
                this._currentFocusable = focusable;
                this._sleepTime = focusable.focus();
                return this._sleepTime;
            }
        }

        return -1;
    }

    /**
     * Check whether the player is focusing on something.
     *
     * @returns {boolean} Whether the player is focusing on something.
     */
    public isWorking(): boolean {
        return this._ns.getPlayer().isWorking;
    }

    /**
     * Clear current focus.
     */
    public clearFocus(): void {
        this._ns.singularity.stopAction();
        this._sleepTime = undefined;
        this._currentFocusable = undefined;
    }

    /**
     * Gets the focus time left, can be decremented using `decrementFocusTime`.
     *
     * @returns {number} Time left to focus.
     */
    public getFocusTime(): number {
        return this._sleepTime || 0;
    }

    /**
     * Gets the check interval from the focusable, defaults to `DEFAULT_CHECK_INTERVAL`
     *
     * @returns {number} Amount of time to wait in between soft-sleep checks.
     */
    public getCheckInterval(): number {
        return this._currentFocusable?.getCheckInterval() || 60 * 1000;
    }

    /**
     * Decrement focus time and return the new value.
     *
     * @returns {number} New focus time after decrementing.
     */
    public decrementFocusTime(decrement = this.getCheckInterval()): number {
        this._sleepTime = this._sleepTime ? this._sleepTime - decrement : 0;
        return this._sleepTime;
    }

    /**
     * Check if current focusable needs to continue running.
     *
     * @returns {boolean} True if it should continue, false otherwise.
     */
    public shouldContinueRunning(): boolean {
        return this._currentFocusable?.shouldContinueRunning() || false;
    }

    /**
     * Not applicable to the FocusManager.
     */
    getDetailText(): string {
        throw new Error("Method not implemented.");
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
}
