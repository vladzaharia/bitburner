import { Cities } from "/helpers/sf4/_types.js";

/**
 * All cities in the game.
 */
export const CITIES: City[] = [
    {
        name: "Sector-12",
        enemies: ["Chongqing", "New Tokyo", "Ishima", "Volhaven"],
        money: 15000000,
    },
    {
        name: "Chongqing",
        enemies: ["Sector-12", "Aevum", "Volhaven"],
        money: 20000000,
    },
    {
        name: "New Tokyo",
        enemies: ["Sector-12", "Aevum", "Volhaven"],
        money: 20000000,
    },
    {
        name: "Ishima",
        enemies: ["Sector-12", "Aevum", "Volhaven"],
        money: 30000000,
    },
    {
        name: "Aevum",
        enemies: ["Chongqing", "New Tokyo", "Ishima", "Volhaven"],
        money: 40000000,
    },
    {
        name: "Volhaven",
        enemies: ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima"],
        money: 50000000,
    },
];

/**
 * A city in Bitburner.
 * @interface
 */
export interface City {
    /**
     * The name of the city.
     * @argument {string}
     */
    name: Cities;

    /**
     * The enemies this city has.
     * @argument {string[]}
     */
    enemies: Cities[];

    /**
     * The money required to gain this city's faction invitation.
     * @argument {number}
     */
    money: number;
}
