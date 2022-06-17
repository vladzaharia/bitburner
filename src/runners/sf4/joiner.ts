import { NS } from "Netscript";

import { Faction } from "/_internal/classes/faction/_base.js";
import { FactionManager } from "/_internal/classes/faction/_manager.js";
import { sleep } from "/helpers/sleep.js";

/**
 * Automatically accept faction invitations.
 *
 * **Note:** Requires access to `singularity`, either on BN4 or SF4.
 *
 * @category Executable
 * @export
 *
 * @example
 * ```shell
 * run /runner/sf4/joiner.js
 * ```
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {
    ns.disableLog("ALL");

    const factionManager = new FactionManager(ns);

    while (true) {
        ns.clearLog();

        if (!ns.fileExists("/flags/SKIP_JOINER.js", "home")) {
            // Check if we have any faction invites
            const invites = ns.singularity.checkFactionInvitations();

            ns.print(`[joiner] ${invites.length} invitations outstanding`);

            // Check for outstanding invites
            for (const invite of invites) {
                const faction = new Faction(ns, invite);

                if (faction.shouldJoin()) {
                    ns.print(`[joiner] Joining ${invite}`);
                    ns.singularity.joinFaction(invite);
                } else {
                    ns.print(
                        `[joiner] Skipping joining ${invite} as rivals are better`
                    );
                }
            }

            // Check if we can join any factions by moving to a city
            for (const faction of factionManager.getJoinableFactions()) {
                const location = faction.getLocation();

                // If we can join and have a location, go to it
                if (location) {
                    ns.print(
                        `[joiner] Visiting ${location} to join ${faction.getName()}`
                    );
                    const moved = ns.singularity.travelToCity(location);

                    if (moved) {
                        await sleep(ns, 10 * 1000);
                    } else {
                        ns.print(
                            `[joiner] Failed to move user to ${location}!`
                        );
                    }
                }
            }

            await sleep(ns, 60 * 1000);
        } else {
            ns.print(`[home] Found file /flags/SKIP_JOINER.js`);
            await sleep(ns, 60 * 1000);
        }
    }
}
