/**
 * FocusManager entry, including priority.
 * @interface
 */
interface FocusableEntry {
    focusable: IFocusable;
    priority: number;
}

/**
 * Manages `IFocusable` objects, executing based on priority.
 * @class
 */
export class FocusManager implements IFocusable {
    /** All registered focus actions. */
    private _registered: FocusableEntry[] = [];

    /**
     * Not applicable to the FocusManager.
     */
    getPriority(): number {
        throw new Error("Method not implemented.");
    }

    /**
     * Registers a new `IFocusable` with this manager.
     */
    public register(focusable: IFocusable) {
        this._registered.push({ focusable, priority: focusable.getPriority() });

        // Re-sort all registered entries based on priority
        this._registered.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Returns whether any registered focus actions are executable.
     *
     * @returns {boolean} True if any registered actions are available, false otherwise.
     */
    public canFocus(): boolean {
        return this._registered.some((f) => f.focusable.canFocus());
    }

    /**
     * Executes `focus()` on highest priority item which `canFocus()`.
     *
     * @returns {number} Whether the focus action was successful.
     */
    public focus(): number {
        for (const focusEntry of this._registered) {
            if (focusEntry.focusable.canFocus()) {
                return focusEntry.focusable.focus();
            }
        }

        return -1;
    }
}
