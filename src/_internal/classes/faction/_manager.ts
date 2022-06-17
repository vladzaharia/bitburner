import { NS } from "Netscript";

import { Faction } from "/_internal/classes/faction/_base.js";
import { AUGMENTATIONS_OBJ } from "/_internal/constants/augmentations.js";
import { FACTIONS } from "/_internal/constants/factions.js";
import { IAugmentation } from "/_internal/interfaces/augmentation.js";

export type AugmentationMap = { [key: string]: IAugmentation[] };

/**
 * Manager handling factions.
 * @class
 */
export class FactionManager {
    /** The Netscript object. */
    private _ns: NS;

    /** All factions, as a `Faction` instance. */
    private _allFactions: Faction[];

    /** All augmentations offered by a faction. */
    private _augmentationMap: AugmentationMap = {};

    /**
     * Creates a new manager handling factions.
     * @constructor
     */
    constructor(ns: NS) {
        this._ns = ns;

        // Set the factions array
        this._allFactions = FACTIONS.map((f) => new Faction(this._ns, f));

        // Set the augmentation map
        for (const f of this._allFactions) {
            this._augmentationMap[f.getName()] = f
                .getAugmentations()
                .map((a) => AUGMENTATIONS_OBJ[a]);
        }
    }

    /**
     * Returns all joined factions, as `Faction` instances.
     *
     * @returns {Faction[]} All factions that have been joined.
     */
    public getJoinedFactions(): Faction[] {
        return this._allFactions.filter((f) => f.isJoined());
    }

    /**
     * Returns all factions which haven't been joined, as `Faction` instances.
     *
     * @returns {Faction[]} All factions that haven't been joined.
     */
    public getUnjoinedFactions(): Faction[] {
        return this._allFactions.filter((f) => !f.isJoined());
    }

    /**
     * Returns all factions which meet join requirements, as `Faction` instances.
     *
     * @returns {Faction[]} All factions which can be joined.
     */
    public getJoinableFactions(): Faction[] {
        return this._allFactions.filter((f) => f.canJoin());
    }

    /**
     * Get all augmentations offered by all factions.
     *
     * @returns {AugmentationMap} All factions' augmentations, by faction name.
     */
    public getAugmentations(): AugmentationMap {
        return { ...this._augmentationMap };
    }

    /**
     * Get all augmentations offered by all factions which aren't owned yet.
     *
     * @returns {AugmentationMap} All factions' augmentations, by faction name.
     */
    public getNeededAugmentations(): AugmentationMap {
        const augmentationMap = this.getAugmentations();

        for (const faction in augmentationMap) {
            const neededAugmentations = augmentationMap[faction].filter(
                (a) =>
                    !this._ns.singularity
                        .getOwnedAugmentations()
                        .includes(a.name)
            );
            if (neededAugmentations.length > 0) {
                augmentationMap[faction] = neededAugmentations;
            } else {
                delete augmentationMap[faction];
            }
        }

        return augmentationMap;
    }

    /**
     * Get all augmentations offered by all factions which can be purchased.
     *
     * @returns {AugmentationMap} All factions' augmentations, by faction name.
     */
    public getPurchaseableAugmentations(): AugmentationMap {
        const augmentationMap = this.getNeededAugmentations();

        for (const faction in augmentationMap) {
            const purchaseableAugmentations = augmentationMap[faction].filter(
                (a) =>
                    this._ns.getServerMoneyAvailable("home") >
                        (a.requirements.money || 0) &&
                    this._ns.singularity.getFactionRep(faction) >
                        (a.requirements.reputation || 0)
            );
            if (purchaseableAugmentations.length > 0) {
                augmentationMap[faction] = purchaseableAugmentations;
            } else {
                delete augmentationMap[faction];
            }
        }

        return augmentationMap;
    }
}
