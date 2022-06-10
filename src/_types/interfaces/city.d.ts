import { IFactionRequirements } from "/_types/interfaces/requirements.js";
import { Augmentations, Cities } from "/_types/types.js";

/**
 * A city in Bitburner.
 * @interface
 */
export interface ICity {
    /** The name of the city. */
    name: Cities;

    /** The enemies this city has. */
    enemies: Cities[];

    /** Faction-specific information for this city. */
    faction: {
        /** The requirements to gain an invitation to this faction. */
        requirements: IFactionRequirements;

        /** Augmentations available for purchase. */
        augmentations: Augmentations[];
    };
}
