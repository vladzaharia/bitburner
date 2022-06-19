import { NS } from "Netscript";

import { BaseFocusable } from "/_internal/classes/focus/_base.js";

/**
 * Focusable managing <>.
 * @class
 * @extends BaseFocusable
 */
export class TemplateFocusable extends BaseFocusable {
    /**
     * Creates a focuser that manages <>.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {number} priority - Priority this focuser should run at, defaults to `<>`.
     */
    public constructor(ns: NS, priority = Infinity) {
        super("<>", ns, priority);
    }

    public override getPriority(): number {
        throw new Error("Method not implemented.");
    }

    public override canFocus(): boolean {
        throw new Error("Method not implemented.");
    }

    protected override _focus(): boolean {
        throw new Error("Method not implemented.");
    }

    public override shouldRunInBackground(): boolean {
        throw new Error("Method not implemented.");
    }

    public override getFocusTime(): number {
        throw new Error("Method not implemented.");
    }
}
