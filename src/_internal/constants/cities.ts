import { GetAugmentedList } from "/_internal/constants/augmentations.js";
import { ICity } from "/_internal/interfaces/city.js";

/**
 * All cities in the game.
 */
export const CITIES: ICity[] = GetAugmentedList([
    {
        name: "Sector-12",
        enemies: ["Chongqing", "Ishima", "New Tokyo", "Volhaven"],
        faction: {
            augmentations: [],
            requirements: {
                location: ["Sector-12"],
                money: 15000000,
            },
        },
    },
    {
        name: "Chongqing",
        enemies: ["Aevum", "Sector-12", "Volhaven"],
        faction: {
            augmentations: [],
            requirements: {
                location: ["Chongqing"],
                money: 20000000,
            },
        },
    },
    {
        name: "New Tokyo",
        enemies: ["Aevum", "Sector-12", "Volhaven"],
        faction: {
            augmentations: [],
            requirements: {
                location: ["New Tokyo"],
                money: 20000000,
            },
        },
    },
    {
        name: "Ishima",
        enemies: ["Aevum", "Sector-12", "Volhaven"],
        faction: {
            augmentations: [],
            requirements: {
                location: ["Ishima"],
                money: 30000000,
            },
        },
    },
    {
        name: "Aevum",
        enemies: ["Chongqing", "Ishima", "New Tokyo", "Volhaven"],
        faction: {
            augmentations: [],
            requirements: {
                location: ["Aevum"],
                money: 40000000,
            },
        },
    },
    {
        name: "Volhaven",
        enemies: ["Aevum", "Chongqing", "Ishima", "New Tokyo", "Sector-12"],
        faction: {
            augmentations: [],
            requirements: {
                location: ["Volhaven"],
                money: 50000000,
            },
        },
    },
]);

/**
 * All cities, as an object.
 */
export const CITIES_OBJ: { [key: string]: ICity } = CITIES.reduce(
    (a, v) => ({ ...a, [v.name]: v }),
    {}
);
