import { City } from "/helpers/sf4/_interfaces.js";

/**
 * All cities in the game.
 */
export const CITIES: City[] = [
    {
        name: "Sector-12",
        enemies: ["Chongqing", "New Tokyo", "Ishima", "Volhaven"],
        faction: {
            requirements: {
                money: 15000000,
                location: ["Sector-12"],
            },
            augmentations: [
                "Augmented Targeting I",
                "Augmented Targeting II",
                "CashRoot Starter Kit",
                "Neuralstimulator",
                "Speech Processor Implant",
                "Wired Reflexes",
            ],
        },
    },
    {
        name: "Chongqing",
        enemies: ["Sector-12", "Aevum", "Volhaven"],
        faction: {
            requirements: {
                money: 20000000,
                location: ["Chongqing"],
            },
            augmentations: [
                "DataJack",
                "Neuralstimulator",
                "Neuregen Gene Modification",
                "Nuoptimal Nootropic Injector Implant",
                "Speech Processor Implant",
            ],
        },
    },
    {
        name: "New Tokyo",
        enemies: ["Sector-12", "Aevum", "Volhaven"],
        faction: {
            requirements: {
                money: 20000000,
                location: ["New Tokyo"],
            },
            augmentations: [
                "DataJack",
                "Neuralstimulator",
                "Nuoptimal Nootropic Injector Implant",
                "NutriGen Implant",
                "Speech Processor Implant",
            ],
        },
    },
    {
        name: "Ishima",
        enemies: ["Sector-12", "Aevum", "Volhaven"],
        faction: {
            requirements: {
                money: 30000000,
                location: ["Ishima"],
            },
            augmentations: [
                "Augmented Targeting I",
                "Combat Rib I",
                "INFRARET Enhancement",
                "Neuralstimulator",
                "Nuoptimal Nootropic Injector Implant",
                "Speech Processor Implant",
                "Wired Reflexes",
            ],
        },
    },
    {
        name: "Aevum",
        enemies: ["Chongqing", "New Tokyo", "Ishima", "Volhaven"],
        faction: {
            requirements: {
                money: 40000000,
                location: ["Aevum"],
            },
            augmentations: [
                "Neuralstimulator",
                "Neurotrainer I",
                "PCMatrix",
                "Speech Processor Implant",
                "Synaptic Enhancement Implant",
                "Wired Reflexes",
            ],
        },
    },
    {
        name: "Volhaven",
        enemies: ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima"],
        faction: {
            requirements: {
                money: 50000000,
                location: ["Volhaven"],
            },
            augmentations: [
                "Combat Rib I",
                "Combat Rib II",
                "DermaForce Particle Barrier",
                "Neuralstimulator",
                "Nuoptimal Nootropic Injector Implant",
                "Speech Processor Implant",
                "Wired Reflexes",
            ],
        },
    },
];

/**
 * All cities, as an object.
 */
export const CITIES_OBJ: { [key: string]: City } = CITIES.reduce(
    (a, v) => ({ ...a, [v.name]: v }),
    {}
);
