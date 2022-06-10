import { IFactionRequirements } from "/_types/interfaces/requirements.js";
import { Augmentations, Factions } from "/_types/types.js";

/**
 * A faction and its requirements.
 * @interface
 */
export interface IFaction {
    /** The faction name. */
    name: Factions;

    /** The requirements to gain an invitation to this faction. */
    requirements: IFactionRequirements;

    /** Augmentations available for purchase. */
    augmentations: Augmentations[];
}
