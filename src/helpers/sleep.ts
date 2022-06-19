import { NS } from "Netscript";

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
    if (print) {
        ns.print(
            `[sleep] Sleeping for ${getHumanDuration(
                duration
            )} at ${new Date().toTimeString()}`
        );
    }

    return await ns.sleep(duration);
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
