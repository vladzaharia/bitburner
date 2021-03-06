import { IFactionRequirements } from "/_internal/interfaces/requirements.js";
import { Cities } from "/_internal/types/cities.js";
import { WorkTypes } from "/_internal/types/work.js";

/**
 * A city in Bitburner.
 * @interface
 */
export interface ICity {
    /** The name of the city. */
    name: Cities;

    /** The enemies this city has. */
    rivals: Cities[];

    /** Faction-specific information for this city. */
    faction: {
        /** The requirements to gain an invitation to this faction. */
        requirements: IFactionRequirements;

        /** Types of work offered by this faction. */
        workOffered: WorkTypes[];
    };
}
