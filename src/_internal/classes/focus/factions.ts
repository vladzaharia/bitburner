import { NS } from "Netscript";

import { BaseFocusable } from "/_internal/classes/focus/_base.js";
import { FACTIONS } from "/_internal/constants/factions.js";
import { IFaction } from "/_internal/interfaces/faction";
import { Augmentations } from "/_internal/types/augmentations";
import { Factions } from "/_internal/types/factions";

/**
 * Focusable managing working for factions.
 * @class
 */
export class FactionFocusable extends BaseFocusable {
    /**
     * Creates a focuser that manages faction focus.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {number} priority - Priority this focuser should run at, defaults to `5`.
     */
    public constructor(ns: NS, priority = 5) {
        super("Faction work", ns, priority);
    }

    /**
     * User can focus if there's a faction where they have some rep, and augmentations to purchase.
     * @override
     *
     * @returns {boolean} Whether the user has factions with augmentations available.
     */
    public override canFocus(): boolean {
        const factions = this._getAcceptedFactions();
        this._ns.print(
            `[factions] ${
                factions.length
            } factions available, ${factions.filter((f) =>
                this._getNeededAugmentations(f)
            )} with augmentations`
        );
        return factions.some((f) => this._getNeededAugmentations(f).length > 0);
    }

    /**
     * Work for the faction with the most augmentations available.
     *
     * @returns {boolean} Whether the focus action was successful.
     */
    protected override _focus(): boolean {
        const faction = this._getFactionToFocus();
        // TODO: Add other types of work
        const work = "Hacking";

        this._ns.print(`[factions] ${work} for ${faction}`);
        return this._ns.singularity.workForFaction(faction, work);
    }

    /**
     * Determine which is the best faction to focus on.
     *
     * @returns {string} Faction with the most augmentations available.
     */
    private _getFactionToFocus(): Factions {
        // TODO: Make this only achievable factions
        const sortedFactions = this._getAcceptedFactions().sort(
            (a, b) =>
                this._getNeededAugmentations(b).length -
                this._getNeededAugmentations(a).length
        );

        sortedFactions.forEach((f) =>
            this._ns.print(
                `[factions] ${f.name} ${
                    this._getNeededAugmentations(f).length
                }/${
                    this._ns.singularity.getAugmentationsFromFaction(f.name)
                        .length
                }`
            )
        );

        return sortedFactions[0].name;
    }

    /**
     * Return factions which have some reputation available.
     *
     * @returns {IFaction[]} All Factions which have reputation.
     */
    private _getAcceptedFactions(): IFaction[] {
        return FACTIONS.filter(
            (f) => this._ns.singularity.getFactionRep(f.name) > 0
        );
    }

    /**
     * Gets unpurchased augmentations for `faction`.
     *
     * @param {IFaction} faction - The faction to check.
     * @returns {Augmentations[]} The augmentations which aren't purchased.
     */
    private _getNeededAugmentations(faction: IFaction): Augmentations[] {
        return this._ns.singularity
            .getAugmentationsFromFaction(faction.name)
            .filter(
                (a) =>
                    !this._ns.singularity
                        .getOwnedAugmentations(true)
                        .some((aug) => aug === a)
            ) as Augmentations[];
    }
}
