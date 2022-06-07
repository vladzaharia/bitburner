import { Faction } from "/helpers/sf4/_interfaces.js";
import { CITIES } from "/helpers/sf4/cities.js";
import { MEGACORPS } from "./companies";
import { MegaCorporations } from "./_types";

/**
 * All factions, including cities and MegaCorporations.
 */
export const FACTIONS: Faction[] = [
    ...CITIES.map((c) => {
        return {
            name: c.name,
            requirements: c.faction.requirements,
            augmentations: c.faction.augmentations,
        };
    }),

    ...MEGACORPS.map((mc) => {
        return {
            name: mc.name as MegaCorporations,
            requirements: mc.faction.requirements,
            augmentations: mc.faction.augmentations,
        };
    }),
];

/**
 * All factions, as an object.
 */
export const FACTIONS_OBJ: { [key: string]: Faction } = FACTIONS.reduce(
    (a, v) => ({ ...a, [v.name]: v }),
    {}
);
