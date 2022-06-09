import { AugmentationBenefits } from "/_types/interfaces/benefits.js";
import { AugmentationRequirements } from "/_types/interfaces/requirements.js";
import { Augmentations, Factions } from "/_types/types.js";

/**
 * An augmentation in Bitburner.
 * @interface
 */
export interface Augmentation {
    /** The name of the city. */
    name: Augmentations;

    /** Factions where this augmentation can be purchased.. */
    factions: Factions[];

    /** The requirements to gain an invitation to this faction. */
    requirements: AugmentationRequirements;

    /** Benefits to this augmentation. */
    benefits: AugmentationBenefits;
}
