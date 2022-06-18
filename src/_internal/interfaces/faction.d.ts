import { IFactionRequirements } from "/_internal/interfaces/requirements.js";
import { Factions } from "/_internal/types/factions.js";
import { WorkTypes } from "/_internal/types/work.js";

/**
 * A faction and its requirements.
 * @interface
 */
export interface IFaction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: any;

    /** The faction name. */
    name: Factions;

    /** The requirements to gain an invitation to this faction. */
    requirements: IFactionRequirements;

    /** Types of work offered by this faction. */
    workOffered: WorkTypes[];
}
