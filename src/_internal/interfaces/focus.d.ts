export interface IFocusable {
    /** The name of the focusable. */
    name: string;

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

    /**
     * Determines whether this action should run in the background or be focused on.
     *
     * @returns {boolean} True if this can run in the background, False if it needs to be in the foreground.
     */
    shouldRunInBackground(): boolean;

    /**
     * Gets the focus time to wait after running the action.
     *
     * @returns {number} The time to sleep before running the manager again.
     */
    getFocusTime(): number;

    /**
     * Gets the check time while soft-sleeping.
     *
     * @returns {number} How often to check if the task is complete.
     */
    getCheckInterval(): number;

    /**
     * Gets the detail text used for text output.
     *
     * @returns {string} Text to use for logs and toasts for this focusable.
     */
    getDetailText(): string;
}
