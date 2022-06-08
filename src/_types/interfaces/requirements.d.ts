import { Cities } from "/_types/types.js";

/**
 * Requirements to purchase an augmentation.
 * @interface
 */
export interface AugmentationRequirements {
    /** Amount of money needed. */
    money?: number;

    /** Company/Faction reputation needed. */
    reputation?: number;
}

/**
 * Requirements to gain access to a faction.
 * @interface
 * @extends {AugmentationRequirements}
 */
export interface FactionRequirements extends AugmentationRequirements {
    /** Hacking level needed. */
    level?: number;

    /** Combat level (Str, Def, Agi, Dex) needed. */
    combat?: number;

    /** List of cities you have to be in. */
    location?: Cities[];

    /** Server needed to backdoor. */
    backdoor?: string;

    /** Number of augmentations needed. */
    augmentations?: number;

    /** Karma level needed (negative). */
    karma?: number;

    /** Number of people killed. */
    killed?: number;

    /** User needs certain hacknet requirements. */
    hacknet?: boolean;

    /** User needs to be a C-Level executive. */
    clevel?: boolean;

    /** User cannot work at CIA / NSA. */
    notGov?: boolean;
}
