import { NS } from "Netscript";

import { ILightSleep, ISleep } from "/_internal/interfaces/sleep.js";
import { SleepType } from "/_internal/types/sleep.js";

export class Sleep {
    /** The Netscript object. */
    private _ns: NS;

    /** The type of sleep. */
    private _sleepType: SleepType;

    /** Sleep parameters. */
    private _sleepParams: ISleep;

    /** Current sleep time. */
    private _sleepTime = 0;

    /**
     * Constructs a new sleeper.
     *
     * @param {NS} ns - The Netscript object.
     * @param {ISleep} sleepParams - Parameters for sleeping.
     * @param {SleepType} sleepType - The type of sleep, defaults to "deep".
     */
    public constructor(
        ns: NS,
        sleepParams: ISleep,
        sleepType: SleepType = "deep"
    ) {
        this._ns = ns;
        this._sleepType = sleepType;
        this._sleepParams = sleepParams;
    }

    /**
     * Sleep according to `sleepParams`.
     *
     * @param {boolean} print - Whether to print debug log.
     */
    public async sleep(print = true) {
        this._sleepTime = this._sleepParams.sleepTime;

        if (this._sleepType === "deep") {
            await this._deepSleep(print);
        } else {
            await this._lightSleep(print);
        }
    }

    /**
     * Deep sleep according to `sleepParams`.
     *
     * @param {boolean} print - Whether to print debug log.
     */
    private async _deepSleep(print = true) {
        if (print) {
            this._ns.print(
                `[sleep] Sleeping for ${getHumanDuration(
                    this._sleepParams.sleepTime
                )} at ${new Date().toTimeString()}`
            );
        }

        return await this._ns.sleep(this._sleepParams.sleepTime);
    }

    /**
     * Light sleep according to `sleepParams`.
     *
     * @param {boolean} print - Whether to print debug log.
     */
    private async _lightSleep(print = true) {
        if (this._isLightSleep(this._sleepParams)) {
            while (this._sleepTime > 0) {
                if (!this._sleepParams.checkFn()) {
                    if (print) {
                        this._ns.print(`[focus] No longer sleeping!`);
                    }
                } else {
                    if (print) {
                        this._ns.print(
                            `[focus] Sleeping for ${getHumanDuration(
                                this._sleepParams.checkInterval
                            )}!`
                        );
                    }
                    await this._ns.sleep(this._sleepParams.checkInterval);
                }
            }
        } else {
            throw "Wrong parameter type!";
        }
    }

    /**
     * Check if `a` is a light script interface.
     *
     * @param {any} a - The `ISleep` to check.
     * @returns {a is ILightsleep} True if `a` is `ILightSleep`, false otherwise.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _isLightSleep(a: any): a is ILightSleep {
        return a.checkInterval && a.checkFn;
    }
}

/**
 * Sleeps for `duration` and prints a user-readable string.
 * @category Importable
 * @export
 * @async
 *
 * @param {NS} ns - The Netscript object.
 * @param {number} hostname - Duration to sleep for, in ms.
 * @returns {Promise<true>} Always returns true
 */
export async function sleep(
    ns: NS,
    duration: number,
    print = true
): Promise<true> {
    const script = new Sleep(ns, { sleepTime: duration });
    await script.sleep(print);
    return true;
}

/**
 * Converts a duration in ms to a human readable string like "1 hour".
 *
 * @param {number} duration - Duration to convert, in ms.
 */
export function getHumanDuration(duration: number): string {
    if (duration > 24 * 60 * 60 * 1000) {
        return `${duration / (24 * 60 * 60 * 1000)} day(s)`;
    } else if (duration > 60 * 60 * 1000) {
        return `${duration / (60 * 60 * 1000)}hr`;
    } else if (duration > 60 * 1000) {
        return `${duration / (60 * 1000)}min`;
    } else if (duration > 1000) {
        return `${duration / 1000}s`;
    } else {
        return `${duration}ms`;
    }
}
