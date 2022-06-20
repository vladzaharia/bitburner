import { NS } from "Netscript";

import { Faction } from "/_internal/classes/faction/_base.js";
import { FactionManager } from "/_internal/classes/faction/_manager.js";
import { BaseFocusable } from "/_internal/classes/focus/_base.js";
import { MEGACORPS } from "/_internal/constants/companies.js";
import { DEFAULT_CHECK_INTERVAL } from "/_internal/constants/focus";
import { IMegaCorporation } from "/_internal/interfaces/company.js";
import { Companies } from "/_internal/types/companies";

/**
 * Focusable managing working for companies.
 * @class
 * @extends BaseFocusable
 */
export class CompanyFocusable extends BaseFocusable {
    /** Faction manager. */
    private _factionManager: FactionManager;

    /** Current company being worked for. */
    private _currentCompany: Companies | undefined;

    /**
     * Creates a focuser that manages working for companies.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {number} priority - Priority this focuser should run at, defaults to `<>`.
     */
    public constructor(ns: NS, priority = 150) {
        // Default sleep time is 8 hours
        super(
            "Company work",
            ns,
            priority,
            "_currentCompany",
            8 * 60 * 60 * 1000, // 8 hours
            15 * DEFAULT_CHECK_INTERVAL // 15 minutes
        );

        // Set faction manager instance
        this._factionManager = new FactionManager(ns);
    }

    /**
     * Check if there are any megacorps with unjoined factions.
     *
     * @returns {boolean} True if there are megacorps available to focus on.
     */
    public override canFocus(): boolean {
        return this._getUninvitedMegaCorps().length > 0;
    }

    /**
     * Work for a company, applying if necessary.
     *
     * @returns {boolean} Whether the focus was successful.
     */
    protected override _focus(): boolean {
        this._currentCompany = undefined;
        const megaCorps = this._getUninvitedMegaCorps();

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

            // Extract out information
            const company = sorted[0];
            const name = company.name;
            this._currentCompany = name;
            const position = company.positions[0];

            // Always try to apply for the next best position.
            this._ns.print(`[companies] Applying for ${position} at ${name}`);
            this._ns.singularity.applyToCompany(name, position);

            // Start working.
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
