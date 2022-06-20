/**
 * Deep sleep interface.
 */
export interface IDeepSleep {
    /** Time to sleep in total. */
    sleepTime: number;

    /**
     * Function to execute to when finished sleeping.
     */
    finishFn?: () => void;
}

/**
 * Light sleep interface.
 */
export interface ILightSleep extends IDeepSleep {
    /** Interval at which to check. */
    checkInterval: number;

    /**
     * Function to execute to check.
     *
     * @returns {boolean} True to keep working, false to stop.
     */
    checkFn: () => boolean;
}

/**
 * Deep or light sleep.
 */
export type ISleep = IDeepSleep | ILightSleep;
