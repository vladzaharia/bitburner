import { Augmentation } from "/_types/interfaces/augmentation.js";

/**
 * All augmentations in the game.
 */
export const AUGMENTATIONS: Augmentation[] = [
    {
        benefits: {
            work: {
                company: 1.1,
                faction: 1.1,
            },
        },
        factions: [
            "Four Sigma",
            "MegaCorp",
            "NWO",
            "The Syndicate",
            "Tian Di Hui",
        ],
        name: "ADR-V1 Pheromone Gene",
        requirements: {
            money: 17500000,
            reputation: 3750,
        },
    },
    {
        benefits: {
            work: {
                company: 1.2,
                faction: 1.2,
            },
        },
        factions: [
            "Bachman & Associates",
            "Clarke Incorporated",
            "Four Sigma",
            "Silhouette",
        ],
        name: "ADR-V2 Pheromone Gene",
        requirements: {
            money: 550000000,
            reputation: 62500,
        },
    },
    {
        benefits: {
            hack: {
                money: 1.15,
                skill: 1.12,
                speed: 1.03,
            },
        },
        factions: ["BitRunners", "Fulcrum Technologies"],
        name: "Artificial Bio-neural Network Implant",
        requirements: {
            money: 3000000000,
            reputation: 275000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.05,
                exp: 1.05,
                speed: 1.02,
            },
        },
        factions: ["NiteSec", "The Black Hand"],
        name: "Artificial Synaptic Potentiation",
        requirements: {
            money: 80000000,
            reputation: 6250,
        },
    },
    {
        benefits: {
            dex: {
                skill: 1.1,
            },
        },
        factions: [
            "Blade Industries",
            "Ishima",
            "KuaiGong International",
            "OmniTek Incorporated",
            "Sector-12",
            "Slum Snakes",
            "The Dark Army",
            "The Syndicate",
            "Volhaven",
        ],
        name: "Augmented Targeting I",
        requirements: {
            money: 15000000,
            reputation: 5000,
        },
    },
    {
        benefits: {
            dex: {
                skill: 1.2,
            },
        },
        factions: [
            "Blade Industries",
            "Ishima",
            "KuaiGong International",
            "OmniTek Incorporated",
            "Sector-12",
            "The Dark Army",
            "The Syndicate",
            "Volhaven",
        ],
        name: "Augmented Targeting II",
        requirements: {
            money: 42500000,
            reputation: 8750,
        },
    },
    {
        benefits: {
            dex: {
                skill: 1.3,
            },
        },
        factions: [
            "Blade Industries",
            "KuaiGong International",
            "OmniTek Incorporated",
            "The Covenant",
            "The Dark Army",
            "The Syndicate",
        ],
        name: "Augmented Targeting III",
        requirements: {
            money: 115000000,
            reputation: 27500,
        },
    },
    {
        benefits: {
            dex: {
                skill: 1.3,
            },
            str: {
                skill: 1.3,
            },
        },
        factions: ["Tetrads"],
        name: "Bionic Arms",
        requirements: {
            money: 275000000,
            reputation: 62500,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.6,
            },
        },
        factions: [
            "Blade Industries",
            "KuaiGong International",
            "OmniTek Incorporated",
            "Speakers for the Dead",
            "The Syndicate",
        ],
        name: "Bionic Legs",
        requirements: {
            money: 375000000,
            reputation: 150000,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.15,
            },
            def: {
                skill: 1.15,
            },
            dex: {
                skill: 1.15,
            },
            str: {
                skill: 1.15,
            },
        },
        factions: [
            "Blade Industries",
            "KuaiGong International",
            "OmniTek Incorporated",
            "Speakers for the Dead",
            "The Syndicate",
        ],
        name: "Bionic Spine",
        requirements: {
            money: 125000000,
            reputation: 45000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.1,
                exp: 1.2,
                skill: 1.15,
                speed: 1.05,
            },
        },
        factions: ["BitRunners"],
        name: "BitRunners Neurolink",
        requirements: {
            money: 4375000000,
            reputation: 875000,
        },
    },
    {
        benefits: {
            hack: {
                skill: 1.05,
            },
        },
        factions: ["CyberSec", "NiteSec"],
        name: "BitWire",
        requirements: {
            money: 10000000,
            reputation: 3750,
        },
    },
    {
        benefits: {
            crime: {
                money: 1.15,
                success: 1.1,
            },
            def: {
                skill: 1.15,
            },
            str: {
                skill: 1.15,
            },
        },
        factions: ["The Syndicate"],
        name: "BrachiBlades",
        requirements: {
            money: 90000000,
            reputation: 12500,
        },
    },
    {
        benefits: {
            programs: ["BruteSSH.exe"],
        },
        factions: ["Sector-12"],
        name: "CashRoot Starter Kit",
        requirements: {
            money: 125000000,
            reputation: 12500,
        },
    },
    {
        benefits: {
            def: {
                skill: 1.1,
            },
            str: {
                skill: 1.1,
            },
        },
        factions: [
            "Blade Industries",
            "Ishima",
            "KuaiGong International",
            "OmniTek Incorporated",
            "Sector-12",
            "Slum Snakes",
            "The Dark Army",
            "The Syndicate",
            "Volhaven",
        ],
        name: "Combat Rib I",
        requirements: {
            money: 23750000,
            reputation: 7500,
        },
    },
    {
        benefits: {
            def: {
                skill: 1.14,
            },
            str: {
                skill: 1.14,
            },
        },
        factions: [
            "Blade Industries",
            "Ishima",
            "KuaiGong International",
            "OmniTek Incorporated",
            "Sector-12",
            "The Dark Army",
            "The Syndicate",
            "Volhaven",
        ],
        name: "Combat Rib II",
        requirements: {
            money: 65000000,
            reputation: 18750,
        },
    },
    {
        benefits: {
            def: {
                skill: 1.18,
            },
            str: {
                skill: 1.18,
            },
        },
        factions: [
            "Blade Industries",
            "KuaiGong International",
            "OmniTek Incorporated",
            "The Covenant",
            "The Dark Army",
            "The Syndicate",
        ],
        name: "Combat Rib III",
        requirements: {
            money: 120000000,
            reputation: 35000,
        },
    },
    {
        benefits: {
            agi: {
                exp: 1.35,
                skill: 1.35,
            },
            def: {
                exp: 1.35,
                skill: 1.35,
            },
            dex: {
                exp: 1.35,
                skill: 1.35,
            },
            str: {
                exp: 1.35,
                skill: 1.35,
            },
        },
        factions: ["MegaCorp"],
        name: "CordiARC Fusion Reactor",
        requirements: {
            money: 5000000000,
            reputation: 1125000,
        },
    },
    {
        benefits: {
            hack: {
                skill: 1.05,
                speed: 1.01,
            },
        },
        factions: ["CyberSec"],
        name: "Cranial Signal Processors - Gen I",
        requirements: {
            money: 70000000,
            reputation: 10000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.05,
                skill: 1.07,
                speed: 1.02,
            },
        },
        factions: ["CyberSec", "NiteSec"],
        name: "Cranial Signal Processors - Gen II",
        requirements: {
            money: 125000000,
            reputation: 18750,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.15,
                skill: 1.09,
                speed: 1.02,
            },
        },
        factions: ["BitRunners", "NiteSec", "The Black Hand"],
        name: "Cranial Signal Processors - Gen III",
        requirements: {
            money: 550000000,
            reputation: 50000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.25,
                skill: 1.2,
                speed: 1.02,
            },
        },
        factions: ["BitRunners", "The Black Hand"],
        name: "Cranial Signal Processors - Gen IV",
        requirements: {
            money: 1100000000,
            reputation: 125000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.75,
                skill: 1.25,
                speed: 1.3,
            },
        },
        factions: ["BitRunners"],
        name: "Cranial Signal Processors - Gen V",
        requirements: {
            money: 2250000000,
            reputation: 250000,
        },
    },
    {
        benefits: {
            hack: {
                exp: 1.15,
                skill: 1.08,
            },
        },
        factions: ["NiteSec"],
        name: "CRTX42-AA Gene Modification",
        requirements: {
            money: 225000000,
            reputation: 45000,
        },
    },
    {
        benefits: {
            hack: {
                money: 1.25,
            },
        },
        factions: [
            "BitRunners",
            "Chongqing",
            "New Tokyo",
            "NiteSec",
            "The Black Hand",
        ],
        name: "DataJack",
        requirements: {
            money: 450000000,
            reputation: 112500,
        },
    },
    {
        benefits: {
            def: {
                skill: 1.4,
            },
        },
        factions: ["Volhaven"],
        name: "DermaForce Particle Barrier",
        requirements: {
            money: 50000000,
            reputation: 15000,
        },
    },
    {
        benefits: {
            hack: {
                grow: 3,
            },
        },
        factions: ["ECorp"],
        name: "ECorp HVMind Implant",
        requirements: {
            money: 5500000000,
            reputation: 1500000,
        },
    },
    {
        benefits: {
            hack: {
                skill: 1.08,
            },
        },
        factions: [
            "BitRunners",
            "Blade Industries",
            "ECorp",
            "Fulcrum Technologies",
            "MegaCorp",
            "NiteSec",
            "NWO",
            "The Black Hand",
        ],
        name: "Embedded Netburner Module",
        requirements: {
            money: 250000000,
            reputation: 15000,
        },
    },
    {
        benefits: {
            hack: {
                speed: 1.1,
            },
        },
        factions: [
            "Daedalus",
            "ECorp",
            "Fulcrum Technologies",
            "Illuminati",
            "MegaCorp",
            "NWO",
            "The Covenant",
        ],
        name: "Embedded Netburner Module Analyze Engine",
        requirements: {
            money: 6000000000,
            reputation: 625000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.03,
                exp: 1.07,
                money: 1.1,
                skill: 1.07,
                speed: 1.03,
            },
        },
        factions: [
            "BitRunners",
            "Blade Industries",
            "ECorp",
            "Fulcrum Technologies",
            "MegaCorp",
            "NWO",
            "The Black Hand",
        ],
        name: "Embedded Netburner Module Core Implant",
        requirements: {
            money: 2500000000,
            reputation: 250000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.05,
                exp: 1.15,
                money: 1.3,
                skill: 1.08,
                speed: 1.05,
            },
        },
        factions: [
            "BitRunners",
            "Blade Industries",
            "ECorp",
            "Fulcrum Technologies",
            "KuaiGong International",
            "MegaCorp",
            "NWO",
            "OmniTek Incorporated",
        ],
        name: "Embedded Netburner Module Core V2 Upgrade",
        requirements: {
            money: 4500000000,
            reputation: 1000000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.1,
                exp: 1.25,
                money: 1.4,
                skill: 1.1,
                speed: 1.05,
            },
        },
        factions: [
            "Daedalus",
            "ECorp",
            "Fulcrum Technologies",
            "Illuminati",
            "MegaCorp",
            "NWO",
            "The Covenant",
        ],
        name: "Embedded Netburner Module Core V3 Upgrade",
        requirements: {
            money: 7500000000,
            reputation: 1750000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.2,
                money: 1.4,
            },
        },
        factions: [
            "Daedalus",
            "ECorp",
            "Fulcrum Technologies",
            "Illuminati",
            "MegaCorp",
            "NWO",
            "The Covenant",
        ],
        name: "Embedded Netburner Module Direct Memory Access Upgrade",
        requirements: {
            money: 7000000000,
            reputation: 1000000,
        },
    },
    {
        benefits: {
            hack: {
                exp: 1.1,
                skill: 1.08,
                speed: 1.03,
            },
        },
        factions: ["BitRunners", "Fulcrum Technologies", "The Black Hand"],
        name: "Enhanced Myelin Sheathing",
        requirements: {
            money: 1375000000,
            reputation: 100000,
        },
    },
    {
        benefits: {
            cha: {
                exp: 1.6,
                skill: 1.6,
            },
        },
        factions: [
            "Bachman & Associates",
            "Clarke Incorporated",
            "Four Sigma",
            "NWO",
            "OmniTek Incorporated",
        ],
        name: "Enhanced Social Interaction Implant",
        requirements: {
            money: 1375000000,
            reputation: 375000,
        },
    },
    {
        benefits: {
            agi: {
                exp: 1.05,
            },
            cha: {
                exp: 1.05,
            },
            def: {
                exp: 1.05,
            },
            dex: {
                exp: 1.05,
            },
            hack: {
                exp: 1.05,
            },
            str: {
                exp: 1.05,
            },
            work: {
                company: 1.1,
                money: 1.2,
            },
        },
        factions: [
            "Bachman & Associates",
            "Clarke Incorporated",
            "Four Sigma",
            "KuaiGong International",
        ],
        name: "FocusWire",
        requirements: {
            money: 900000000,
            reputation: 75000,
        },
    },
    {
        benefits: {
            dex: {
                skill: 1.85,
            },
            str: {
                skill: 1.85,
            },
        },
        factions: ["The Dark Army"],
        name: "Graphene Bionic Arms Upgrade",
        requirements: {
            money: 3750000000,
            reputation: 500000,
        },
    },
    {
        benefits: {
            agi: {
                skill: 2.5,
            },
        },
        factions: ["ECorp", "Fulcrum Technologies", "MegaCorp"],
        name: "Graphene Bionic Legs Upgrade",
        requirements: {
            money: 4500000000,
            reputation: 750000,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.6,
            },
            def: {
                skill: 1.6,
            },
            dex: {
                skill: 1.6,
            },
            str: {
                skill: 1.6,
            },
        },
        factions: ["ECorp", "Fulcrum Technologies"],
        name: "Graphene Bionic Spine Upgrade",
        requirements: {
            money: 6000000000,
            reputation: 1625000,
        },
    },
    {
        benefits: {
            def: {
                skill: 1.7,
            },
            str: {
                skill: 1.7,
            },
        },
        factions: ["Fulcrum Technologies", "The Covenant"],
        name: "Graphene Bone Lacings",
        requirements: {
            money: 4250000000,
            reputation: 1125000,
        },
    },
    {
        benefits: {
            crime: {
                money: 1.3,
                success: 1.1,
            },
            def: {
                skill: 1.4,
            },
            str: {
                skill: 1.4,
            },
        },
        factions: ["Speakers for the Dead"],
        name: "Graphene BranchiBlades Upgrade",
        requirements: {
            money: 2500000000,
            reputation: 225000,
        },
    },
    {
        benefits: {
            hacknet: {
                levelCost: 0.85,
                money: 1.1,
            },
        },
        factions: ["Netburners"],
        name: "Hacknet Node Cache Architecture Neural-Upload",
        requirements: {
            money: 5500000,
            reputation: 2500,
        },
    },
    {
        benefits: {
            hacknet: {
                money: 1.45,
            },
        },
        factions: ["Netburners"],
        name: "Hacknet Node Core Direct-Neural Interface",
        requirements: {
            money: 60000000,
            reputation: 12500,
        },
    },
    {
        benefits: {
            hacknet: {
                cost: 0.85,
                money: 1.15,
            },
        },
        factions: ["Netburners"],
        name: "Hacknet Node CPU Architecture Neural-Upload",
        requirements: {
            money: 11000000,
            reputation: 3750,
        },
    },
    {
        benefits: {
            hacknet: {
                money: 1.25,
            },
        },
        factions: ["Netburners"],
        name: "Hacknet Node Kernel Direct-Neural Interface",
        requirements: {
            money: 40000000,
            reputation: 7500,
        },
    },
    {
        benefits: {
            hacknet: {
                cost: 0.9,
                money: 1.1,
            },
        },
        factions: ["Netburners"],
        name: "Hacknet Node NIC Architecture Neural-Upload",
        requirements: {
            money: 4500000,
            reputation: 1875,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.08,
            },
            def: {
                skill: 1.08,
            },
            dex: {
                skill: 1.08,
            },
            str: {
                skill: 1.08,
            },
        },
        factions: ["Tetrads", "The Dark Army", "The Syndicate"],
        name: "HemoRecirculator",
        requirements: {
            money: 45000000,
            reputation: 10000,
        },
    },
    {
        benefits: {
            dex: {
                skill: 1.4,
            },
            hack: {
                money: 1.1,
                speed: 1.03,
            },
        },
        factions: ["Blade Industries", "KuaiGong International"],
        name: "HyperSight Corneal Implant",
        requirements: {
            money: 2750000000,
            reputation: 150000,
        },
    },
    {
        benefits: {
            crime: {
                money: 1.1,
                success: 1.25,
            },
            dex: {
                skill: 1.1,
            },
        },
        factions: ["Ishima"],
        name: "INFRARET Enhancement",
        requirements: {
            money: 30000000,
            reputation: 7500,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.05,
            },
            crime: {
                money: 1.1,
            },
        },
        factions: ["Ishima"],
        name: "LuminCloaking-V1 Skin Implant",
        requirements: {
            money: 5000000,
            reputation: 1500,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.1,
            },
            crime: {
                money: 1.25,
            },
            def: {
                skill: 1.1,
            },
        },
        factions: ["Slum Snakes", "Tetrads"],
        name: "LuminCloaking-V2 Skin Implant",
        requirements: {
            money: 30000000,
            reputation: 5000,
        },
    },
    {
        benefits: {
            def: {
                skill: 1.2,
            },
            str: {
                skill: 1.2,
            },
        },
        factions: [
            "Blade Industries",
            "Fulcrum Technologies",
            "OmniTek Incorporated",
            "Speakers for the Dead",
            "The Dark Army",
            "The Syndicate",
            "Tian Di Hui",
        ],
        name: "Nanofiber Weave",
        requirements: {
            money: 125000000,
            reputation: 37500,
        },
    },
    {
        benefits: {
            def: {
                skill: 2.2,
            },
        },
        factions: [
            "Daedalus",
            "Fulcrum Technologies",
            "Illuminati",
            "The Covenant",
            "The Syndicate",
        ],
        name: "NEMEAN Subdermal Weave",
        requirements: {
            money: 3250000000,
            reputation: 875000,
        },
    },
    {
        benefits: {
            def: {
                skill: 1.55,
            },
            str: {
                skill: 1.55,
            },
        },
        factions: ["Blade Industries"],
        name: "Neotra",
        requirements: {
            money: 2875000000,
            reputation: 562500,
        },
    },
    {
        benefits: {
            hack: {
                exp: 1.15,
                money: 1.2,
                skill: 1.1,
            },
        },
        factions: ["BitRunners"],
        name: "Neural Accelerator",
        requirements: {
            money: 1750000000,
            reputation: 200000,
        },
    },
    {
        benefits: {
            hack: {
                exp: 1.25,
            },
        },
        factions: ["NiteSec"],
        name: "Neural-Retention Enhancement",
        requirements: {
            money: 250000000,
            reputation: 20000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 1.1,
                exp: 1.12,
                speed: 1.02,
            },
        },
        factions: [
            "Aevum",
            "Bachman & Associates",
            "Chongqing",
            "Clarke Incorporated",
            "Four Sigma",
            "Ishima",
            "New Tokyo",
            "Sector-12",
            "The Black Hand",
            "Volhaven",
        ],
        name: "Neuralstimulator",
        requirements: {
            money: 3000000000,
            reputation: 50000,
        },
    },
    {
        benefits: {
            hack: {
                exp: 1.4,
            },
        },
        factions: ["Chongqing"],
        name: "Neuregen Gene Modification",
        requirements: {
            money: 375000000,
            reputation: 37500,
        },
    },
    {
        benefits: {
            hack: {
                exp: 1.1,
                skill: 1.15,
                speed: 1.03,
            },
        },
        factions: ["Clarke Incorporated"],
        name: "Neuronal Densification",
        requirements: {
            money: 1375000000,
            reputation: 187500,
        },
    },
    {
        benefits: {
            agi: {
                exp: 1.1,
            },
            cha: {
                exp: 1.1,
            },
            def: {
                exp: 1.1,
            },
            dex: {
                exp: 1.1,
            },
            hack: {
                exp: 1.1,
            },
            str: {
                exp: 1.1,
            },
        },
        factions: ["CyberSec"],
        name: "Neurotrainer I",
        requirements: {
            money: 4000000,
            reputation: 1000,
        },
    },
    {
        benefits: {
            agi: {
                exp: 1.15,
            },
            cha: {
                exp: 1.15,
            },
            def: {
                exp: 1.15,
            },
            dex: {
                exp: 1.15,
            },
            hack: {
                exp: 1.15,
            },
            str: {
                exp: 1.15,
            },
        },
        factions: ["BitRunners", "NiteSec"],
        name: "Neurotrainer II",
        requirements: {
            money: 45000000,
            reputation: 10000,
        },
    },
    {
        benefits: {
            agi: {
                exp: 1.2,
            },
            cha: {
                exp: 1.2,
            },
            def: {
                exp: 1.2,
            },
            dex: {
                exp: 1.2,
            },
            hack: {
                exp: 1.2,
            },
            str: {
                exp: 1.2,
            },
        },
        factions: ["Four Sigma", "NWO"],
        name: "Neurotrainer III",
        requirements: {
            money: 130000000,
            reputation: 25000,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.2,
            },
            cha: {
                skill: 1.2,
            },
            def: {
                skill: 1.2,
            },
            dex: {
                skill: 1.2,
            },
            hack: {
                skill: 1.2,
            },
            str: {
                skill: 1.2,
            },
        },
        factions: ["Clarke Incorporated"],
        name: "nextSENS Gene Modification",
        requirements: {
            money: 1925000000,
            reputation: 437500,
        },
    },
    {
        benefits: {
            work: {
                company: 1.2,
            },
        },
        factions: [
            "Bachman & Associates",
            "Chongqing",
            "Clarke Incorporated",
            "Four Sigma",
            "Ishima",
            "New Tokyo",
            "Tian Di Hui",
            "Volhaven",
        ],
        name: "Nuoptimal Nootropic Injector Implant",
        requirements: {
            money: 20000000,
            reputation: 5000,
        },
    },
    {
        benefits: {
            agi: {
                exp: 1.2,
            },
            def: {
                exp: 1.2,
            },
            dex: {
                exp: 1.2,
            },
            str: {
                exp: 1.2,
            },
        },
        factions: ["New Tokyo"],
        name: "NutriGen Implant",
        requirements: {
            money: 2500000,
            reputation: 6250,
        },
    },
    {
        benefits: {
            hack: {
                exp: 1.25,
                skill: 1.2,
            },
        },
        factions: ["OmniTek Incorporated"],
        name: "OmniTek InfoLoad",
        requirements: {
            money: 2875000000,
            reputation: 625000,
        },
    },
    {
        benefits: {
            hack: {
                skill: 1.08,
            },
            work: {
                company: 1.3,
            },
        },
        factions: [
            "Blade Industries",
            "ECorp",
            "Four Sigma",
            "OmniTek Incorporated",
        ],
        name: "PC Direct-Neural Interface",
        requirements: {
            money: 3750000000,
            reputation: 375000,
        },
    },
    {
        benefits: {
            hack: {
                skill: 1.1,
                speed: 1.05,
            },
            work: {
                company: 2,
            },
        },
        factions: ["Fulcrum Technologies"],
        name: "PC Direct-Neural Interface NeuroNet Injector",
        requirements: {
            money: 7500000000,
            reputation: 1500000,
        },
    },
    {
        benefits: {
            hack: {
                skill: 1.1,
            },
            work: {
                company: 1.75,
            },
        },
        factions: ["Blade Industries", "ECorp", "Fulcrum Technologies"],
        name: "PC Direct-Neural Interface Optimization Submodule",
        requirements: {
            money: 4500000000,
            reputation: 500000,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.4,
            },
            def: {
                skill: 1.4,
            },
            str: {
                skill: 1.4,
            },
        },
        factions: ["KuaiGong International"],
        name: "Photosynthetic Cells",
        requirements: {
            money: 2750000000,
            reputation: 562500,
        },
    },
    {
        benefits: {
            agi: {
                exp: 1.1,
                skill: 1.05,
            },
            cha: {
                exp: 1.1,
                skill: 1.05,
            },
            def: {
                exp: 1.1,
                skill: 1.05,
            },
            dex: {
                exp: 1.1,
                skill: 1.05,
            },
            hack: {
                exp: 1.1,
                skill: 1.05,
            },
            str: {
                exp: 1.1,
                skill: 1.05,
            },
        },
        factions: ["NWO", "Tetrads", "The Dark Army", "The Syndicate"],
        name: "Power Recirculation Core",
        requirements: {
            money: 180000000,
            reputation: 25000,
        },
    },
    {
        benefits: {
            hack: {
                chance: 2.5,
                money: 4,
                skill: 1.75,
                speed: 2,
            },
        },
        factions: ["Illuminati"],
        name: "QLink",
        requirements: {
            money: 25000000000000,
            reputation: 1875000,
        },
    },
    {
        benefits: {
            cha: {
                exp: 1.5,
                skill: 1.5,
            },
            work: {
                company: 1.25,
                faction: 1.25,
            },
        },
        factions: ["Bachman & Associates"],
        name: "SmartJaw",
        requirements: {
            money: 2750000000,
            reputation: 375000,
        },
    },
    {
        benefits: {
            crime: {
                money: 1.25,
            },
            dex: {
                exp: 1.15,
                skill: 1.1,
            },
        },
        factions: ["Slum Snakes"],
        name: "SmartSonar Implant",
        requirements: {
            money: 75000000,
            reputation: 22500,
        },
    },
    {
        benefits: {
            work: {
                company: 1.15,
                faction: 1.15,
                money: 1.1,
            },
        },
        factions: ["Tian Di Hui"],
        name: "Social Negotiation Assistant (S.N.A)",
        requirements: {
            money: 30000000,
            reputation: 6250,
        },
    },
    {
        benefits: {
            cha: {
                skill: 1.1,
            },
            work: {
                company: 1.1,
            },
        },
        factions: [
            "Bachman & Associates",
            "Clarke Incorporated",
            "Four Sigma",
            "KuaiGong International",
            "Speakers for the Dead",
            "Tian Di Hui",
        ],
        name: "Speech Enhancement",
        requirements: {
            money: 12500000,
            reputation: 2500,
        },
    },
    {
        benefits: {
            cha: {
                skill: 1.2,
            },
        },
        factions: [
            "Aevum",
            "Chongqing",
            "Ishima",
            "New Tokyo",
            "Sector-12",
            "Silhouette",
            "Tian Di Hui",
            "Volhaven",
        ],
        name: "Speech Processor Implant",
        requirements: {
            money: 50000000,
            reputation: 7500,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.75,
            },
            def: {
                skill: 1.75,
            },
            dex: {
                skill: 1.75,
            },
            hack: {
                skill: 1.75,
            },
            str: {
                skill: 1.75,
            },
        },
        factions: ["The Covenant"],
        name: "SPTN-97 Gene Modification",
        requirements: {
            money: 4875000000,
            reputation: 1250000,
        },
    },
    {
        benefits: {
            hack: {
                speed: 1.03,
            },
        },
        factions: ["CyberSec"],
        name: "Synaptic Enhancement Implant",
        requirements: {
            money: 7500000,
            reputation: 2000,
        },
    },
    {
        benefits: {
            def: {
                skill: 1.3,
            },
            str: {
                skill: 1.3,
            },
        },
        factions: [
            "Blade Industries",
            "Daedalus",
            "Fulcrum Technologies",
            "Illuminati",
            "KuaiGong International",
            "NWO",
            "Speakers for the Dead",
            "The Covenant",
        ],
        name: "Synfibril Muscle",
        requirements: {
            money: 1125000000,
            reputation: 437500,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.5,
            },
            str: {
                skill: 1.5,
            },
        },
        factions: [
            "Daedalus",
            "Fulcrum Technologies",
            "Illuminati",
            "KuaiGong International",
            "NWO",
            "Speakers for the Dead",
            "The Covenant",
        ],
        name: "Synthetic Heart",
        requirements: {
            money: 2875000000,
            reputation: 750000,
        },
    },
    {
        benefits: {
            dex: {
                skill: 1.15,
            },
            hack: {
                money: 1.1,
                skill: 1.1,
                speed: 1.02,
            },
            str: {
                skill: 1.15,
            },
        },
        factions: ["The Black Hand"],
        name: "The Black Hand",
        requirements: {
            money: 550000000,
            reputation: 100000,
        },
    },
    {
        benefits: {
            endgame: true,
        },
        factions: ["Daedalus"],
        name: "The Red Pill",
        requirements: {
            money: 0,
            reputation: 2500000,
        },
    },
    {
        benefits: {
            work: {
                company: 1.15,
                faction: 1.15,
            },
        },
        factions: ["Speakers for the Dead", "The Dark Army", "The Syndicate"],
        name: "The Shadow's Simulacrum",
        requirements: {
            money: 400000000,
            reputation: 37500,
        },
    },
    {
        benefits: {
            cha: {
                exp: 1.15,
                skill: 1.15,
            },
        },
        factions: ["Silhouette"],
        name: "TITN-41 Gene-Modification Injection",
        requirements: {
            money: 190000000,
            reputation: 25000,
        },
    },
    {
        benefits: {
            agi: {
                skill: 1.05,
            },
            dex: {
                skill: 1.05,
            },
        },
        factions: [
            "Aevum",
            "Ishima",
            "Sector-12",
            "Slum Snakes",
            "Speakers for the Dead",
            "The Dark Army",
            "The Syndicate",
            "Tian Di Hui",
            "Volhaven",
        ],
        name: "Wired Reflexes",
        requirements: {
            money: 2500000,
            reputation: 1250,
        },
    },
    {
        benefits: {
            agi: {
                exp: 1.15,
                skill: 1.2,
            },
            cha: {
                exp: 1.15,
                skill: 1.2,
            },
            def: {
                exp: 1.15,
                skill: 1.2,
            },
            dex: {
                exp: 1.15,
                skill: 1.2,
            },
            hack: {
                exp: 1.15,
                skill: 1.2,
            },
            str: {
                exp: 1.15,
                skill: 1.2,
            },
        },
        factions: ["NWO"],
        name: "Xanipher",
        requirements: {
            money: 4250000000,
            reputation: 875000,
        },
    },
];

/**
 * All augmenatations, as an object.
 */
export const AUGMENTATIONS_OBJ: { [key: string]: Augmentation } =
    AUGMENTATIONS.reduce((a, v) => ({ ...a, [v.name]: v }), {});
