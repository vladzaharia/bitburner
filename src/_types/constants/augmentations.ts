import { Augmentation } from "/_types/interfaces/augmentation.js";

/**
 * All augmentations in the game.
 */
export const AUGMENTATIONS: Augmentation[] = [
    {
        name: "ADR-V1 Pheromone Gene",
        factions: [
            "MegaCorp",
            "NWO",
            "Four Sigma",
            "The Syndicate",
            "Tian Di Hui",
        ],
        requirements: {
            money: 17500000,
            reputation: 3750,
        },
        benefits: {
            work: {
                company: 1.1,
                faction: 1.1,
            },
        },
    },
    {
        name: "ADR-V2 Pheromone Gene",
        factions: [
            "Bachman & Associates",
            "Clarke Incorporated",
            "Four Sigma",
            "Silhouette",
        ],
        requirements: {
            money: 550000000,
            reputation: 62500,
        },
        benefits: {
            work: {
                company: 1.2,
                faction: 1.2,
            },
        },
    },
    {
        name: "Artificial Bio-neural Network Implant",
        factions: ["Fulcrum Technologies", "BitRunners"],
        requirements: {
            money: 3000000000,
            reputation: 275000,
        },
        benefits: {
            hack: {
                money: 1.15,
                speed: 1.03,
                skill: 1.12,
            },
        },
    },
    {
        name: "Artificial Synaptic Potentiation",
        factions: ["The Black Hand", "NiteSec"],
        requirements: {
            money: 80000000,
            reputation: 6250,
        },
        benefits: {
            hack: {
                chance: 1.05,
                exp: 1.05,
                speed: 1.02,
            },
        },
    },
    {
        name: "Augmented Targeting I",
        factions: [
            "Blade Industries",
            "OmniTek Incorporated",
            "KuaiGong International",
            "Ishima",
            "Sector-12",
            "Volhaven",
            "The Dark Army",
            "The Syndicate",
            "Slum Snakes",
        ],
        requirements: {
            money: 15000000,
            reputation: 5000,
        },
        benefits: {
            dex: {
                skill: 1.1,
            },
        },
    },
    {
        name: "Augmented Targeting II",
        factions: [
            "Blade Industries",
            "OmniTek Incorporated",
            "KuaiGong International",
            "Ishima",
            "Sector-12",
            "Volhaven",
            "The Dark Army",
            "The Syndicate",
        ],
        requirements: {
            money: 42500000,
            reputation: 8750,
        },
        benefits: {
            dex: {
                skill: 1.2,
            },
        },
    },
    {
        name: "Augmented Targeting III",
        factions: [
            "The Covenant",
            "Blade Industries",
            "OmniTek Incorporated",
            "KuaiGong International",
            "The Dark Army",
            "The Syndicate",
        ],
        requirements: {
            money: 115000000,
            reputation: 27500,
        },
        benefits: {
            dex: {
                skill: 1.3,
            },
        },
    },
    {
        name: "Bionic Arms",
        factions: ["Tetrads"],
        requirements: {
            money: 275000000,
            reputation: 62500,
        },
        benefits: {
            str: {
                skill: 1.3,
            },
            dex: {
                skill: 1.3,
            },
        },
    },
    {
        name: "Bionic Legs",
        factions: [
            "Blade Industries",
            "OmniTek Incorporated",
            "KuaiGong International",
            "Speakers for the Dead",
            "The Syndicate",
        ],
        requirements: {
            money: 375000000,
            reputation: 150000,
        },
        benefits: {
            agi: {
                skill: 1.6,
            },
        },
    },
    {
        name: "Bionic Spine",
        factions: [
            "Blade Industries",
            "OmniTek Incorporated",
            "KuaiGong International",
            "Speakers for the Dead",
            "The Syndicate",
        ],
        requirements: {
            money: 125000000,
            reputation: 45000,
        },
        benefits: {
            str: {
                skill: 1.15,
            },
            def: {
                skill: 1.15,
            },
            dex: {
                skill: 1.15,
            },
            agi: {
                skill: 1.15,
            },
        },
    },
    {
        name: "BitRunners Neurolink",
        factions: ["BitRunners"],
        requirements: {
            money: 4375000000,
            reputation: 875000,
        },
        benefits: {
            hack: {
                chance: 1.1,
                exp: 1.2,
                skill: 1.15,
                speed: 1.05,
            },
        },
    },
    {
        name: "BitWire",
        factions: ["NiteSec", "CyberSec"],
        requirements: {
            money: 10000000,
            reputation: 3750,
        },
        benefits: {
            hack: {
                skill: 1.05,
            },
        },
    },
    {
        name: "BrachiBlades",
        factions: ["The Syndicate"],
        requirements: {
            money: 90000000,
            reputation: 12500,
        },
        benefits: {
            str: {
                skill: 1.15,
            },
            def: {
                skill: 1.15,
            },
            crime: {
                money: 1.15,
                success: 1.1,
            },
        },
    },
    {
        name: "CashRoot Starter Kit",
        factions: ["Sector-12"],
        requirements: {
            money: 125000000,
            reputation: 12500,
        },
        benefits: {
            programs: ["BruteSSH.exe"],
        },
    },
    {
        name: "Combat Rib I",
        factions: [
            "Blade Industries",
            "OmniTek Incorporated",
            "KuaiGong International",
            "Ishima",
            "Sector-12",
            "Volhaven",
            "The Dark Army",
            "The Syndicate",
            "Slum Snakes",
        ],
        requirements: {
            money: 23750000,
            reputation: 7500,
        },
        benefits: {
            str: {
                skill: 1.1,
            },
            def: {
                skill: 1.1,
            },
        },
    },
    {
        name: "Combat Rib II",
        factions: [
            "Blade Industries",
            "OmniTek Incorporated",
            "KuaiGong International",
            "Ishima",
            "Sector-12",
            "Volhaven",
            "The Dark Army",
            "The Syndicate",
        ],
        requirements: {
            money: 65000000,
            reputation: 18750,
        },
        benefits: {
            str: {
                skill: 1.14,
            },
            def: {
                skill: 1.14,
            },
        },
    },
    {
        name: "Combat Rib III",
        factions: [
            "The Covenant",
            "Blade Industries",
            "OmniTek Incorporated",
            "KuaiGong International",
            "The Dark Army",
            "The Syndicate",
        ],
        requirements: {
            money: 120000000,
            reputation: 35000,
        },
        benefits: {
            str: {
                skill: 1.18,
            },
            def: {
                skill: 1.18,
            },
        },
    },
    {
        name: "CordiARC Fusion Reactor",
        factions: ["MegaCorp"],
        requirements: {
            money: 5000000000,
            reputation: 1125000,
        },
        benefits: {
            str: {
                skill: 1.35,
                exp: 1.35,
            },
            def: {
                skill: 1.35,
                exp: 1.35,
            },
            agi: {
                skill: 1.35,
                exp: 1.35,
            },
            dex: {
                skill: 1.35,
                exp: 1.35,
            },
        },
    },
    {
        name: "Cranial Signal Processors - Gen I",
        factions: ["CyberSec"],
        requirements: {
            money: 70000000,
            reputation: 10000,
        },
        benefits: {
            hack: {
                skill: 1.05,
                speed: 1.01,
            },
        },
    },
    {
        name: "Cranial Signal Processors - Gen II",
        factions: ["NiteSec", "CyberSec"],
        requirements: {
            money: 125000000,
            reputation: 18750,
        },
        benefits: {
            hack: {
                chance: 1.05,
                skill: 1.07,
                speed: 1.02,
            },
        },
    },
    {
        name: "Cranial Signal Processors - Gen III",
        factions: ["BitRunners", "The Black Hand", "NiteSec"],
        requirements: {
            money: 550000000,
            reputation: 50000,
        },
        benefits: {
            hack: {
                chance: 1.15,
                skill: 1.09,
                speed: 1.02,
            },
        },
    },
    {
        name: "Cranial Signal Processors - Gen IV",
        factions: ["BitRunners", "The Black Hand"],
        requirements: {
            money: 1100000000,
            reputation: 125000,
        },
        benefits: {
            hack: {
                chance: 1.25,
                skill: 1.2,
                speed: 1.02,
            },
        },
    },
    {
        name: "Cranial Signal Processors - Gen V",
        factions: ["BitRunners"],
        requirements: {
            money: 2250000000,
            reputation: 250000,
        },
        benefits: {
            hack: {
                chance: 1.75,
                skill: 1.25,
                speed: 1.3,
            },
        },
    },
    {
        name: "CRTX42-AA Gene Modification",
        factions: ["NiteSec"],
        requirements: {
            money: 225000000,
            reputation: 45000,
        },
        benefits: {
            hack: {
                exp: 1.15,
                skill: 1.08,
            },
        },
    },
    {
        name: "DataJack",
        factions: [
            "BitRunners",
            "The Black Hand",
            "NiteSec",
            "Chongqing",
            "New Tokyo",
        ],
        requirements: {
            money: 450000000,
            reputation: 112500,
        },
        benefits: {
            hack: {
                money: 1.25,
            },
        },
    },
    {
        name: "DermaForce Particle Barrier",
        factions: ["Volhaven"],
        requirements: {
            money: 50000000,
            reputation: 15000,
        },
        benefits: {
            def: {
                skill: 1.4,
            },
        },
    },
    {
        name: "ECorp HVMind Implant",
        factions: ["ECorp"],
        requirements: {
            money: 5500000000,
            reputation: 1500000,
        },
        benefits: {
            hack: {
                grow: 3,
            },
        },
    },
    {
        name: "Embedded Netburner Module",
        factions: [
            "ECorp",
            "MegaCorp",
            "Blade Industries",
            "NWO",
            "Fulcrum Technologies",
            "BitRunners",
            "The Black Hand",
            "NiteSec",
        ],
        requirements: {
            money: 250000000,
            reputation: 15000,
        },
        benefits: {
            hack: {
                skill: 1.08,
            },
        },
    },
    {
        name: "Embedded Netburner Module Analyze Engine",
        factions: [
            "Illuminati",
            "Daedalus",
            "The Covenant",
            "ECorp",
            "MegaCorp",
            "NWO",
            "Fulcrum Technologies",
        ],
        requirements: {
            money: 6000000000,
            reputation: 625000,
        },
        benefits: {
            hack: {
                speed: 1.1,
            },
        },
    },
    {
        name: "Embedded Netburner Module Core Implant",
        factions: [
            "ECorp",
            "MegaCorp",
            "Blade Industries",
            "NWO",
            "Fulcrum Technologies",
            "BitRunners",
            "The Black Hand",
        ],
        requirements: {
            money: 2500000000,
            reputation: 250000,
        },
        benefits: {
            hack: {
                chance: 1.03,
                exp: 1.07,
                money: 1.1,
                skill: 1.07,
                speed: 1.03,
            },
        },
    },
    {
        name: "Embedded Netburner Module Core V2 Upgrade",
        factions: [
            "ECorp",
            "MegaCorp",
            "Blade Industries",
            "NWO",
            "OmniTek Incorporated",
            "KuaiGong International",
            "Fulcrum Technologies",
            "BitRunners",
        ],
        requirements: {
            money: 4500000000,
            reputation: 1000000,
        },
        benefits: {
            hack: {
                chance: 1.05,
                exp: 1.15,
                money: 1.3,
                skill: 1.08,
                speed: 1.05,
            },
        },
    },
    {
        name: "Embedded Netburner Module Core V3 Upgrade",
        factions: [
            "Illuminati",
            "Daedalus",
            "The Covenant",
            "ECorp",
            "MegaCorp",
            "NWO",
            "Fulcrum Technologies",
        ],
        requirements: {
            money: 7500000000,
            reputation: 1750000,
        },
        benefits: {
            hack: {
                chance: 1.1,
                exp: 1.25,
                money: 1.4,
                skill: 1.1,
                speed: 1.05,
            },
        },
    },
    {
        name: "Embedded Netburner Module Direct Memory Access Upgrade",
        factions: [
            "Illuminati",
            "Daedalus",
            "The Covenant",
            "ECorp",
            "MegaCorp",
            "NWO",
            "Fulcrum Technologies",
        ],
        requirements: {
            money: 7000000000,
            reputation: 1000000,
        },
        benefits: {
            hack: {
                chance: 1.2,
                money: 1.4,
            },
        },
    },
    {
        name: "Enhanced Myelin Sheathing",
        factions: ["Fulcrum Technologies", "BitRunners", "The Black Hand"],
        requirements: {
            money: 1375000000,
            reputation: 100000,
        },
        benefits: {
            hack: {
                exp: 1.1,
                skill: 1.08,
                speed: 1.03,
            },
        },
    },
    {
        name: "Enhanced Social Interaction Implant",
        factions: [
            "Bachman & Associates",
            "NWO",
            "Clarke Incorporated",
            "OmniTek Incorporated",
            "Four Sigma",
        ],
        requirements: {
            money: 1375000000,
            reputation: 375000,
        },
        benefits: {
            cha: {
                exp: 1.6,
                skill: 1.6,
            },
        },
    },
    {
        name: "FocusWire",
        factions: [
            "Bachman & Associates",
            "Clarke Incorporated",
            "Four Sigma",
            "KuaiGong International",
        ],
        requirements: {
            money: 900000000,
            reputation: 75000,
        },
        benefits: {
            hack: {
                exp: 1.05,
            },
            str: {
                exp: 1.05,
            },
            def: {
                exp: 1.05,
            },
            agi: {
                exp: 1.05,
            },
            dex: {
                exp: 1.05,
            },
            cha: {
                exp: 1.05,
            },
            work: {
                company: 1.1,
                money: 1.2,
            },
        },
    },
    {
        name: "Graphene Bionic Arms Upgrade",
        factions: ["The Dark Army"],
        requirements: {
            money: 3750000000,
            reputation: 500000,
        },
        benefits: {
            str: {
                skill: 1.85,
            },
            dex: {
                skill: 1.85,
            },
        },
    },
    {
        name: "Graphene Bionic Legs Upgrade",
        factions: ["ECorp", "MegaCorp", "Fulcrum Technologies"],
        requirements: {
            money: 4500000000,
            reputation: 750000,
        },
        benefits: {
            agi: {
                skill: 2.5,
            },
        },
    },
    {
        name: "Graphene Bionic Spine Upgrade",
        factions: ["ECorp", "Fulcrum Technologies"],
        requirements: {
            money: 6000000000,
            reputation: 1625000,
        },
        benefits: {
            str: {
                skill: 1.6,
            },
            def: {
                skill: 1.6,
            },
            dex: {
                skill: 1.6,
            },
            agi: {
                skill: 1.6,
            },
        },
    },
    {
        name: "Graphene Bone Lacings",
        factions: ["The Covenant", "Fulcrum Technologies"],
        requirements: {
            money: 4250000000,
            reputation: 1125000,
        },
        benefits: {
            str: {
                skill: 1.7,
            },
            def: {
                skill: 1.7,
            },
        },
    },
    {
        name: "Graphene BranchiBlades Upgrade",
        factions: ["Speakers for the Dead"],
        requirements: {
            money: 2500000000,
            reputation: 225000,
        },
        benefits: {
            str: {
                skill: 1.4,
            },
            def: {
                skill: 1.4,
            },
            crime: {
                money: 1.3,
                success: 1.1,
            },
        },
    },
    {
        name: "Hacknet Node Cache Architecture Neural-Upload",
        factions: ["Netburners"],
        requirements: {
            money: 5500000,
            reputation: 2500,
        },
        benefits: {
            hacknet: {
                money: 1.1,
                levelCost: 0.85,
            },
        },
    },
    {
        name: "Hacknet Node Core Direct-Neural Interface",
        factions: ["Netburners"],
        requirements: {
            money: 60000000,
            reputation: 12500,
        },
        benefits: {
            hacknet: {
                money: 1.45,
            },
        },
    },
    {
        name: "Hacknet Node CPU Architecture Neural-Upload",
        factions: ["Netburners"],
        requirements: {
            money: 11000000,
            reputation: 3750,
        },
        benefits: {
            hacknet: {
                money: 1.15,
                cost: 0.85,
            },
        },
    },
    {
        name: "Hacknet Node Kernel Direct-Neural Interface",
        factions: ["Netburners"],
        requirements: {
            money: 40000000,
            reputation: 7500,
        },
        benefits: {
            hacknet: {
                money: 1.25,
            },
        },
    },
    {
        name: "Hacknet Node NIC Architecture Neural-Upload",
        factions: ["Netburners"],
        requirements: {
            money: 4500000,
            reputation: 1875,
        },
        benefits: {
            hacknet: {
                money: 1.1,
                cost: 0.9,
            },
        },
    },
    {
        name: "HemoRecirculator",
        factions: ["The Dark Army", "The Syndicate", "Tetrads"],
        requirements: {
            money: 45000000,
            reputation: 10000,
        },
        benefits: {
            str: {
                skill: 1.08,
            },
            def: {
                skill: 1.08,
            },
            agi: {
                skill: 1.08,
            },
            dex: {
                skill: 1.08,
            },
        },
    },
    {
        name: "HyperSight Corneal Implant",
        factions: ["Blade Industries", "KuaiGong International"],
        requirements: {
            money: 2750000000,
            reputation: 150000,
        },
        benefits: {
            dex: {
                skill: 1.4,
            },
            hack: {
                money: 1.1,
                speed: 1.03,
            },
        },
    },
    {
        name: "INFRARET Enhancement",
        factions: ["Ishima"],
        requirements: {
            money: 30000000,
            reputation: 7500,
        },
        benefits: {
            dex: {
                skill: 1.1,
            },
            crime: {
                money: 1.1,
                success: 1.25,
            },
        },
    },
    {
        name: "LuminCloaking-V1 Skin Implant",
        factions: ["Ishima"],
        requirements: {
            money: 5000000,
            reputation: 1500,
        },
        benefits: {
            agi: {
                skill: 1.05,
            },
            crime: {
                money: 1.1,
            },
        },
    },
    {
        name: "LuminCloaking-V2 Skin Implant",
        factions: ["Tetrads", "Slum Snakes"],
        requirements: {
            money: 30000000,
            reputation: 5000,
        },
        benefits: {
            def: {
                skill: 1.1,
            },
            agi: {
                skill: 1.1,
            },
            crime: {
                money: 1.25,
            },
        },
    },
    {
        name: "Nanofiber Weave",
        factions: [
            "Blade Industries",
            "OmniTek Incorporated",
            "Fulcrum Technologies",
            "Speakers for the Dead",
            "The Dark Army",
            "The Syndicate",
            "Tian Di Hui",
        ],
        requirements: {
            money: 125000000,
            reputation: 37500,
        },
        benefits: {
            str: {
                skill: 1.2,
            },
            def: {
                skill: 1.2,
            },
        },
    },
    {
        name: "NEMEAN Subdermal Weave",
        factions: [
            "Illuminati",
            "Daedalus",
            "The Covenant",
            "Fulcrum Technologies",
            "The Syndicate",
        ],
        requirements: {
            money: 3250000000,
            reputation: 875000,
        },
        benefits: {
            def: {
                skill: 2.2,
            },
        },
    },
    {
        name: "Neotra",
        factions: ["Blade Industries"],
        requirements: {
            money: 2875000000,
            reputation: 562500,
        },
        benefits: {
            str: {
                skill: 1.55,
            },
            def: {
                skill: 1.55,
            },
        },
    },
    {
        name: "Neural Accelerator",
        factions: ["BitRunners"],
        requirements: {
            money: 1750000000,
            reputation: 200000,
        },
        benefits: {
            hack: {
                exp: 1.15,
                money: 1.2,
                skill: 1.1,
            },
        },
    },
    {
        name: "Neural-Retention Enhancement",
        factions: ["NiteSec"],
        requirements: {
            money: 250000000,
            reputation: 20000,
        },
        benefits: {
            hack: {
                exp: 1.25,
            },
        },
    },
    {
        name: "Neuralstimulator",
        factions: [
            "Bachman & Associates",
            "Clarke Incorporated",
            "Four Sigma",
            "The Black Hand",
            "Aevum",
            "Chongqing",
            "Ishima",
            "New Tokyo",
            "Sector-12",
            "Volhaven",
        ],
        requirements: {
            money: 3000000000,
            reputation: 50000,
        },
        benefits: {
            hack: {
                chance: 1.1,
                exp: 1.12,
                speed: 1.02,
            },
        },
    },
    {
        name: "Neuregen Gene Modification",
        factions: ["Chongqing"],
        requirements: {
            money: 375000000,
            reputation: 37500,
        },
        benefits: {
            hack: {
                exp: 1.4,
            },
        },
    },
    {
        name: "Neuronal Densification",
        factions: ["Clarke Incorporated"],
        requirements: {
            money: 1375000000,
            reputation: 187500,
        },
        benefits: {
            hack: {
                speed: 1.03,
                exp: 1.1,
                skill: 1.15,
            },
        },
    },
    {
        name: "Neurotrainer I",
        factions: ["CyberSec"],
        requirements: {
            money: 4000000,
            reputation: 1000,
        },
        benefits: {
            str: {
                exp: 1.1,
            },
            def: {
                exp: 1.1,
            },
            dex: {
                exp: 1.1,
            },
            agi: {
                exp: 1.1,
            },
            cha: {
                exp: 1.1,
            },
            hack: {
                exp: 1.1,
            },
        },
    },
    {
        name: "Neurotrainer II",
        factions: ["BitRunners", "NiteSec"],
        requirements: {
            money: 45000000,
            reputation: 10000,
        },
        benefits: {
            str: {
                exp: 1.15,
            },
            def: {
                exp: 1.15,
            },
            dex: {
                exp: 1.15,
            },
            agi: {
                exp: 1.15,
            },
            cha: {
                exp: 1.15,
            },
            hack: {
                exp: 1.15,
            },
        },
    },
    {
        name: "Neurotrainer III",
        factions: ["NWO", "Four Sigma"],
        requirements: {
            money: 130000000,
            reputation: 25000,
        },
        benefits: {
            str: {
                exp: 1.2,
            },
            def: {
                exp: 1.2,
            },
            dex: {
                exp: 1.2,
            },
            agi: {
                exp: 1.2,
            },
            cha: {
                exp: 1.2,
            },
            hack: {
                exp: 1.2,
            },
        },
    },
    {
        name: "nextSENS Gene Modification",
        factions: ["Clarke Incorporated"],
        requirements: {
            money: 1925000000,
            reputation: 437500,
        },
        benefits: {
            str: {
                skill: 1.2,
            },
            def: {
                skill: 1.2,
            },
            dex: {
                skill: 1.2,
            },
            agi: {
                skill: 1.2,
            },
            cha: {
                skill: 1.2,
            },
            hack: {
                skill: 1.2,
            },
        },
    },
    {
        name: "Nuoptimal Nootropic Injector Implant",
        factions: [
            "Bachman & Associates",
            "Clarke Incorporated",
            "Four Sigma",
            "Chongqing",
            "Ishima",
            "New Tokyo",
            "Volhaven",
            "Tian Di Hui",
        ],
        requirements: {
            money: 20000000,
            reputation: 5000,
        },
        benefits: {
            work: {
                company: 1.2,
            },
        },
    },
    {
        name: "NutriGen Implant",
        factions: ["New Tokyo"],
        requirements: {
            money: 2500000,
            reputation: 6250,
        },
        benefits: {
            str: {
                exp: 1.2,
            },
            def: {
                exp: 1.2,
            },
            agi: {
                exp: 1.2,
            },
            dex: {
                exp: 1.2,
            },
        },
    },
    {
        name: "OmniTek InfoLoad",
        factions: ["OmniTek Incorporated"],
        requirements: {
            money: 2875000000,
            reputation: 625000,
        },
        benefits: {
            hack: {
                exp: 1.25,
                skill: 1.2,
            },
        },
    },
    {
        name: "PC Direct-Neural Interface",
        factions: [
            "Bachman & Associates",
            "Clarke Incorporated",
            "Four Sigma",
            "Chongqing",
            "Ishima",
            "New Tokyo",
            "Volhaven",
            "Tian Di Hui",
        ],
        requirements: {
            money: 20000000,
            reputation: 5000,
        },
        benefits: {
            work: {
                company: 1.2,
            },
        },
    },
];

/**
 * All augmenatations, as an object.
 */
export const AUGMENTATIONS_OBJ: { [key: string]: Augmentation } =
    AUGMENTATIONS.reduce((a, v) => ({ ...a, [v.name]: v }), {});
