import { NS } from "Netscript";

import { canHack } from "/_internal/classes/scanner.js";
import { AUGMENTATIONS_OBJ } from "/_internal/constants/augmentations.js";
import { FACTIONS_OBJ } from "/_internal/constants/factions.js";
import { ICity } from "/_internal/interfaces/city.js";
import { IFaction } from "/_internal/interfaces/faction.js";
import { IFactionRequirements } from "/_internal/interfaces/requirements.js";
import { Cities } from "/_internal/types/cities.js";

/**
 * Helper class which handles factions in the game.
 * @class
 */
export class Faction {
    /** The Netscript object. */
    private _ns: NS;

    /** The faction this represents */
    private _faction: IFaction;

    /**
     * Create a new faction from an `IFaction` or faction name.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {IFaction | string} faction - Faction to instantiate.
     */
    public constructor(ns: NS, faction: IFaction | string) {
        this._ns = ns;

        // Set faction from input or master object
        if (_isFaction(faction)) {
            this._faction = faction;
        } else {
            this._faction = FACTIONS_OBJ[faction];
        }
    }

    /**
     * Get the faction's name.
     *
     * @returns {string} Faction's name.
     */
    public getName(): string {
        return this._faction.name;
    }

    /**
     * Checks if the faction has already been joined.
     *
     * @param {string} name - The name of the faction to check, defaults to this.
     * @returns {boolean} True if faction has been joined, false otherwise.
     */
    public isJoined(name = this._faction.name): boolean {
        const factions = this._ns.getPlayer().factions;
        return factions.includes(name);
    }

    /**
     * Checks if faction requirements are met.
     *
     * @returns {boolean} `true` if requirements are satisfied, false otherwise.
     */
    public canJoin(): boolean {
        const reqs = this._faction.requirements;
        const results: boolean[] = [];

        // Don't join if already joined.
        if (this.isJoined()) {
            return false;
        }

        // Check augmentation count
        if (reqs.augmentations) {
            results.push(
                reqs.augmentations <
                    this._ns.singularity.getOwnedAugmentations().length
            );
        }

        // Check if can hack host
        if (reqs.backdoor) {
            results.push(canHack(this._ns, reqs.backdoor));
        }

        // Check if C-Level position
        // TODO
        if (reqs.clevel) {
            results.push(false);
        }

        // Check combat levels
        if (reqs.combat) {
            const player = this._ns.getPlayer();
            results.push(
                player.strength > reqs.combat &&
                    player.defense > reqs.combat &&
                    player.agility > reqs.combat &&
                    player.dexterity > reqs.combat
            );
        }

        // Check Hacknet conditions
        // TODO
        if (reqs.hacknet) {
            results.push(true);
        }

        // Check karma level
        // TODO
        if (reqs.karma) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const karma = (this._ns as any).heart.break();
            results.push(reqs.karma > karma);
        }

        // Check number of people killed
        if (reqs.killed) {
            results.push(reqs.killed < this._ns.getPlayer().numPeopleKilled);
        }

        // Check hacking level
        if (reqs.hack) {
            results.push(
                (this._faction.name === "Daedalus" && results[3]) ||
                    reqs.hack < this._ns.getHackingLevel()
            );
        }

        // Check that we can get to a location and back
        if (reqs.location) {
            results.push(400000 < this._ns.getServerMoneyAvailable("home"));
        }

        // Check that we have enough money
        if (reqs.money) {
            results.push(reqs.money < this._ns.getServerMoneyAvailable("home"));
        }

        // Check that we aren't working for the CIA or NSA
        // TODO
        if (reqs.notGov) {
            results.push(false);
        }

        // Check that we have company reputation
        if (reqs.reputation) {
            results.push(
                reqs.reputation <
                    this._ns.singularity.getCompanyRep(
                        (this._faction.name === "Fulcrum Secret Technologies" &&
                            "Fulcrum Technologies") ||
                            this._faction.name
                    )
            );
        }

        // Check that we don't have rep with rivals already.
        if (_isCity(this._faction)) {
            for (const rival of this._faction.rivals) {
                results.push(!this.isJoined(rival));
            }
        }

        return results.every((r) => r);
    }

    /**
     * Checks if user should join the faction.
     *
     * @returns {boolean} True if the faction has no enemies or more augmentations available than enemies.
     */
    public shouldJoin(): boolean {
        if (!_isCity(this._faction)) {
            this._ns.print(
                `[faction] ${this._faction.name} has no rivals, joining`
            );
            // Non-cities don't have rivals, so always join.
            return true;
        }

        // Count number of augmentations offered by rivals
        const factionAugmentations = this.getAugmentationsInReach().length;
        let rivalsAugmentations = 0;
        this._faction.rivals.forEach((r) => {
            const rivalInst = new Faction(this._ns, r);
            if (rivalInst.canJoin()) {
                rivalsAugmentations += this.getAugmentationsInReach(r).length;
            }
        });

        this._ns.print(
            `[faction] ${this._faction.name} has augmentations ${factionAugmentations} > ${rivalsAugmentations}`
        );
        // Return which is bigger, rival or self
        return factionAugmentations >= rivalsAugmentations;
    }

    /**
     * Get the location to travel to for this faction.
     *
     * @returns {string | undefined} The location that we'd need to travel to to get an invitation, `null` if unneeded.
     */
    public getLocation(): Cities | undefined {
        if (_isCity(this._faction)) {
            return this._faction.name;
        }

        if (this._faction.requirements.location) {
            return this._faction.requirements.location[0];
        }

        return undefined;
    }

    /**
     * Returns list of all augmentations.
     *
     * @returns {string[]} All augmentations offered by this faction.
     */
    public getAugmentations(name = this._faction.name): string[] {
        return this._ns.singularity.getAugmentationsFromFaction(name);
    }

    /**
     * Returns requirements for the faction.
     *
     * @returns {string[]} All augmentations offered by this faction.
     */
    public getRequirements(): IFactionRequirements {
        return this._faction.requirements;
    }

    /**
     * Returns current reputation for the faction.
     *
     * @returns {number} Current reputation, as number.
     */
    public getReputation(): number {
        return Math.floor(
            this._ns.singularity.getFactionRep(this._faction.name)
        );
    }

    /**
     * Returns list of augmentations that are not yet purchased.
     *
     * @returns {string[]} Augmentations that are not already owned.
     */
    public getNeededAugmentations(name = this._faction.name): string[] {
        return this.getAugmentations(name).filter(
            (a) => !this._ns.singularity.getOwnedAugmentations().includes(a)
        );
    }

    /**
     * Gets list of augmentations that are "in-reach", ie:
     * - Rep cost can be reached within 12 hours
     * - Cost is below 1 billion
     *
     * @returns {string[]} Augmentations that are within reach of purchasing.
     */
    public getAugmentationsInReach(name = this._faction.name): string[] {
        // Reputation growth, per second
        const repGrowth = 10;

        // Max time to work for faction, currently 12 hours
        const maxWorkTime = 12 * 60 * 60;

        // Max achievable cost, 10b
        const maxMoney = 10000000000;

        return this.getNeededAugmentations(name).filter((a) => {
            const augmentation = AUGMENTATIONS_OBJ[a];
            return (
                (augmentation.requirements.money || 0) < maxMoney &&
                (augmentation.requirements.reputation || 0) <
                    repGrowth * maxWorkTime
            );
        });
    }

    /**
     * Gets list of augmentations that are "in-reach" and unique to this faction.
     *
     * @returns {string[]} Unique augmentations that are within reach of purchasing.
     */
    public getUniqueAugmentationsInReach(name = this._faction.name): string[] {
        return this.getAugmentationsInReach(name).filter((a) => {
            const augmentation = AUGMENTATIONS_OBJ[a];
            return augmentation.factions.length === 1;
        });
    }
}

/**
 * Checks if a faction is an `ICity`.
 * @param {IFaction} f - Faction to check.
 *
 * @returns {f is ICity} True if faction is an `ICity`, false otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _isCity = (f: any): f is ICity => {
    return f.rivals;
};

/**
 * Checks if a faction is an `IFaction`.
 * @param {IFaction | string} f - Object to check.
 *
 * @returns {f is IFaction} True if faction is an `IFaction`, false otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _isFaction = (f: any): f is IFaction => {
    return f.requirements;
};
