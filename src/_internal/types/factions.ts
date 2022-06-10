import { Cities } from "/_internal/types/cities.js";
import { MegaCorporations } from "/_internal/types/companies.js";

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
