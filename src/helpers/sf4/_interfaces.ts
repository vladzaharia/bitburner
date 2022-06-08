import {
    Augmentations,
    Cities,
    Companies,
    Factions,
} from "/helpers/sf4/_types.js";

/**
 * An augmentation in Bitburner.
 * @interface
 */
export interface Augmentation {
    /** The name of the city. */
    name: Augmentations;

    /** The requirements to gain an invitation to this faction. */
    requirements: AugmentationRequirements;

    /** Benefits to this augmentation. */
    benefits: AugmentationBenefits;
}

/**
 * A city in Bitburner.
 * @interface
 */
export interface City {
    /** The name of the city. */
    name: Cities;

    /** The enemies this city has. */
    enemies: Cities[];

    /** Faction-specific information for this city. */
    faction: {
        /** The requirements to gain an invitation to this faction. */
        requirements: FactionRequirements;

        /** Augmentations available for purchase. */
        augmentations: Augmentations[];
    };
}

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

/**
 * A faction and its requirements.
 * @interface
 */
export interface Faction {
    /** The faction name. */
    name: Factions;

    /** The requirements to gain an invitation to this faction. */
    requirements: FactionRequirements;

    /** Augmentations available for purchase. */
    augmentations: Augmentations[];
}

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
 * Benefits from purchasing an augmentation.
 * @interface
 */
export interface AugmentationBenefits {
    /** Hacking skill multipliers. */
    hack?: HackingBenefits;

    /** Strength skill multipliers. */
    str?: SkillBenefits;

    /** Defense skill multipliers. */
    def?: SkillBenefits;

    /** Dexterity skill multipliers. */
    dex?: SkillBenefits;

    /** Agility skill multipliers. */
    agi?: SkillBenefits;

    /** Charisma skill multipliers. */
    cha?: SkillBenefits;

    /** Hacknet multipliers. */
    hacknet?: {
        /** Money gained from hacknets. */
        money?: number;

        /** Cost of purchasing a new hacknet node. */
        cost?: number;

        /** Cost of upgrading level. */
        level_cost?: number;

        /** Cost of upgrading RAM. */
        ram_cost?: number;

        /** Cost of upgrading CPU cores. */
        core_cost?: number;
    };

    /** Company/Faction multipliers. */
    work?: {
        /** Reputation gained from working for a company. */
        company?: number;

        /** Reputation gained from working for a faction. */
        faction?: number;

        /** Money gained from working for a company. */
        money?: number;
    };

    /** Crime multipliers. */
    crime?: {
        /** Success rate of crimes. */
        success?: number;

        /** Money gained from crimes. */
        money?: number;
    };
}

/**
 * Benefits for a given skill.
 * @interface
 */
interface SkillBenefits {
    /** Skill multiplier.. */
    mult?: number;

    /** Exp gain multiplier for skill. */
    exp_mult?: number;
}

/**
 * Benefits for the hacking skill.
 * @interface
 * @extends {SkillBenefits}
 */
interface HackingBenefits extends SkillBenefits {
    /** Player's hacking chance. */
    chance?: number;

    /** Player's hacking speed. */
    speed?: number;

    /** Money gained from hacking. */
    money?: number;

    /** Improves grow() operation. */
    grow?: number;
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
    notgov?: boolean;
}
