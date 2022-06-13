interface IFocusable {
    /**
     * Gets the current priority of the focusable action.
     *
     * @returns {number} Current priority, with 0 being the highest.
     */
    getPriority(): number;

    /**
     * Checks whether we can focus on something.
     *
     * @returns {boolean} Whether this action is available.
     */
    canFocus(): boolean;

    /**
     * Execute focus using `ns.singularity`. If another item is focused on, will switch focus.
     *
     * @returns {number} The time to sleep if successfully completed, `-1` otherwise.
     */
    focus(): number;
}
