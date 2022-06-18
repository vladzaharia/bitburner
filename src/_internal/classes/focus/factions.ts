import { NS } from "Netscript";

import { BaseFocusable } from "/_internal/classes/focus/_base.js";
import {
    AUGMENTATIONS,
    AUGMENTATIONS_OBJ,
} from "/_internal/constants/augmentations.js";
import { FACTIONS, FACTIONS_OBJ } from "/_internal/constants/factions.js";
import { IAugmentation } from "/_internal/interfaces/augmentation.js";
import { IFaction } from "/_internal/interfaces/faction.js";
import { Augmentations } from "/_internal/types/augmentations.js";
import { Factions } from "/_internal/types/factions.js";

/** Augmentations which should be purchased first. */
const PRIORITY_AUGMENTATIONS: IAugmentation[] = AUGMENTATIONS.filter(
    (a) =>
        a.benefits.programs ||
        a.benefits.startingMoney ||
        a.benefits.endgame ||
        a.benefits.focus
);

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
     * User can focus if there's a faction where rep is needed to purchase augmentations.
     * @override
     *
     * @returns {boolean} Whether the user has factions with augmentations available and rep needed.
     */
    public override canFocus(): boolean {
        return this._getFocusableFactions().length > 0;
    }

    /**
     * Work for the faction with the most augmentations available.
     *
     * @returns {boolean} Whether the focus action was successful.
     */
    protected override _focus(): boolean {
        const faction = this._getFactionToFocus();
        // TODO: Add other types of work
        const work = FACTIONS_OBJ[faction].workOffered[0];

        this._ns.print(`[factions] Working ${work} for ${faction}`);
        return this._ns.singularity.workForFaction(faction, work);
    }

    /**
     * Determine which is the best faction to focus on.
     *
     * @returns {string} Faction with the most augmentations available.
     */
    private _getFactionToFocus(): Factions {
        const sortedFactions = this._getFocusableFactions().sort(
            (a, b) =>
                this._getNeededAugmentations(a).length *
                    (this._getMaxAugmentationRep(a) -
                        this._ns.singularity.getFactionRep(a.name)) -
                this._getNeededAugmentations(b).length *
                    (this._getMaxAugmentationRep(b) -
                        this._ns.singularity.getFactionRep(b.name))
        );

        // Return any factions which have a priority augmentation.
        const priorityFactions = sortedFactions.filter((f) =>
            this._ns.singularity
                .getAugmentationsFromFaction(f.name)
                .some(
                    (a) =>
                        !this._ns.singularity
                            .getOwnedAugmentations()
                            .includes(a) &&
                        PRIORITY_AUGMENTATIONS.some((a2) => a2.name === a)
                )
        );
        if (priorityFactions.length > 0) {
            this._ns.print(
                `[factions] ${priorityFactions[0].name} has a priority augmentation`
            );
            return priorityFactions[0].name;
        }

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
     * Return factions which are can be focused on.
     *
     * @returns {IFaction[]} All Factions which which are accepted and have rep needed to purchase augmentations.
     */
    private _getFocusableFactions(): IFaction[] {
        return FACTIONS.filter((f) => {
            return (
                this._ns.getPlayer().factions.includes(f.name) &&
                this._getNeededAugmentations(f).length > 0 &&
                this._getMaxAugmentationRep(f) >
                    this._ns.singularity.getFactionRep(f.name)
            );
        });
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

    /**
     * Get the largest rep requirement of the augmentations offered by `faction`.
     *
     * @param {IFaction} faction - Faction to check.
     * @returns {number} Largest rep cost of the augmentations offered.
     */
    private _getMaxAugmentationRep(faction: IFaction): number {
        return Math.max(
            ...this._getNeededAugmentations(faction).map((a) => {
                return AUGMENTATIONS_OBJ[a].requirements.reputation || 0;
            })
        );
    }
}
