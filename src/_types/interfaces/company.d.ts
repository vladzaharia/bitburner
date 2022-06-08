import { Companies, Cities, Augmentations } from "/_types/types.js";
import { FactionRequirements } from "/_types/interfaces/requirements.js";

/**
 * A company that can be worked at.
 * @interface
 */
export interface Company {
    /** Name of the company. */
    name: Companies;

    /** City the company is located in. */
    location: Cities;

    /** Hostname of the server, if available. */
    hostname?: string;
}

/**
 * A company with a faction.
 * @interface
 */
export interface MegaCorporation extends Company {
    /** Faction-specific information for this company. */
    faction: {
        /** The requirements to gain an invitation to this faction. */
        requirements: FactionRequirements;

        /** Augmentations available for purchase. */
        augmentations: Augmentations[];
    };
}
