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
    | "ADR-V1 Pheromone Gene"
    | "ADR-V2 Pheromone Gene"
    | "Artificial Bio-neural Network Implant"
    | "Artificial Synaptic Potentiation"
    | "Augmented Targeting I"
    | "Augmented Targeting II"
    | "Augmented Targeting III"
    | "Bionic Arms"
    | "Bionic Legs"
    | "Bionic Spine"
    | "BitRunners Neurolink"
    | "BitWire"
    | "BrachiBlades"
    | "CashRoot Starter Kit"
    | "Combat Rib I"
    | "Combat Rib II"
    | "Combat Rib III"
    | "CordiARC Fusion Reactor"
    | "Cranial Signal Processors - Gen I"
    | "Cranial Signal Processors - Gen II"
    | "Cranial Signal Processors - Gen III"
    | "Cranial Signal Processors - Gen IV"
    | "Cranial Signal Processors - Gen V"
    | "CRTX42-AA Gene Modification"
    | "DataJack"
    | "DermaForce Particle Barrier"
    | "ECorp HVMind Implant"
    | "Embedded Netburner Module"
    | "Embedded Netburner Module Analyze Engine"
    | "Embedded Netburner Module Core Implant"
    | "Embedded Netburner Module Core V2 Upgrade"
    | "Embedded Netburner Module Core V3 Upgrade"
    | "Embedded Netburner Module Direct Memory Access Upgrade"
    | "Enhanced Myelin Sheathing"
    | "Enhanced Social Interaction Implant"
    | "FocusWire"
    | "Graphene Bionic Arms Upgrade"
    | "Graphene Bionic Legs Upgrade"
    | "Graphene Bionic Spine Upgrade"
    | "Graphene Bone Lacings"
    | "Graphene BranchiBlades Upgrade"
    | "Hacknet Node Cache Architecture Neural-Upload"
    | "Hacknet Node Core Direct-Neural Interface"
    | "Hacknet Node CPU Architecture Neural-Upload"
    | "Hacknet Node Kernel Direct-Neural Interface"
    | "Hacknet Node NIC Architecture Neural-Upload"
    | "HemoRecirculator"
    | "Here comes the data!"
    | "HyperSight Corneal Implant"
    | "INFRARET Enhancement"
    | "LuminCloaking-V1 Skin Implant"
    | "LuminCloaking-V2 Skin Implant"
    | "Nanofiber Weave"
    | "NEMEAN Subdermal Weave"
    | "Neotra"
    | "Neural Accelerator"
    | "Neural-Retention Enhancement"
    | "Neuralstimulator"
    | "Neuregen Gene Modification"
    | "Neuronal Densification"
    | "Neurotrainer I"
    | "Neurotrainer II"
    | "Neurotrainer III"
    | "nextSENS Gene Modification"
    | "Nuoptimal Nootropic Injector Implant"
    | "NutriGen Implant"
    | "OmniTek InfoLoad"
    | "PC Direct-Neural Interface"
    | "PC Direct-Neural Interface NeuroNet Injector"
    | "PC Direct-Neural Interface Optimization Submodule"
    | "Photosynthetic Cells"
    | "Power Recirculation Core"
    | "QLink"
    | "SmartJaw"
    | "SmartSonar Implant"
    | "Social Negotiation Assistant (S.N.A)"
    | "Speech Enhancement"
    | "Speech Processor Implant"
    | "SPTN-97 Gene Modification"
    | "Synaptic Enhancement Implant"
    | "Synfibril Muscle"
    | "Synthetic Heart"
    | "The Black Hand"
    | "The Red Pill"
    | "The Shadow's Simulacrum"
    | "TITN-41 Gene-Modification Injection"
    | "Wired Reflexes"
    | "Xanipher";
