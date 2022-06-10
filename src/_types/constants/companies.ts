import { ICompany, IMegaCorporation } from "/_types/interfaces/company.js";

/**
 * All MegaCorporations (companies with factions) in the game.
 */
export const MEGACORPS: IMegaCorporation[] = [
    {
        name: "ECorp",
        faction: {
            augmentations: [],
            requirements: {
                reputation: 200000,
            },
        },
        location: "Aevum",
    },
    {
        name: "MegaCorp",
        faction: {
            augmentations: [],
            requirements: {
                reputation: 200000,
            },
        },
        location: "Sector-12",
    },
    {
        name: "KuaiGong International",
        faction: {
            augmentations: [],
            requirements: {
                reputation: 200000,
            },
        },
        location: "Chongqing",
    },
    {
        name: "Four Sigma",
        faction: {
            augmentations: [],
            requirements: {
                reputation: 200000,
            },
        },
        location: "Sector-12",
    },
    {
        name: "NWO",
        faction: {
            augmentations: [],
            requirements: {
                reputation: 200000,
            },
        },
        location: "Volhaven",
    },
    {
        name: "Blade Industries",
        faction: {
            augmentations: [],
            requirements: {
                reputation: 200000,
            },
        },
        location: "Sector-12",
    },
    {
        name: "OmniTek Incorporated",
        faction: {
            augmentations: [],
            requirements: {
                reputation: 200000,
            },
        },
        location: "Volhaven",
    },
    {
        name: "Bachman & Associates",
        faction: {
            augmentations: [],
            requirements: {
                reputation: 200000,
            },
        },
        location: "Aevum",
    },
    {
        name: "Clarke Incorporated",
        faction: {
            augmentations: [],
            requirements: {
                reputation: 200000,
            },
        },
        location: "Aevum",
    },
    {
        name: "Fulcrum Technologies",
        faction: {
            augmentations: [],
            requirements: {
                backdoor: "fulcrumassets",
                reputation: 250000,
            },
        },
        location: "Aevum",
    },
];

/**
 * All companies in the game.
 */
export const COMPANIES: ICompany[] = [
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
export const COMPANIES_OBJ: { [key: string]: ICompany } = COMPANIES.reduce(
    (a, v) => ({ ...a, [v.name]: v }),
    {}
);
