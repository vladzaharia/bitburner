import { ICity } from "/_internal/interfaces/city.js";

/**
 * All cities in the game.
 */
export const CITIES: ICity[] = [
    {
        name: "Sector-12",
        rivals: ["Chongqing", "Ishima", "New Tokyo", "Volhaven"],
        faction: {
            requirements: {
                location: ["Sector-12"],
                money: 15000000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
    },
    {
        name: "Chongqing",
        rivals: ["Aevum", "Sector-12", "Volhaven"],
        faction: {
            requirements: {
                location: ["Chongqing"],
                money: 20000000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
    },
    {
        name: "New Tokyo",
        rivals: ["Aevum", "Sector-12", "Volhaven"],
        faction: {
            requirements: {
                location: ["New Tokyo"],
                money: 20000000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
    },
    {
        name: "Ishima",
        rivals: ["Aevum", "Sector-12", "Volhaven"],
        faction: {
            requirements: {
                location: ["Ishima"],
                money: 30000000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
    },
    {
        name: "Aevum",
        rivals: ["Chongqing", "Ishima", "New Tokyo", "Volhaven"],
        faction: {
            requirements: {
                location: ["Aevum"],
                money: 40000000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
    },
    {
        name: "Volhaven",
        rivals: ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12"],
        faction: {
            requirements: {
                location: ["Volhaven"],
                money: 50000000,
            },
            workOffered: ["Hacking", "Field", "Security"],
        },
    },
];

/**
 * All cities, as an object.
 */
export const CITIES_OBJ: { [key: string]: ICity } = CITIES.reduce(
    (a, v) => ({ ...a, [v.name]: v }),
    {}
);
