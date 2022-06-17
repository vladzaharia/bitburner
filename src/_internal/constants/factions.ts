import { CITIES } from "/_internal/constants/cities.js";
import { MEGACORPS } from "/_internal/constants/companies.js";
import { IFaction } from "/_internal/interfaces/faction.js";
import { MegaCorporations } from "/_internal/types/companies.js";

/**
 * All factions, including cities and MegaCorporations.
 */
export const FACTIONS: IFaction[] = [
    {
        name: "CyberSec",
        requirements: {
            backdoor: "CSEC",
        },
    },
    {
        name: "Tian Di Hui",
        requirements: {
            level: 50,
            location: ["Chongqing", "Ishima", "New Tokyo"],
            money: 1000000,
        },
    },
    {
        name: "Netburners",
        requirements: {
            hacknet: true,
            level: 80,
        },
    },
    {
        name: "NiteSec",
        requirements: {
            backdoor: "avmnite-02h",
        },
    },
    {
        name: "The Black Hand",
        requirements: {
            backdoor: "I.I.I.I",
        },
    },
    {
        name: "BitRunners",
        requirements: {
            backdoor: "run4theh111z",
        },
    },
    {
        name: "Slum Snakes",
        requirements: {
            combat: 30,
            karma: -9,
            money: 1000000,
        },
    },
    {
        name: "Tetrads",
        requirements: {
            combat: 75,
            karma: -18,
            location: ["Chongqing", "Ishima", "New Tokyo"],
        },
    },
    {
        name: "Silhouette",
        requirements: {
            clevel: true,
            karma: -22,
            money: 15000000,
        },
    },
    {
        name: "Speakers for the Dead",
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
        requirements: {
            augmentations: 20,
            combat: 850,
            level: 850,
            money: 75000000000,
        },
    },
    {
        name: "Daedalus",
        requirements: {
            augmentations: 30,
            combat: 1500,
            level: 2500,
            money: 100000000000,
        },
    },
    {
        name: "Illuminati",
        requirements: {
            augmentations: 30,
            combat: 1200,
            level: 1500,
            money: 150000000000,
        },
    },

    ...CITIES.map((c) => {
        return {
            ...c,
            requirements: c.faction.requirements,
        };
    }),

    ...MEGACORPS.map((mc) => {
        return {
            ...mc,
            name: mc.name as MegaCorporations,
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
