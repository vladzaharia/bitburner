import { CITIES } from "/_types/constants/cities.js";
import { MEGACORPS } from "/_types/constants/companies.js";
import { IFaction } from "/_types/interfaces/faction.js";
import { MegaCorporations } from "/_types/types.js";

/**
 * All factions, including cities and MegaCorporations.
 */
export const FACTIONS: IFaction[] = [
    {
        name: "CyberSec",
        augmentations: [],
        requirements: {
            backdoor: "CSEC",
        },
    },
    {
        name: "Tian Di Hui",
        augmentations: [],
        requirements: {
            level: 50,
            location: ["Chongqing", "Ishima", "New Tokyo"],
            money: 1000000,
        },
    },
    {
        name: "Netburners",
        augmentations: [],
        requirements: {
            hacknet: true,
            level: 80,
        },
    },
    {
        name: "NiteSec",
        augmentations: [],
        requirements: {
            backdoor: "avmnite-02h",
        },
    },
    {
        name: "The Black Hand",
        augmentations: [],
        requirements: {
            backdoor: "I.I.I.I",
        },
    },
    {
        name: "BitRunners",
        augmentations: [],
        requirements: {
            backdoor: "run4theh111z",
        },
    },
    {
        name: "Slum Snakes",
        augmentations: [],
        requirements: {
            combat: 30,
            karma: -9,
            money: 1000000,
        },
    },
    {
        name: "Tetrads",
        augmentations: [],
        requirements: {
            combat: 75,
            karma: -18,
            location: ["Chongqing", "Ishima", "New Tokyo"],
        },
    },
    {
        name: "Silhouette",
        augmentations: [],
        requirements: {
            clevel: true,
            karma: -22,
            money: 15000000,
        },
    },
    {
        name: "Speakers for the Dead",
        augmentations: [],
        requirements: {
            combat: 300,
            karma: -45,
            killed: 30,
            level: 100,
            notGov: true,
        },
    },
    {
        name: "The Dark Army",
        augmentations: [],
        requirements: {
            combat: 300,
            karma: -45,
            killed: 5,
            level: 300,
            location: ["Chongqing"],
            notGov: true,
        },
    },
    {
        name: "The Syndicate",
        augmentations: [],
        requirements: {
            combat: 200,
            karma: -90,
            level: 200,
            location: ["Aevum", "Sector-12"],
            money: 10000000,
            notGov: true,
        },
    },
    {
        name: "The Covenant",
        augmentations: [],
        requirements: {
            augmentations: 20,
            combat: 850,
            level: 850,
            money: 75000000000,
        },
    },
    {
        name: "Daedalus",
        augmentations: [],
        requirements: {
            augmentations: 30,
            combat: 1500,
            level: 2500,
            money: 100000000000,
        },
    },
    {
        name: "Illuminati",
        augmentations: [],
        requirements: {
            augmentations: 30,
            combat: 1200,
            level: 1500,
            money: 150000000000,
        },
    },

    ...CITIES.map((c) => {
        return {
            name: c.name,
            augmentations: c.faction.augmentations,
            requirements: c.faction.requirements,
        };
    }),

    ...MEGACORPS.map((mc) => {
        return {
            name: mc.name as MegaCorporations,
            augmentations: mc.faction.augmentations,
            requirements: mc.faction.requirements,
        };
    }),
];

/**
 * All factions, as an object.
 */
export const FACTIONS_OBJ: { [key: string]: IFaction } = FACTIONS.reduce(
    (a, v) => ({ ...a, [v.name]: v }),
    {}
);
