import { Programs } from "/_types/types.js";

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
        levelCost?: number;

        /** Cost of upgrading RAM. */
        ramCost?: number;

        /** Cost of upgrading CPU cores. */
        coreCost?: number;
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

    /** Increases player's starting money between augmentation installs. */
    startingMoney?: number;

    /** Keeps program between augmentation installs. */
    programs?: Programs[];

    /** Red pill gains access to endgame. */
    endgame?: boolean;
}

/**
 * Benefits for a given skill.
 * @interface
 */
interface SkillBenefits {
    /** Skill multiplier.. */
    skill?: number;

    /** Exp gain multiplier for skill. */
    exp?: number;
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
