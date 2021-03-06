import { IFactionRequirements } from "/_internal/interfaces/requirements.js";
import { Cities } from "/_internal/types/cities.js";
import { Companies } from "/_internal/types/companies.js";
import { Positions } from "/_internal/types/positions.js";
import { WorkTypes } from "/_internal/types/work.js";

/**
 * A company that can be worked at.
 * @interface
 */
export interface ICompany {
    /** Name of the company. */
    name: Companies;

    /** City the company is located in. */
    location: Cities;

    positions: Positions[];

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

        /** Types of work offered by this faction. */
        workOffered: WorkTypes[];
    };
}
