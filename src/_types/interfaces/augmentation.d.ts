import { IAugmentationBenefits } from "/_types/interfaces/benefits.js";
import { IAugmentationRequirements } from "/_types/interfaces/requirements.js";
import { Augmentations, Factions } from "/_types/types.js";

/**
 * An augmentation in Bitburner.
 * @interface
 */
export interface IAugmentation {
    /** The name of the city. */
    name: Augmentations;

    /** Factions where this augmentation can be purchased.. */
    factions: Factions[];

    /** The requirements to gain an invitation to this faction. */
    requirements: IAugmentationRequirements;

    /** Benefits to this augmentation. */
    benefits: IAugmentationBenefits;
}
