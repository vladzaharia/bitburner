import { City } from "/helpers/sf4/_interfaces.js";

/**
 * All cities in the game.
 */
export const CITIES: City[] = [
    {
        name: "Sector-12",
        enemies: ["Chongqing", "New Tokyo", "Ishima", "Volhaven"],
        money: 15000000,
        augmentations: [
            "Augmented Targeting I",
            "Augmented Targeting II",
            "CashRoot Starter Kit",
            "Combat Rib I",
            "Combat Rib II",
            "Neuralstimulator",
            "Speech Processor Implant",
            "Wired Reflexes",
        ],
    },
    {
        name: "Chongqing",
        enemies: ["Sector-12", "Aevum", "Volhaven"],
        money: 20000000,
        augmentations: [
            "DataJack",
            "Neuralstimulator",
            "Neuregen Gene Modification",
            "Nuoptimal Nootropic Injector Implant",
            "Speech Processor Implant",
        ],
    },
    {
        name: "New Tokyo",
        enemies: ["Sector-12", "Aevum", "Volhaven"],
        money: 20000000,
        augmentations: [
            "DataJack",
            "Neuralstimulator",
            "Nuoptimal Nootropic Injector Implant",
            "NutriGen Implant",
            "Speech Processor Implant",
        ],
    },
    {
        name: "Ishima",
        enemies: ["Sector-12", "Aevum", "Volhaven"],
        money: 30000000,
        augmentations: [
            "Augmented Targeting I",
            "Augmented Targeting II",
            "Combat Rib I",
            "Combat Rib II",
            "INFRARET Enhancement",
            "Neuralstimulator",
            "Nuoptimal Nootropic Injector Implant",
            "Speech Processor Implant",
            "Wired Reflexes",
        ],
    },
    {
        name: "Aevum",
        enemies: ["Chongqing", "New Tokyo", "Ishima", "Volhaven"],
        money: 40000000,
        augmentations: [
            "Neuralstimulator",
            "Speech Processor Implant",
            "Wired Reflexes",
        ],
    },
    {
        name: "Volhaven",
        enemies: ["Sector-12", "Aevum", "Chongqing", "New Tokyo", "Ishima"],
        money: 50000000,
        augmentations: [
            "Augmented Targeting I",
            "Augmented Targeting II",
            "Combat Rib I",
            "Combat Rib II",
            "DermaForce Particle Barrier",
            "Neuralstimulator",
            "Nuoptimal Nootropic Injector Implant",
            "Speech Processor Implant",
            "TITN-41 Gene-Modification Injection",
        ],
    },
];

/**
 * All cities, as an object.
 */
export const CITIES_OBJ: { [key: string]: City } = CITIES.reduce(
    (a, v) => ({ ...a, [v.name]: v }),
    {}
);
