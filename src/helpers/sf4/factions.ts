import { CITIES } from "./cities";
import { Cities, Factions } from "/helpers/sf4/_types.js";

/**
 * All factions, including cities and MegaCorporations.
 */
export const FACTIONS: Faction[] = [
    ...CITIES.map((c) => {
        return {
            name: c.name,
            requirements: {
                money: c.money,
            },
        };
    }),
];

/**
 * A faction and its requirements.
 */
export interface Faction {
    /**
     * The faction name.
     * @argument {string}
     */
    name: Factions;

    /**
     * The requirements to gain an invitation to this faction.
     * @argument {Requirements}
     */
    requirements: Requirements;
}

/**
 * Requirements to gain access to a faction.
 */
interface Requirements {
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
