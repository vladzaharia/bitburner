/**
 * Types of sleep.
 * - "light": Sleeps at interval, checks for completion at regular intervals.
 * - "dark": Sleeps for total amount, without checking for completion.
 */
export type SleepType = "light" | "deep";
