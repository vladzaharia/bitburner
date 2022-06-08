import { MegaCorporations } from "/_types/types.js";
import { CITIES } from "/_types/constants/cities.js";
import { MEGACORPS } from "/_types/constants/companies.js";
import { Faction } from "/_types/interfaces/faction.js";

/**
 * All factions, including cities and MegaCorporations.
 */
export const FACTIONS: Faction[] = [
    {
        name: "CyberSec",
        requirements: {
            backdoor: "CSEC",
        },
        augmentations: [],
    },
    {
        name: "Tian Di Hui",
        requirements: {
            money: 1000000,
            level: 50,
            location: ["Chongqing", "New Tokyo", "Ishima"],
        },
        augmentations: [],
    },
    {
        name: "Netburners",
        requirements: {
            level: 80,
            hacknet: true,
        },
        augmentations: [],
    },
    {
        name: "NiteSec",
        requirements: {
            backdoor: "avmnite-02h",
        },
        augmentations: [],
    },
    {
        name: "The Black Hand",
        requirements: {
            backdoor: "I.I.I.I",
        },
        augmentations: [],
    },
    {
        name: "BitRunners",
        requirements: {
            backdoor: "run4theh111z",
        },
        augmentations: [],
    },
    {
        name: "Slum Snakes",
        requirements: {
            combat: 30,
            karma: -9,
            money: 1000000,
        },
        augmentations: [],
    },
    {
        name: "Tetrads",
        requirements: {
            combat: 75,
            karma: -18,
            location: ["Chongqing", "New Tokyo", "Ishima"],
        },
        augmentations: [],
    },
    {
        name: "Silhouette",
        requirements: {
            clevel: true,
            money: 15000000,
            karma: -22,
        },
        augmentations: [],
    },
    {
        name: "Speakers for the Dead",
        requirements: {
            level: 100,
            combat: 300,
            killed: 30,
            karma: -45,
            notGov: true,
        },
        augmentations: [],
    },
    {
        name: "The Dark Army",
        requirements: {
            level: 300,
            combat: 300,
            killed: 5,
            karma: -45,
            notGov: true,
            location: ["Chongqing"],
        },
        augmentations: [],
    },
    {
        name: "The Syndicate",
        requirements: {
            level: 200,
            combat: 200,
            karma: -90,
            money: 10000000,
            notGov: true,
            location: ["Aevum", "Sector-12"],
        },
        augmentations: [],
    },
    {
        name: "The Covenant",
        requirements: {
            level: 850,
            combat: 850,
            augmentations: 20,
            money: 75000000000,
        },
        augmentations: [],
    },
    {
        name: "Daedalus",
        requirements: {
            level: 2500,
            combat: 1500,
            augmentations: 30,
            money: 100000000000,
        },
        augmentations: [],
    },
    {
        name: "Illuminati",
        requirements: {
            level: 1500,
            combat: 1200,
            augmentations: 30,
            money: 150000000000,
        },
        augmentations: [],
    },

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
