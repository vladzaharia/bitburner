import {
    Augmentations,
    Cities,
    Companies,
    Factions,
} from "/helpers/sf4/_types.js";

/**
 * A city in Bitburner.
 * @interface
 */
export interface City {
    /**
     * The name of the city.
     */
    name: Cities;

    /**
     * The enemies this city has.
     */
    enemies: Cities[];

    /**
     * Faction-specific information for this city.
     */
    faction: {
        /**
         * The requirements to gain an invitation to this faction.
         */
        requirements: FactionRequirements;

        /**
         * Augmentations available for purchase.
         */
        augmentations: Augmentations[];
    };
}

/**
 * A company that can be worked at.
 */
export interface Company {
    /**
     * Name of the company.
     */
    name: Companies;

    /**
     * City the company is located in.
     */
    location: Cities;

    /**
     * Hostname of the server, if available.
     */
    hostname?: string;
}

/**
 * A company with a faction.
 */
export interface MegaCorporation extends Company {
    /**
     * Faction-specific information for this company.
     */
    faction: {
        /**
         * The requirements to gain an invitation to this faction.
         */
        requirements: FactionRequirements;

        /**
         * Augmentations available for purchase.
         */
        augmentations: Augmentations[];
    };
}

/**
 * A faction and its requirements.
 */
export interface Faction {
    /**
     * The faction name.
     */
    name: Factions;

    /**
     * The requirements to gain an invitation to this faction.
     */
    requirements: FactionRequirements;

    /**
     * Augmentations available for purchase.
     */
    augmentations: Augmentations[];
}

/**
 * Requirements to gain access to a faction.
 */
export interface FactionRequirements {
    /**
     * Amount of money needed.
     */
    money?: number;

    /**
     * Hacking level needed.
     */
    level?: number;

    /**
     * Combat level (Str, Def, Agi, Dex) needed.
     */
    combat?: number;

    /**
     * Company reputation needed.
     */
    reputation?: number;

    /**
     * List of cities you have to be in.
     */
    location?: Cities[];

    /**
     * Server needed to backdoor.
     */
    backdoor?: string;

    /**
     * Number of augmentations needed.
     */
    augmentations?: number;

    /**
     * Karma level needed (negative).
     */
    karma?: number;

    /**
     * Number of people killed.
     */
    killed?: number;

    /**
     * User needs certain hacknet requirements.
     */
    hacknet?: boolean;

    /**
     * User needs to be a C-Level executive.
     */
    clevel?: boolean;

    /**
     * User cannot work at CIA / NSA.
     */
    notgov?: boolean;
}
