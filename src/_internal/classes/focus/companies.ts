import { NS } from "Netscript";

import { Faction } from "/_internal/classes/faction/_base.js";
import { FactionManager } from "/_internal/classes/faction/_manager.js";
import { BaseFocusable } from "/_internal/classes/focus/_base.js";
import { MEGACORPS } from "/_internal/constants/companies.js";
import { IMegaCorporation } from "/_internal/interfaces/company.js";

/**
 * Focusable managing working for companies.
 * @class
 * @extends BaseFocusable
 */
export class CompanyFocusable extends BaseFocusable {
    /** Faction manager. */
    private _factionManager: FactionManager;

    /**
     * Creates a focuser that manages working for companies.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {number} priority - Priority this focuser should run at, defaults to `<>`.
     */
    public constructor(ns: NS, priority = 250) {
        // Default sleep time is 8 hours
        super("Company work", ns, priority, 8 * 60 * 60 * 1000);

        // Set faction manager instance
        this._factionManager = new FactionManager(ns);
    }

    /**
     * Check if there are any megacorps with unjoined factions.
     * @returns
     */
    public override canFocus(): boolean {
        return this._getUninvitedMegaCorps().length > 0;
    }

    protected override _focus(): boolean {
        const megaCorps = this._getUninvitedMegaCorps();
        const player = this._ns.getPlayer();

        if (megaCorps.length > 0) {
            // Sort by needed augmentations, descending
            const sorted = megaCorps.sort((m1, m2) => {
                const f1: Faction = new Faction(
                    this._ns,
                    m1.name === "Fulcrum Technologies"
                        ? "Fulcrum Secret Technologies"
                        : m1.name
                );
                const f2: Faction = new Faction(
                    this._ns,
                    m2.name === "Fulcrum Technologies"
                        ? "Fulcrum Secret Technologies"
                        : m2.name
                );

                return (
                    f2.getNeededAugmentations().length -
                    f1.getNeededAugmentations().length
                );
            });

            this._ns.print(
                `[companies] ${sorted.length} MegaCorporations with unjoined factions`
            );

            const company = sorted[0];
            const name = company.name;
            const position = company.positions[0];

            if (!Object.values(player.jobs).includes(name)) {
                this._ns.print(
                    `[companies] Applying for ${position} at ${name}`
                );
                this._ns.singularity.applyToCompany(name, position);
            }

            this._ns.print(`[companies] Working ${position} at ${name}`);
            return this._ns.singularity.workForCompany(name);
        }

        return false;
    }
    /**
     * Get megacorps which do not yet have a faction invite.
     *
     * @returns {IMegaCorporation[]} All megacorps which do not have a faction invite.
     */
    private _getUninvitedMegaCorps(): IMegaCorporation[] {
        return MEGACORPS.filter((c) =>
            this._factionManager
                .getUnjoinedFactions()
                .filter(
                    (f) =>
                        (f.getName() === "Fulcrum Secret Technologies"
                            ? "Fulcrum Technologies"
                            : f.getName()) === c.name
                )
        );
    }
}
