import { MegaCorporation, Company } from "/_types/interfaces/company.js";

/**
 * All MegaCorporations (companies with factions) in the game.
 */
export const MEGACORPS: MegaCorporation[] = [
    {
        name: "ECorp",
        location: "Aevum",
        faction: {
            requirements: {
                reputation: 200000,
            },
            augmentations: [],
        },
    },
    {
        name: "MegaCorp",
        location: "Sector-12",
        faction: {
            requirements: {
                reputation: 200000,
            },
            augmentations: [],
        },
    },
    {
        name: "KuaiGong International",
        location: "Chongqing",
        faction: {
            requirements: {
                reputation: 200000,
            },
            augmentations: [],
        },
    },
    {
        name: "Four Sigma",
        location: "Sector-12",
        faction: {
            requirements: {
                reputation: 200000,
            },
            augmentations: [],
        },
    },
    {
        name: "NWO",
        location: "Volhaven",
        faction: {
            requirements: {
                reputation: 200000,
            },
            augmentations: [],
        },
    },
    {
        name: "Blade Industries",
        location: "Sector-12",
        faction: {
            requirements: {
                reputation: 200000,
            },
            augmentations: [],
        },
    },
    {
        name: "OmniTek Incorporated",
        location: "Volhaven",
        faction: {
            requirements: {
                reputation: 200000,
            },
            augmentations: [],
        },
    },
    {
        name: "Bachman & Associates",
        location: "Aevum",
        faction: {
            requirements: {
                reputation: 200000,
            },
            augmentations: [],
        },
    },
    {
        name: "Clarke Incorporated",
        location: "Aevum",
        faction: {
            requirements: {
                reputation: 200000,
            },
            augmentations: [],
        },
    },
    {
        name: "Fulcrum Technologies",
        location: "Aevum",
        faction: {
            requirements: {
                reputation: 250000,
                backdoor: "fulcrumassets",
            },
            augmentations: [],
        },
    },
];

/**
 * All companies in the game.
 */
export const COMPANIES: Company[] = [
    {
        name: "Storm Technologies",
        location: "Ishima",
    },
    {
        name: "DefComm",
        location: "New Tokyo",
    },
    {
        name: "Helios Labs",
        location: "Volhaven",
    },
    {
        name: "VitaLife",
        location: "New Tokyo",
    },
    {
        name: "Icarus Microsystems",
        location: "Sector-12",
    },
    {
        name: "Universal Energy",
        location: "Sector-12",
    },
    {
        name: "Galactic Cybersystems",
        location: "Aevum",
    },
    {
        name: "AeroCorp",
        location: "Aevum",
    },
    {
        name: "Omnia Cybersystems",
        location: "Volhaven",
    },
    {
        name: "Solaris Space Systems",
        location: "Chongqing",
    },
    {
        name: "Delta One",
        location: "Sector-12",
    },
    {
        name: "Global Pharmaceuticals",
        location: "New Tokyo",
    },
    {
        name: "Nova Medical",
        location: "Ishima",
    },
    {
        name: "CIA",
        location: "Sector-12",
    },
    {
        name: "NSA",
        location: "Sector-12",
    },
    {
        name: "Watchdog Security",
        location: "New Tokyo",
    },
    {
        name: "LexoCorp",
        location: "Volhaven",
    },
    {
        name: "Rho Construction",
        location: "Aevum",
    },
    {
        name: "Alpha Enterprises",
        location: "Sector-12",
    },
    {
        name: "Aevum Police Headquarters",
        location: "Aevum",
    },
    {
        name: "SysCore Securities",
        location: "Volhaven",
    },
    {
        name: "CompuTek",
        location: "Volhaven",
    },
    {
        name: "NetLink Technologies",
        location: "Aevum",
    },
    {
        name: "Carmichael Security",
        location: "Sector-12",
    },
    {
        name: "FoodNStuff",
        location: "Sector-12",
    },
    {
        name: "Joe's Guns",
        location: "Sector-12",
    },
    {
        name: "Omega Software",
        location: "Ishima",
    },
    {
        name: "Noodle Bar",
        location: "New Tokyo",
    },

    ...MEGACORPS,
];

/**
 * All cities, as an object.
 */
export const COMPANIES_OBJ: { [key: string]: Company } = COMPANIES.reduce(
    (a, v) => ({ ...a, [v.name]: v }),
    {}
);
