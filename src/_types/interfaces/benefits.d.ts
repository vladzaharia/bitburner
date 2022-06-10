import { Programs } from "/_types/types.js";

/**
 * Benefits from purchasing an augmentation.
 * @interface
 */
export interface IAugmentationBenefits {
    /** Hacking skill multipliers. */
    hack?: IHackingBenefits;

    /** Strength skill multipliers. */
    str?: ISkillBenefits;

    /** Defense skill multipliers. */
    def?: ISkillBenefits;

    /** Dexterity skill multipliers. */
    dex?: ISkillBenefits;

    /** Agility skill multipliers. */
    agi?: ISkillBenefits;

    /** Charisma skill multipliers. */
    cha?: ISkillBenefits;

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
interface ISkillBenefits {
    /** Skill multiplier.. */
    skill?: number;

    /** Exp gain multiplier for skill. */
    exp?: number;
}

/**
 * Benefits for the hacking skill.
 * @interface
 * @extends {ISkillBenefits}
 */
interface IHackingBenefits extends ISkillBenefits {
    /** Player's hacking chance. */
    chance?: number;

    /** Player's hacking speed. */
    speed?: number;

    /** Money gained from hacking. */
    money?: number;

    /** Improves grow() operation. */
    grow?: number;
}
