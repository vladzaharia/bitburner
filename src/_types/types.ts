/**
 * All cities.
 */
export type Cities =
    | "Sector-12"
    | "Chongqing"
    | "New Tokyo"
    | "Ishima"
    | "Aevum"
    | "Volhaven";

/**
 * All MegaCorporations (companies w/ factions)
 */
export type MegaCorporations =
    | "ECorp"
    | "MegaCorp"
    | "KuaiGong International"
    | "Four Sigma"
    | "NWO"
    | "Blade Industries"
    | "OmniTek Incorporated"
    | "Bachman & Associates"
    | "Clarke Incorporated"
    | "Fulcrum Technologies";

/**
 * All companies, including MegaCorporations.
 */
export type Companies =
    | "Storm Technologies"
    | "DefComm"
    | "Helios Labs"
    | "VitaLife"
    | "Icarus Microsystems"
    | "Universal Energy"
    | "Galactic Cybersystems"
    | "AeroCorp"
    | "Omnia Cybersystems"
    | "Solaris Space Systems"
    | "Delta One"
    | "Global Pharmaceuticals"
    | "Nova Medical"
    | "CIA"
    | "NSA"
    | "Watchdog Security"
    | "LexoCorp"
    | "Rho Construction"
    | "Alpha Enterprises"
    | "Aevum Police Headquarters"
    | "SysCore Securities"
    | "CompuTek"
    | "NetLink Technologies"
    | "Carmichael Security"
    | "FoodNStuff"
    | "Joe's Guns"
    | "Omega Software"
    | "Noodle Bar"
    | MegaCorporations;

/**
 * All factions, including cities and MegaCorporations.
 */
export type Factions =
    | "CyberSec"
    | "Tian Di Hui"
    | "Netburners"
    | "NiteSec"
    | "The Black Hand"
    | "BitRunners"
    | "Slum Snakes"
    | "Tetrads"
    | "Silhouette"
    | "Speakers for the Dead"
    | "The Dark Army"
    | "The Syndicate"
    | "The Covenant"
    | "Daedalus"
    | "Illuminati"
    | Cities
    | MegaCorporations;

/**
 * All augmentations available for purchase
 */
export type Augmentations =
    | "Augmented Targeting I"
    | "Augmented Targeting II"
    | "Augmented Targeting III"
    | "Synthetic Heart"
    | "Synfibril Muscle"
    | "Combat Rib I"
    | "Combat Rib II"
    | "Combat Rib III"
    | "Nanofiber Weave"
    | "NEMEAN Subdermal Weave"
    | "Wired Reflexes"
    | "Graphene Bone Lacings"
    | "Bionic Spine"
    | "Graphene Bionic Spine Upgrade"
    | "Bionic Legs"
    | "Graphene Bionic Legs Upgrade"
    | "Speech Processor Implant"
    | "TITN-41 Gene-Modification Injection"
    | "Enhanced Social Interaction Implant"
    | "BitWire"
    | "Artificial Bio-neural Network Implant"
    | "Artificial Synaptic Potentiation"
    | "Enhanced Myelin Sheathing"
    | "Synaptic Enhancement Implant"
    | "Neural-Retention Enhancement"
    | "DataJack"
    | "Embedded Netburner Module"
    | "Embedded Netburner Module Core Implant"
    | "Embedded Netburner Module Core V2 Upgrade"
    | "Embedded Netburner Module Core V3 Upgrade"
    | "Embedded Netburner Module Analyze Engine"
    | "Embedded Netburner Module Direct Memory Access Upgrade"
    | "Neuralstimulator"
    | "Neural Accelerator"
    | "Cranial Signal Processors - Gen I"
    | "Cranial Signal Processors - Gen II"
    | "Cranial Signal Processors - Gen III"
    | "Cranial Signal Processors - Gen IV"
    | "Cranial Signal Processors - Gen V"
    | "Neuronal Densification"
    | "Nuoptimal Nootropic Injector Implant"
    | "Speech Enhancement"
    | "FocusWire"
    | "PC Direct-Neural Interface"
    | "PC Direct-Neural Interface Optimization Submodule"
    | "PC Direct-Neural Interface NeuroNet Injector"
    | "PCMatrix"
    | "ADR-V1 Pheromone Gene"
    | "ADR-V2 Pheromone Gene"
    | "The Shadow's Simulacrum"
    | "Hacknet Node CPU Architecture Neural-Upload"
    | "Hacknet Node Cache Architecture Neural-Upload"
    | "Hacknet Node NIC Architecture Neural-Upload"
    | "Hacknet Node Kernel Direct-Neural Interface"
    | "Hacknet Node Core Direct-Neural Interface"
    | "NeuroFlux Governor"
    | "Neurotrainer I"
    | "Neurotrainer II"
    | "Neurotrainer III"
    | "HyperSight Corneal Implant"
    | "LuminCloaking-V1 Skin Implant"
    | "LuminCloaking-V2 Skin Implant"
    | "HemoRecirculator"
    | "SmartSonar Implant"
    | "Power Recirculation Core"
    | "QLink"
    | "The Red Pill"
    | "SPTN-97 Gene Modification"
    | "ECorp HVMind Implant"
    | "CordiARC Fusion Reactor"
    | "SmartJaw"
    | "Neotra"
    | "Xanipher"
    | "nextSENS Gene Modification"
    | "OmniTek InfoLoad"
    | "Photosynthetic Cells"
    | "BitRunners Neurolink"
    | "The Black Hand"
    | "Unstable Circadian Modulator"
    | "CRTX42-AA Gene Modification"
    | "Neuregen Gene Modification"
    | "CashRoot Starter Kit"
    | "NutriGen Implant"
    | "INFRARET Enhancement"
    | "DermaForce Particle Barrier"
    | "Graphene BranchiBlades Upgrade"
    | "Graphene Bionic Arms Upgrade"
    | "BrachiBlades"
    | "Bionic Arms"
    | "Social Negotiation Assistant (S.N.A)"
    | "Hydroflame Left Arm"
    | "EsperTech Bladeburner Eyewear"
    | "EMS-4 Recombination"
    | "ORION-MKIV Shoulder"
    | "Hyperion Plasma Cannon V1"
    | "Hyperion Plasma Cannon V2"
    | "GOLEM Serum"
    | "Vangelis Virus"
    | "Vangelis Virus 3.0"
    | "I.N.T.E.R.L.I.N.K.E.D"
    | "Blade's Runners"
    | "BLADE-51b Tesla Armor"
    | "BLADE-51b Tesla Armor: Power Cells Upgrade"
    | "BLADE-51b Tesla Armor: Energy Shielding Upgrade"
    | "BLADE-51b Tesla Armor: Unibeam Upgrade"
    | "BLADE-51b Tesla Armor: Omnibeam Upgrade"
    | "BLADE-51b Tesla Armor: IPU Upgrade"
    | "The Blade's Simulacrum";

/**
 * Port openers to help with cracking.
 */
export type PortOpeners =
    | "BruteSSH.exe"
    | "FTPCrack.exe"
    | "relaySMTP.exe"
    | "HTTPWorm.exe"
    | "SQLInject.exe";

/**
 * All programs available.
 */
export type Programs =
    | "NUKE.exe"
    | PortOpeners
    | "DeepscanV1.exe"
    | "DeepscanV2.exe"
    | "ServerProfiler.exe"
    | "AutoLink.exe"
    | "b1t_flum3.exe"
    | "fl1ght.exe";
