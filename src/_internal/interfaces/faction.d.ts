import { IFactionRequirements } from "/_internal/interfaces/requirements.js";
import { Factions } from "/_internal/types/factions.js";

/**
 * A faction and its requirements.
 * @interface
 */
export interface IFaction {
    /** The faction name. */
    name: Factions;

    /** The requirements to gain an invitation to this faction. */
    requirements: IFactionRequirements;
}
