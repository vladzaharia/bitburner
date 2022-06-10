import { ICity } from "/_internal/interfaces/city.js";

/**
 * All cities in the game.
 */
export const CITIES: ICity[] = [
    {
        name: "Sector-12",
        enemies: ["Chongqing", "Ishima", "New Tokyo", "Volhaven"],
        faction: {
            augmentations: [
                "Augmented Targeting I",
                "Augmented Targeting II",
                "CashRoot Starter Kit",
                "Neuralstimulator",
                "Speech Processor Implant",
                "Wired Reflexes",
            ],
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
            augmentations: [
                "DataJack",
                "Neuralstimulator",
                "Neuregen Gene Modification",
                "Nuoptimal Nootropic Injector Implant",
                "Speech Processor Implant",
            ],
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
            augmentations: [
                "DataJack",
                "Neuralstimulator",
                "Nuoptimal Nootropic Injector Implant",
                "NutriGen Implant",
                "Speech Processor Implant",
            ],
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
            augmentations: [
                "Augmented Targeting I",
                "Combat Rib I",
                "INFRARET Enhancement",
                "Neuralstimulator",
                "Nuoptimal Nootropic Injector Implant",
                "Speech Processor Implant",
                "Wired Reflexes",
            ],
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
            augmentations: [
                "Neuralstimulator",
                "Neurotrainer I",
                "PCMatrix",
                "Speech Processor Implant",
                "Synaptic Enhancement Implant",
                "Wired Reflexes",
            ],
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
            augmentations: [
                "Combat Rib I",
                "Combat Rib II",
                "DermaForce Particle Barrier",
                "Neuralstimulator",
                "Nuoptimal Nootropic Injector Implant",
                "Speech Processor Implant",
                "Wired Reflexes",
            ],
            requirements: {
                location: ["Volhaven"],
                money: 50000000,
            },
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
