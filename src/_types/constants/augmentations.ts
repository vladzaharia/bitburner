import { IAugmentation } from "/_types/interfaces/augmentation.js";

/**
 * All augmentations in the game.
 */
export const AUGMENTATIONS: IAugmentation[] = [
    {
        name: "ADR-V1 Pheromone Gene",
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
        requirements: {
            money: 17500000,
            reputation: 3750,
        },
    },
    {
        name: "ADR-V2 Pheromone Gene",
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
        requirements: {
            money: 550000000,
            reputation: 62500,
        },
    },
    {
        name: "Artificial Bio-neural Network Implant",
        benefits: {
            hack: {
                money: 1.15,
                skill: 1.12,
                speed: 1.03,
            },
        },
        factions: ["BitRunners", "Fulcrum Technologies"],
        requirements: {
            money: 3000000000,
            reputation: 275000,
        },
    },
    {
        name: "Artificial Synaptic Potentiation",
        benefits: {
            hack: {
                chance: 1.05,
                exp: 1.05,
                speed: 1.02,
            },
        },
        factions: ["NiteSec", "The Black Hand"],
        requirements: {
            money: 80000000,
            reputation: 6250,
        },
    },
    {
        name: "Augmented Targeting I",
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
        requirements: {
            money: 15000000,
            reputation: 5000,
        },
    },
    {
        name: "Augmented Targeting II",
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
        requirements: {
            money: 42500000,
            reputation: 8750,
        },
    },
    {
        name: "Augmented Targeting III",
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
        requirements: {
            money: 115000000,
            reputation: 27500,
        },
    },
    {
        name: "Bionic Arms",
        benefits: {
            dex: {
                skill: 1.3,
            },
            str: {
                skill: 1.3,
            },
        },
        factions: ["Tetrads"],
        requirements: {
            money: 275000000,
            reputation: 62500,
        },
    },
    {
        name: "Bionic Legs",
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
        requirements: {
            money: 375000000,
            reputation: 150000,
        },
    },
    {
        name: "Bionic Spine",
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
        requirements: {
            money: 125000000,
            reputation: 45000,
        },
    },
    {
        name: "BitRunners Neurolink",
        benefits: {
            hack: {
                chance: 1.1,
                exp: 1.2,
                skill: 1.15,
                speed: 1.05,
            },
            programs: ["FTPCrack.exe", "relaySMTP.exe"],
        },
        factions: ["BitRunners"],
        requirements: {
            money: 4375000000,
            reputation: 875000,
        },
    },
    {
        name: "BitWire",
        benefits: {
            hack: {
                skill: 1.05,
            },
        },
        factions: ["CyberSec", "NiteSec"],
        requirements: {
            money: 10000000,
            reputation: 3750,
        },
    },
    {
        name: "BrachiBlades",
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
        requirements: {
            money: 90000000,
            reputation: 12500,
        },
    },
    {
        name: "CashRoot Starter Kit",
        benefits: {
            programs: ["BruteSSH.exe"],
        },
        factions: ["Sector-12"],
        requirements: {
            money: 125000000,
            reputation: 12500,
        },
    },
    {
        name: "Combat Rib I",
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
        requirements: {
            money: 23750000,
            reputation: 7500,
        },
    },
    {
        name: "Combat Rib II",
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
        requirements: {
            money: 65000000,
            reputation: 18750,
        },
    },
    {
        name: "Combat Rib III",
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
        requirements: {
            money: 120000000,
            reputation: 35000,
        },
    },
    {
        name: "CordiARC Fusion Reactor",
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
        requirements: {
            money: 5000000000,
            reputation: 1125000,
        },
    },
    {
        name: "Cranial Signal Processors - Gen I",
        benefits: {
            hack: {
                skill: 1.05,
                speed: 1.01,
            },
        },
        factions: ["CyberSec"],
        requirements: {
            money: 70000000,
            reputation: 10000,
        },
    },
    {
        name: "Cranial Signal Processors - Gen II",
        benefits: {
            hack: {
                chance: 1.05,
                skill: 1.07,
                speed: 1.02,
            },
        },
        factions: ["CyberSec", "NiteSec"],
        requirements: {
            money: 125000000,
            reputation: 18750,
        },
    },
    {
        name: "Cranial Signal Processors - Gen III",
        benefits: {
            hack: {
                chance: 1.15,
                skill: 1.09,
                speed: 1.02,
            },
        },
        factions: ["BitRunners", "NiteSec", "The Black Hand"],
        requirements: {
            money: 550000000,
            reputation: 50000,
        },
    },
    {
        name: "Cranial Signal Processors - Gen IV",
        benefits: {
            hack: {
                chance: 1.25,
                skill: 1.2,
                speed: 1.02,
            },
        },
        factions: ["BitRunners", "The Black Hand"],
        requirements: {
            money: 1100000000,
            reputation: 125000,
        },
    },
    {
        name: "Cranial Signal Processors - Gen V",
        benefits: {
            hack: {
                chance: 1.75,
                skill: 1.25,
                speed: 1.3,
            },
        },
        factions: ["BitRunners"],
        requirements: {
            money: 2250000000,
            reputation: 250000,
        },
    },
    {
        name: "CRTX42-AA Gene Modification",
        benefits: {
            hack: {
                exp: 1.15,
                skill: 1.08,
            },
        },
        factions: ["NiteSec"],
        requirements: {
            money: 225000000,
            reputation: 45000,
        },
    },
    {
        name: "DataJack",
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
        requirements: {
            money: 450000000,
            reputation: 112500,
        },
    },
    {
        name: "DermaForce Particle Barrier",
        benefits: {
            def: {
                skill: 1.4,
            },
        },
        factions: ["Volhaven"],
        requirements: {
            money: 50000000,
            reputation: 15000,
        },
    },
    {
        name: "ECorp HVMind Implant",
        benefits: {
            hack: {
                grow: 3,
            },
        },
        factions: ["ECorp"],
        requirements: {
            money: 5500000000,
            reputation: 1500000,
        },
    },
    {
        name: "Embedded Netburner Module",
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
        requirements: {
            money: 250000000,
            reputation: 15000,
        },
    },
    {
        name: "Embedded Netburner Module Analyze Engine",
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
        requirements: {
            money: 6000000000,
            reputation: 625000,
        },
    },
    {
        name: "Embedded Netburner Module Core Implant",
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
        requirements: {
            money: 2500000000,
            reputation: 250000,
        },
    },
    {
        name: "Embedded Netburner Module Core V2 Upgrade",
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
        requirements: {
            money: 4500000000,
            reputation: 1000000,
        },
    },
    {
        name: "Embedded Netburner Module Core V3 Upgrade",
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
        requirements: {
            money: 7500000000,
            reputation: 1750000,
        },
    },
    {
        name: "Embedded Netburner Module Direct Memory Access Upgrade",
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
        requirements: {
            money: 7000000000,
            reputation: 1000000,
        },
    },
    {
        name: "Enhanced Myelin Sheathing",
        benefits: {
            hack: {
                exp: 1.1,
                skill: 1.08,
                speed: 1.03,
            },
        },
        factions: ["BitRunners", "Fulcrum Technologies", "The Black Hand"],
        requirements: {
            money: 1375000000,
            reputation: 100000,
        },
    },
    {
        name: "Enhanced Social Interaction Implant",
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
        requirements: {
            money: 1375000000,
            reputation: 375000,
        },
    },
    {
        name: "FocusWire",
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
        requirements: {
            money: 900000000,
            reputation: 75000,
        },
    },
    {
        name: "Graphene Bionic Arms Upgrade",
        benefits: {
            dex: {
                skill: 1.85,
            },
            str: {
                skill: 1.85,
            },
        },
        factions: ["The Dark Army"],
        requirements: {
            money: 3750000000,
            reputation: 500000,
        },
    },
    {
        name: "Graphene Bionic Legs Upgrade",
        benefits: {
            agi: {
                skill: 2.5,
            },
        },
        factions: ["ECorp", "Fulcrum Technologies", "MegaCorp"],
        requirements: {
            money: 4500000000,
            reputation: 750000,
        },
    },
    {
        name: "Graphene Bionic Spine Upgrade",
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
        requirements: {
            money: 6000000000,
            reputation: 1625000,
        },
    },
    {
        name: "Graphene Bone Lacings",
        benefits: {
            def: {
                skill: 1.7,
            },
            str: {
                skill: 1.7,
            },
        },
        factions: ["Fulcrum Technologies", "The Covenant"],
        requirements: {
            money: 4250000000,
            reputation: 1125000,
        },
    },
    {
        name: "Graphene BranchiBlades Upgrade",
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
        requirements: {
            money: 2500000000,
            reputation: 225000,
        },
    },
    {
        name: "Hacknet Node Cache Architecture Neural-Upload",
        benefits: {
            hacknet: {
                levelCost: 0.85,
                money: 1.1,
            },
        },
        factions: ["Netburners"],
        requirements: {
            money: 5500000,
            reputation: 2500,
        },
    },
    {
        name: "Hacknet Node Core Direct-Neural Interface",
        benefits: {
            hacknet: {
                money: 1.45,
            },
        },
        factions: ["Netburners"],
        requirements: {
            money: 60000000,
            reputation: 12500,
        },
    },
    {
        name: "Hacknet Node CPU Architecture Neural-Upload",
        benefits: {
            hacknet: {
                cost: 0.85,
                money: 1.15,
            },
        },
        factions: ["Netburners"],
        requirements: {
            money: 11000000,
            reputation: 3750,
        },
    },
    {
        name: "Hacknet Node Kernel Direct-Neural Interface",
        benefits: {
            hacknet: {
                money: 1.25,
            },
        },
        factions: ["Netburners"],
        requirements: {
            money: 40000000,
            reputation: 7500,
        },
    },
    {
        name: "Hacknet Node NIC Architecture Neural-Upload",
        benefits: {
            hacknet: {
                cost: 0.9,
                money: 1.1,
            },
        },
        factions: ["Netburners"],
        requirements: {
            money: 4500000,
            reputation: 1875,
        },
    },
    {
        name: "HemoRecirculator",
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
        requirements: {
            money: 45000000,
            reputation: 10000,
        },
    },
    {
        name: "HyperSight Corneal Implant",
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
        requirements: {
            money: 2750000000,
            reputation: 150000,
        },
    },
    {
        name: "INFRARET Enhancement",
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
        requirements: {
            money: 30000000,
            reputation: 7500,
        },
    },
    {
        name: "LuminCloaking-V1 Skin Implant",
        benefits: {
            agi: {
                skill: 1.05,
            },
            crime: {
                money: 1.1,
            },
        },
        factions: ["Ishima"],
        requirements: {
            money: 5000000,
            reputation: 1500,
        },
    },
    {
        name: "LuminCloaking-V2 Skin Implant",
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
        requirements: {
            money: 30000000,
            reputation: 5000,
        },
    },
    {
        name: "Nanofiber Weave",
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
        requirements: {
            money: 125000000,
            reputation: 37500,
        },
    },
    {
        name: "NEMEAN Subdermal Weave",
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
        requirements: {
            money: 3250000000,
            reputation: 875000,
        },
    },
    {
        name: "Neotra",
        benefits: {
            def: {
                skill: 1.55,
            },
            str: {
                skill: 1.55,
            },
        },
        factions: ["Blade Industries"],
        requirements: {
            money: 2875000000,
            reputation: 562500,
        },
    },
    {
        name: "Neural Accelerator",
        benefits: {
            hack: {
                exp: 1.15,
                money: 1.2,
                skill: 1.1,
            },
        },
        factions: ["BitRunners"],
        requirements: {
            money: 1750000000,
            reputation: 200000,
        },
    },
    {
        name: "Neural-Retention Enhancement",
        benefits: {
            hack: {
                exp: 1.25,
            },
        },
        factions: ["NiteSec"],
        requirements: {
            money: 250000000,
            reputation: 20000,
        },
    },
    {
        name: "Neuralstimulator",
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
        requirements: {
            money: 3000000000,
            reputation: 50000,
        },
    },
    {
        name: "Neuregen Gene Modification",
        benefits: {
            hack: {
                exp: 1.4,
            },
        },
        factions: ["Chongqing"],
        requirements: {
            money: 375000000,
            reputation: 37500,
        },
    },
    {
        name: "Neuronal Densification",
        benefits: {
            hack: {
                exp: 1.1,
                skill: 1.15,
                speed: 1.03,
            },
        },
        factions: ["Clarke Incorporated"],
        requirements: {
            money: 1375000000,
            reputation: 187500,
        },
    },
    {
        name: "Neurotrainer I",
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
        requirements: {
            money: 4000000,
            reputation: 1000,
        },
    },
    {
        name: "Neurotrainer II",
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
        requirements: {
            money: 45000000,
            reputation: 10000,
        },
    },
    {
        name: "Neurotrainer III",
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
        requirements: {
            money: 130000000,
            reputation: 25000,
        },
    },
    {
        name: "nextSENS Gene Modification",
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
        requirements: {
            money: 1925000000,
            reputation: 437500,
        },
    },
    {
        name: "Nuoptimal Nootropic Injector Implant",
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
        requirements: {
            money: 20000000,
            reputation: 5000,
        },
    },
    {
        name: "NutriGen Implant",
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
        requirements: {
            money: 2500000,
            reputation: 6250,
        },
    },
    {
        name: "OmniTek InfoLoad",
        benefits: {
            hack: {
                exp: 1.25,
                skill: 1.2,
            },
        },
        factions: ["OmniTek Incorporated"],
        requirements: {
            money: 2875000000,
            reputation: 625000,
        },
    },
    {
        name: "PC Direct-Neural Interface",
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
        requirements: {
            money: 3750000000,
            reputation: 375000,
        },
    },
    {
        name: "PC Direct-Neural Interface NeuroNet Injector",
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
        requirements: {
            money: 7500000000,
            reputation: 1500000,
        },
    },
    {
        name: "PC Direct-Neural Interface Optimization Submodule",
        benefits: {
            hack: {
                skill: 1.1,
            },
            work: {
                company: 1.75,
            },
        },
        factions: ["Blade Industries", "ECorp", "Fulcrum Technologies"],
        requirements: {
            money: 4500000000,
            reputation: 500000,
        },
    },
    {
        name: "PCMatrix",
        benefits: {
            cha: {
                exp: 1.0777,
                skill: 1.0777,
            },
            crime: {
                money: 1.0777,
                success: 1.0777,
            },
            programs: ["DeepscanV1.exe", "AutoLink.exe"],
            work: {
                company: 1.0777,
                faction: 1.0777,
                money: 1.777,
            },
        },
        factions: ["Blade Industries", "ECorp", "Fulcrum Technologies"],
        requirements: {
            money: 4500000000,
            reputation: 500000,
        },
    },
    {
        name: "Photosynthetic Cells",
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
        requirements: {
            money: 2750000000,
            reputation: 562500,
        },
    },
    {
        name: "Power Recirculation Core",
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
        requirements: {
            money: 180000000,
            reputation: 25000,
        },
    },
    {
        name: "QLink",
        benefits: {
            hack: {
                chance: 2.5,
                money: 4,
                skill: 1.75,
                speed: 2,
            },
        },
        factions: ["Illuminati"],
        requirements: {
            money: 25000000000000,
            reputation: 1875000,
        },
    },
    {
        name: "SmartJaw",
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
        requirements: {
            money: 2750000000,
            reputation: 375000,
        },
    },
    {
        name: "SmartSonar Implant",
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
        requirements: {
            money: 75000000,
            reputation: 22500,
        },
    },
    {
        name: "Social Negotiation Assistant (S.N.A)",
        benefits: {
            work: {
                company: 1.15,
                faction: 1.15,
                money: 1.1,
            },
        },
        factions: ["Tian Di Hui"],
        requirements: {
            money: 30000000,
            reputation: 6250,
        },
    },
    {
        name: "Speech Enhancement",
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
        requirements: {
            money: 12500000,
            reputation: 2500,
        },
    },
    {
        name: "Speech Processor Implant",
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
        requirements: {
            money: 50000000,
            reputation: 7500,
        },
    },
    {
        name: "SPTN-97 Gene Modification",
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
        requirements: {
            money: 4875000000,
            reputation: 1250000,
        },
    },
    {
        name: "Synaptic Enhancement Implant",
        benefits: {
            hack: {
                speed: 1.03,
            },
        },
        factions: ["CyberSec"],
        requirements: {
            money: 7500000,
            reputation: 2000,
        },
    },
    {
        name: "Synfibril Muscle",
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
        requirements: {
            money: 1125000000,
            reputation: 437500,
        },
    },
    {
        name: "Synthetic Heart",
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
        requirements: {
            money: 2875000000,
            reputation: 750000,
        },
    },
    {
        name: "The Black Hand",
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
        requirements: {
            money: 550000000,
            reputation: 100000,
        },
    },
    {
        name: "The Red Pill",
        benefits: {
            endgame: true,
        },
        factions: ["Daedalus"],
        requirements: {
            money: 0,
            reputation: 2500000,
        },
    },
    {
        name: "The Shadow's Simulacrum",
        benefits: {
            work: {
                company: 1.15,
                faction: 1.15,
            },
        },
        factions: ["Speakers for the Dead", "The Dark Army", "The Syndicate"],
        requirements: {
            money: 400000000,
            reputation: 37500,
        },
    },
    {
        name: "TITN-41 Gene-Modification Injection",
        benefits: {
            cha: {
                exp: 1.15,
                skill: 1.15,
            },
        },
        factions: ["Silhouette"],
        requirements: {
            money: 190000000,
            reputation: 25000,
        },
    },
    {
        name: "Wired Reflexes",
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
        requirements: {
            money: 2500000,
            reputation: 1250,
        },
    },
    {
        name: "Xanipher",
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
        requirements: {
            money: 4250000000,
            reputation: 875000,
        },
    },
];

/**
 * All augmenatations, as an object.
 */
export const AUGMENTATIONS_OBJ: { [key: string]: IAugmentation } =
    AUGMENTATIONS.reduce((a, v) => ({ ...a, [v.name]: v }), {});
