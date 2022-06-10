import { IAugmentationBenefits } from "/_internal/interfaces/benefits.js";
import { IAugmentationRequirements } from "/_internal/interfaces/requirements.js";
import { Augmentations } from "/_internal/types/augmentations.js";
import { Factions } from "/_internal/types/factions.js";

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
