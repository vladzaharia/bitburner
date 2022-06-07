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
     * @argument {number}
     */
    money?: number;

    /**
     * Hacking level needed.
     * @argument {number}
     */
    level?: number;

    /**
     * Combat level (Str, Def, Agi, Dex) needed.
     * @argument {number}
     */
    combat?: number;

    /**
     * List of cities you have to be in.
     * @argument {string[]}
     */
    location?: Cities[];

    /**
     * Server needed to backdoor.
     * @argument {string}
     */
    backdoor?: string;

    /**
     * Number of augmentations needed.
     * @argument {number}
     */
    augmentations?: number;

    /**
     * Karma level needed (negative).
     * @argument {number}
     */
    karma?: number;

    /**
     * Number of people killed.
     * @argument {number}
     */
    killed?: number;

    /**
     * User needs certain hacknet requirements.
     * @argument {Boolean}
     */
    hacknet?: boolean;

    /**
     * User needs to be a C-Level executive.
     * @argument {boolean}
     */
    clevel?: boolean;

    /**
     * User cannot work at CIA / NSA.
     * @argument {boolean}
     */
    notgov?: boolean;
}
