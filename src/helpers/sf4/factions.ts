import { Faction, FactionRequirements } from "/helpers/sf4/_interfaces.js";
import { CITIES } from "/helpers/sf4/cities.js";
import { MEGACORPS } from "./companies";
import { Augmentations, MegaCorporations } from "./_types";

/**
 * All factions, including cities and MegaCorporations.
 */
export const FACTIONS: Faction[] = [
    ...CITIES.map((c) => {
        return {
            name: c.name,
            requirements: {
                money: c.money,
            },
            augmentations: c.augmentations,
        };
    }),

    ...MEGACORPS.map((mc) => {
        return {
            name: mc.name as MegaCorporations,
            requirements: mc.factionRequirements as FactionRequirements,
            augmentations: mc.augmentations as Augmentations[],
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
