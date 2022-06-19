import {
    AGENT_POSITIONS,
    BUSINESS_POSITIONS,
    IT_POSITIONS,
    SECURITY_POSITIONS,
    SOFTWARE_CONSULTANT_POSITIONS,
    TECHNOLOGY_POSITIONS,
} from "/_internal/constants/positions.js";
import { ICompany, IMegaCorporation } from "/_internal/interfaces/company.js";

/**
 * All MegaCorporations (companies with factions) in the game.
 */
export const MEGACORPS: IMegaCorporation[] = [
    {
        name: "ECorp",
        faction: {
            requirements: {
                reputation: 200000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SECURITY_POSITIONS,
        ],
        location: "Aevum",
    },
    {
        name: "MegaCorp",
        faction: {
            requirements: {
                reputation: 200000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SECURITY_POSITIONS,
        ],
        location: "Sector-12",
    },
    {
        name: "KuaiGong International",
        faction: {
            requirements: {
                reputation: 200000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SECURITY_POSITIONS,
        ],
        location: "Chongqing",
    },
    {
        name: "Four Sigma",
        faction: {
            requirements: {
                reputation: 200000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SECURITY_POSITIONS,
        ],
        location: "Sector-12",
    },
    {
        name: "NWO",
        faction: {
            requirements: {
                reputation: 200000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SECURITY_POSITIONS,
        ],
        location: "Volhaven",
    },
    {
        name: "Blade Industries",
        faction: {
            requirements: {
                reputation: 200000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SECURITY_POSITIONS,
        ],
        location: "Sector-12",
    },
    {
        name: "OmniTek Incorporated",
        faction: {
            requirements: {
                reputation: 200000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SECURITY_POSITIONS,
        ],
        location: "Volhaven",
    },
    {
        name: "Bachman & Associates",
        faction: {
            requirements: {
                reputation: 200000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SECURITY_POSITIONS,
        ],
        location: "Aevum",
    },
    {
        name: "Clarke Incorporated",
        faction: {
            requirements: {
                reputation: 200000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SECURITY_POSITIONS,
        ],
        location: "Aevum",
    },
    {
        name: "Fulcrum Secret Technologies",
        faction: {
            requirements: {
                backdoor: "fulcrumassets",
                reputation: 250000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
        positions: [...TECHNOLOGY_POSITIONS, ...BUSINESS_POSITIONS],
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
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
        ],
    },
    {
        name: "DefComm",
        location: "New Tokyo",
        positions: [...TECHNOLOGY_POSITIONS, ...SOFTWARE_CONSULTANT_POSITIONS],
    },
    {
        name: "Helios Labs",
        location: "Volhaven",
        positions: [...TECHNOLOGY_POSITIONS, ...SOFTWARE_CONSULTANT_POSITIONS],
    },
    {
        name: "VitaLife",
        location: "New Tokyo",
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
            ...BUSINESS_POSITIONS,
        ],
    },
    {
        name: "Icarus Microsystems",
        location: "Sector-12",
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
            ...BUSINESS_POSITIONS,
        ],
    },
    {
        name: "Universal Energy",
        location: "Sector-12",
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
            ...BUSINESS_POSITIONS,
        ],
    },
    {
        name: "Galactic Cybersystems",
        location: "Aevum",
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
            ...BUSINESS_POSITIONS,
        ],
    },
    {
        name: "AeroCorp",
        location: "Aevum",
        positions: [...TECHNOLOGY_POSITIONS, ...SECURITY_POSITIONS],
    },
    {
        name: "Omnia Cybersystems",
        location: "Volhaven",
        positions: [...TECHNOLOGY_POSITIONS, ...SECURITY_POSITIONS],
    },
    {
        name: "Solaris Space Systems",
        location: "Chongqing",
        positions: [...TECHNOLOGY_POSITIONS, ...SECURITY_POSITIONS],
    },
    {
        name: "Delta One",
        location: "Sector-12",
        positions: [...TECHNOLOGY_POSITIONS, ...SECURITY_POSITIONS],
    },
    {
        name: "Global Pharmaceuticals",
        location: "New Tokyo",
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...SECURITY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
        ],
    },
    {
        name: "Nova Medical",
        location: "Ishima",
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...SECURITY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
        ],
    },
    {
        name: "CIA",
        location: "Sector-12",
        positions: [
            "software",
            "network engineer",
            ...IT_POSITIONS,
            ...SECURITY_POSITIONS,
            ...AGENT_POSITIONS,
        ],
    },
    {
        name: "NSA",
        location: "Sector-12",
        positions: [
            "software",
            "network engineer",
            ...IT_POSITIONS,
            ...SECURITY_POSITIONS,
            ...AGENT_POSITIONS,
        ],
    },
    {
        name: "Watchdog Security",
        location: "New Tokyo",
        positions: [
            "software",
            "network engineer",
            ...IT_POSITIONS,
            ...SECURITY_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
        ],
    },
    {
        name: "LexoCorp",
        location: "Volhaven",
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...SECURITY_POSITIONS,
            ...BUSINESS_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
        ],
    },
    {
        name: "Rho Construction",
        location: "Aevum",
        positions: ["software", ...BUSINESS_POSITIONS],
    },
    {
        name: "Alpha Enterprises",
        location: "Sector-12",
        positions: [
            "software",
            ...BUSINESS_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
        ],
    },
    {
        name: "Aevum Police Headquarters",
        location: "Aevum",
        positions: ["software", ...SECURITY_POSITIONS],
    },
    {
        name: "SysCore Securities",
        location: "Volhaven",
        positions: [...TECHNOLOGY_POSITIONS],
    },
    {
        name: "CompuTek",
        location: "Volhaven",
        positions: [...TECHNOLOGY_POSITIONS],
    },
    {
        name: "NetLink Technologies",
        location: "Aevum",
        positions: [...TECHNOLOGY_POSITIONS],
    },
    {
        name: "Carmichael Security",
        location: "Sector-12",
        positions: [
            ...TECHNOLOGY_POSITIONS,
            ...SECURITY_POSITIONS,
            ...SOFTWARE_CONSULTANT_POSITIONS,
            ...AGENT_POSITIONS,
        ],
    },
    {
        name: "FoodNStuff",
        location: "Sector-12",
        positions: ["employee", "part-time employee"],
    },
    {
        name: "Joe's Guns",
        location: "Sector-12",
        positions: ["employee", "part-time employee"],
    },
    {
        name: "Omega Software",
        location: "Ishima",
        positions: [
            "software",
            ...SOFTWARE_CONSULTANT_POSITIONS,
            ...IT_POSITIONS,
        ],
    },
    {
        name: "Noodle Bar",
        location: "New Tokyo",
        positions: ["waiter", "part-time waiter"],
    },

    ...MEGACORPS,
];

/**
 * All companies, as an object.
 */
export const COMPANIES_OBJ: { [key: string]: ICompany } = COMPANIES.reduce(
    (a, v) => ({ ...a, [v.name]: v }),
    {}
);
