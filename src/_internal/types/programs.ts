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
    | "fl1ght.exe"
    | "Formulas.exe";
