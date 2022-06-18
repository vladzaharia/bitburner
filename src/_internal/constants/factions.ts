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
        workOffered: ["Hacking"],
    },
    {
        name: "Tian Di Hui",
        requirements: {
            level: 50,
            location: ["Chongqing", "Ishima", "New Tokyo"],
            money: 1000000,
        },
        workOffered: ["Hacking", "Security"],
    },
    {
        name: "Netburners",
        requirements: {
            hacknet: true,
            level: 80,
        },
        workOffered: ["Hacking"],
    },
    {
        name: "NiteSec",
        requirements: {
            backdoor: "avmnite-02h",
        },
        workOffered: ["Hacking"],
    },
    {
        name: "The Black Hand",
        requirements: {
            backdoor: "I.I.I.I",
        },
        workOffered: ["Hacking"],
    },
    {
        name: "BitRunners",
        requirements: {
            backdoor: "run4theh111z",
        },
        workOffered: ["Hacking"],
    },
    {
        name: "Slum Snakes",
        requirements: {
            combat: 30,
            karma: -9,
            money: 1000000,
        },
        workOffered: ["Field", "Security"],
    },
    {
        name: "Tetrads",
        requirements: {
            combat: 75,
            karma: -18,
            location: ["Chongqing", "Ishima", "New Tokyo"],
        },
        workOffered: ["Field", "Security"],
    },
    {
        name: "Silhouette",
        requirements: {
            clevel: true,
            karma: -22,
            money: 15000000,
        },
        workOffered: ["Hacking", "Field"],
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
        workOffered: ["Hacking", "Field", "Security"],
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
        workOffered: ["Hacking", "Field"],
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
        workOffered: ["Hacking", "Field", "Security"],
    },
    {
        name: "The Covenant",
        requirements: {
            augmentations: 20,
            combat: 850,
            level: 850,
            money: 75000000000,
        },
        workOffered: ["Hacking", "Field"],
    },
    {
        name: "Daedalus",
        requirements: {
            augmentations: 30,
            combat: 1500,
            level: 2500,
            money: 100000000000,
        },
        workOffered: ["Hacking", "Field"],
    },
    {
        name: "Illuminati",
        requirements: {
            augmentations: 30,
            combat: 1200,
            level: 1500,
            money: 150000000000,
        },
        workOffered: ["Hacking", "Field"],
    },

    ...CITIES.map((c) => {
        return {
            ...c,
            requirements: c.faction.requirements,
            workOffered: c.faction.workOffered,
        };
    }),

    ...MEGACORPS.map((mc) => {
        return {
            ...mc,
            name: mc.name as MegaCorporations,
            requirements: mc.faction.requirements,
            workOffered: mc.faction.workOffered,
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
