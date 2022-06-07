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
    | "Fulcrum Secret Technologies";

/**
 * All companies, including MegaCorporations.
 */
export type Companies = "" | MegaCorporations;

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
