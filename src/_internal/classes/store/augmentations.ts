import { NS } from "Netscript";

import { FactionManager } from "/_internal/classes/faction/_manager.js";
import { Store } from "/_internal/classes/store/_base.js";
import { AUGMENTATIONS_OBJ } from "/_internal/constants/augmentations.js";
import { Augmentations } from "/_internal/types/augmentations.js";
import { Factions } from "/_internal/types/factions.js";

/**
 * Parameters for purchasing workers.
 * @interface
 */
interface AugmentationPurchaseParams {
    /** Name of the faction to purchase from. */
    faction?: Factions;

    /** Name of the augmentation to purchase. */
    augmentation: Augmentations;

    requirements?: {
        money?: number;
        reputation?: number;
    };
}

/**
 * Layer on top of `NS` to simplify augmentation purchasing.
 * @class
 */
export class AugmentationStore extends Store<AugmentationPurchaseParams, null> {
    /** Faction manager to help determine what to buy. */
    private _factionManager: FactionManager;

    /**
     * Creates a new Augmentation store instance which allows for purchasing and upgrading augmentations.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     */
    public constructor(ns: NS) {
        // Budget is 100% of available money
        super(ns, 1);

        // Set the faction manager
        this._factionManager = new FactionManager(ns);
    }

    /**
     * Check if user has enough money and reputation to purchase this augmentation.
     * @override
     *
     * @param {AugmentationPurchaseParams} params - Params for this transaction.
     * @returns {boolean} True if user can purchase, false otherwise.
     */
    public override canPurchase(params: AugmentationPurchaseParams): boolean {
        return super.canPurchase(params) && this._hasEnoughRep(params);
    }

    /**
     * Get cost of purchasing `params.augmentation`.
     * @override
     *
     * @param {AugmentationPurchaseParams} params - Parameters for this transaction.
     * @returns {number} Cost of the transaction.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override getPurchaseCost(
        params: AugmentationPurchaseParams
    ): number {
        return this._ns.singularity.getAugmentationPrice(params.augmentation);
    }

    /**
     * Get the most expensive augmentation to purchase.
     *
     * @returns {AugmentationPurchaseParams} Augmentation to purchase, null if none are available.
     */
    public getAugmentationToPurchase(): AugmentationPurchaseParams | null {
        // Get augmentations available
        const augmentationsAvailable =
            this._factionManager.getPurchaseableAugmentations();
        const sortedAugmentations: AugmentationPurchaseParams[] = Object.keys(
            augmentationsAvailable
        )
            .flatMap((f) =>
                augmentationsAvailable[f].map(
                    (a): AugmentationPurchaseParams => {
                        return {
                            faction: f as Factions,
                            augmentation: a.name,
                            requirements: a.requirements,
                        };
                    }
                )
            )
            .sort(
                (a1, a2) =>
                    (a2.requirements?.money || 0) -
                    (a1.requirements?.money || 0)
            );

        this._ns.print(
            `[store] ${sortedAugmentations.length} augmentations available for purchase`
        );

        const neuroFluxPrice =
            this._ns.singularity.getAugmentationPrice("NeuroFlux Governor");
        const neuroFluxRep =
            this._ns.singularity.getAugmentationRepReq("NeuroFlux Governor");

        // Check if any augmentations are purchaseable
        if (
            sortedAugmentations.length === 0 &&
            this.getAvailableMoney() > neuroFluxPrice
        ) {
            // Purchase NeuroFlux Governor
            const augmentation: Augmentations = "NeuroFlux Governor";
            return {
                augmentation: augmentation,
                faction: this._factionManager
                    .getJoinedFactions()
                    .sort(
                        (f1, f2) => f2.getReputation() - f1.getReputation()
                    )[0]
                    .getName(),
                requirements: {
                    money: neuroFluxPrice,
                    reputation: neuroFluxRep,
                },
            };
        } else if (sortedAugmentations.length === 0) {
            // Nothing left to purchase
            return null;
        }

        // Return first augmentation
        return sortedAugmentations[0];
    }

    /**
     * Purchase a new augmentation `params.augmentation` from `params.faction`.
     * @override
     * @async
     *
     * @param {AugmentationPurchaseParams} params - Parameters for this transaction.
     * @returns {Promise<boolean>} Whether the transaction was successful.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected override async _purchase(
        params: AugmentationPurchaseParams
    ): Promise<boolean> {
        this._ns.print(
            `[store] Purchasing ${params.augmentation} from ${params.faction}.`
        );

        return this._ns.singularity.purchaseAugmentation(
            params.faction as string,
            params.augmentation
        );
    }

    /**
     * Verifies that the augmentation is set
     * @override
     *
     * @param {WorkerPurchaseParams} params - Parameters for this transaction.
     * @returns {boolean} Whether the parameters are valid.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected override _checkParams(
        params: AugmentationPurchaseParams
    ): boolean {
        return !!params.augmentation;
    }

    /**
     * Check if user has enough rep for this augmentation.
     *
     * @param {AugmentationPurchaseParams} params - Params for this transaction.
     * @returns {boolean} True if user has enough rep, false otherwise.
     */
    private _hasEnoughRep(params: AugmentationPurchaseParams) {
        return (
            (AUGMENTATIONS_OBJ[params.augmentation].requirements.reputation ||
                0) < this._ns.singularity.getFactionRep(params.faction || "")
        );
    }
}
