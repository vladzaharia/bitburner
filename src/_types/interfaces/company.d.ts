import { IFactionRequirements } from "/_types/interfaces/requirements.js";
import { Augmentations, Cities, Companies } from "/_types/types.js";

/**
 * A company that can be worked at.
 * @interface
 */
export interface ICompany {
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
export interface IMegaCorporation extends ICompany {
    /** Faction-specific information for this company. */
    faction: {
        /** The requirements to gain an invitation to this faction. */
        requirements: IFactionRequirements;

        /** Augmentations available for purchase. */
        augmentations: Augmentations[];
    };
}
