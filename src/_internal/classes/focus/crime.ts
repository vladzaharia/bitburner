import { NS } from "Netscript";

import { BaseFocusable } from "/_internal/classes/focus/_base.js";
import { CRIMES } from "/_internal/constants/crimes.js";
import { FACTIONS } from "/_internal/constants/factions.js";
import { Crimes } from "/_internal/types/crimes.js";

/** Factions which require crime. */
const CRIME_FACTIONS = FACTIONS.filter(
    (f) => f.requirements.karma || f.requirements.killed
);

const KILL_CRIMES: Crimes[] = [
    "commit homicide",
    "assassinate a high-profile target",
];

/**
 * Focusable managing crime.
 * @class
 * @extends BaseFocusable
 */
export class CrimeFocusable extends BaseFocusable {
    /** Time to sleep, set when executing a task. */
    private _crimeTime: number | undefined;

    /**
     * Creates a focuser that manages crime work.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     * @param {number} priority - Priority this focuser should run at, defaults to `50`.
     */
    public constructor(ns: NS, priority = 150) {
        super("Crime", ns, priority);
    }

    /**
     * Check if we need to commit a crime to meet faction requirements.
     *
     * @returns {boolean} True if we need to kill or lose karma.
     */
    public override canFocus(): boolean {
        return this._needToLoseKarma() || this._needToKill();
    }

    /**
     * Commit a crime.
     *
     * @returns {boolean} True if crime was successful, false otherwise.
     */
    protected override _focus(): boolean {
        let crimes = CRIMES.reverse();

        // Prioritize kill operations
        if (this._needToKill()) {
            crimes = [...KILL_CRIMES, ...crimes];
        }

        // Try to commit any crime
        for (const crime of crimes) {
            if (this._shouldExecute(crime)) {
                this._crimeTime = this._ns.singularity.commitCrime(crime);
                return true;
            }
        }

        return false;
    }

    /**
     * Crimes can never run in the background, returns false always.
     *
     * @returns {boolean} Always false.
     */
    public override shouldRunInBackground(): boolean {
        return false;
    }

    /**
     * Returns the focus time of the current crime.
     *
     * @returns {number} Time needed to focus, 0 if not commiting a crime.
     */
    public override getFocusTime(): number {
        return this._crimeTime || 0;
    }

    /**
     * Check if we should commit a crime.
     *
     * @param {Crimes} crime - The crime to check if we should commit.
     * @returns {boolean} True if there's a good chance to succeed, false otherwise.
     */
    private _shouldExecute(crime: Crimes): boolean {
        const chance = this._ns.singularity.getCrimeChance(crime);
        this._ns.print(`[crime] ${crime}, chance ${chance}`);
        return chance > 0.8;
    }

    /**
     * Check if we need to kill someone.
     *
     * @returns {boolean} True if we still need to kill for a faction invitation.
     */
    private _needToKill(): boolean {
        const killed = this._ns.getPlayer().numPeopleKilled;
        const maxKilled = Math.max(
            ...CRIME_FACTIONS.map((f) => f.requirements.killed || 0)
        );

        return killed < maxKilled;
    }

    /**
     * Check if we need to lose karma.
     *
     * @returns {boolean} True if we still need to lose karma for a faction invitation.
     */
    private _needToLoseKarma(): boolean {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const karma = (this._ns as any).heart.break();
        const minKarma = Math.min(
            ...CRIME_FACTIONS.map((f) => f.requirements.karma || 0)
        );

        return karma > minKarma;
    }
}
