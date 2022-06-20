import { NS } from "Netscript";

import { Faction } from "/_internal/classes/faction/_base.js";
import { FactionManager } from "/_internal/classes/faction/_manager.js";
import { BaseFocusable } from "/_internal/classes/focus/_base.js";
import { HIGH_PRIORITY } from "/_internal/constants/focus.js";
import { Cities } from "/_internal/types/cities.js";
import { Courses, Workouts } from "/_internal/types/train.js";

/**
 * Focusable managing training stats for faction requirements.
 * @class
 * @extends BaseFocusable
 */
export class TrainingFocusable extends BaseFocusable {
    /** Manager of factions */
    private _factionManager: FactionManager;

    /** Current training or course being done. */
    private _currentTraining: Workouts | Courses | undefined;

    /**
     * Creates a focuser that manages training stats.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {number} priority - Priority this focuser should run at, defaults to `100`.
     */
    public constructor(ns: NS, priority = 100) {
        super("Training", ns, priority, "_currentTraining", 5 * 60 * 1000);

        this._factionManager = new FactionManager(ns);
    }

    /**
     * Returns priority 5 if multipliers make working within reach, default otherwise.
     *
     * @returns {number} Priority for task.
     */
    public override getPriority(): number {
        const player = this._ns.getPlayer();

        return player.strength_mult > 8 &&
            player.defense_mult > 8 &&
            player.agility_mult > 8 &&
            player.dexterity_mult > 8
            ? HIGH_PRIORITY
            : super.getPriority();
    }

    /**
     * Check if we need to train to meet faction requirements.
     *
     * @returns {boolean} True if there's a faction which requires more combat or hacking experience.
     */
    public override canFocus(): boolean {
        const combatFactions = this._getCombatFactions();
        const hackingFactions = this._getHackingFactions();

        return combatFactions.length > 0 || hackingFactions.length > 0;
    }

    /**
     * Either train at the Powerhouse Gym, or study hacking at Rothman University.
     *
     * @returns {boolean} True if the focus was successful, false otherwise.
     */
    protected override _focus(): boolean {
        const maxCombat = this._getCombatFactions()[0]
            ? this._getCombatFactions()[0].getRequirements().combat
            : 0;
        const maxHack = this._getHackingFactions()[0]
            ? this._getHackingFactions()[0].getRequirements().hack
            : 0;
        const player = this._ns.getPlayer();

        // Go to Sector-12 if needed
        const city: Cities = "Sector-12";
        if (player.city !== city) {
            this._ns.singularity.travelToCity(city);
        }

        // Train all combat types
        const workouts: Workouts[] = [
            "strength",
            "defense",
            "agility",
            "dexterity",
        ];
        for (const workout of workouts) {
            if (player[workout] < (maxCombat || 0)) {
                return this._train(workout);
            }
        }

        // Train hacking if needed
        if (this._ns.getHackingLevel() < (maxHack || 0)) {
            return this._learn("Algorithms");
        }

        // Train charisma otherwise
        return this._learn("Leadership");
    }

    /**
     * Train a combat stat at a gym.
     *
     * @param {Workouts} workout - The stat to train.
     * @param {string} gym - Gym to train at.
     * @returns {boolean} True if was successful training.
     */
    private _train(workout: Workouts, gym = "Powerhouse Gym") {
        this._ns.print(`[train] Training ${workout} at ${gym}`);
        this._currentTraining = workout;

        return this._ns.singularity.gymWorkout(gym, workout);
    }

    /**
     * Take a course at a university.
     *
     * @param {Courses} course - The course to take.
     * @param {string} university - University to take course at.
     * @returns {boolean} True if was successful taking course.
     */
    private _learn(course: Courses, university = "Rothman University") {
        this._ns.print(`[train] Taking ${course} at ${university}`);
        this._currentTraining = course;

        return this._ns.singularity.universityCourse(
            "Rothman University",
            course
        );
    }

    /**
     * Get factions needing a higher combat stat.
     *
     * @returns {Faction[]} All factions which have combat requirement higher than current stats, sorted by requirement.
     */
    private _getCombatFactions(): Faction[] {
        return this._factionManager
            .getUnjoinedFactions()
            .filter((f) => {
                const reqs = f.getRequirements();
                return reqs.combat && this._checkCombatStats(reqs.combat);
            })
            .sort(
                (f1, f2) =>
                    (f2.getRequirements().combat || 0) -
                    (f1.getRequirements().combat || 0)
            );
    }

    /**
     * Get factions needing a higher hacking stat.
     *
     * @returns {Faction[]} All factions which have hacking requirement higher than current stats, sorted by requirement.
     */
    private _getHackingFactions(): Faction[] {
        return this._factionManager
            .getUnjoinedFactions()
            .filter((f) => {
                const reqs = f.getRequirements();
                return reqs.hack && this._ns.getHackingLevel() < reqs.hack;
            })
            .sort(
                (f1, f2) =>
                    (f2.getRequirements().hack || 0) -
                    (f1.getRequirements().hack || 0)
            );
    }

    /**
     * Check combat stats against player.
     *
     * @param {number} combat - Combat requirement to check against.
     * @returns {boolean} True if player meets requirement with all stats, false otherwise.
     */
    private _checkCombatStats(combat: number): boolean {
        const { strength, defense, agility, dexterity } = this._ns.getPlayer();
        return (
            strength < combat ||
            defense < combat ||
            agility < combat ||
            dexterity < combat
        );
    }
}
