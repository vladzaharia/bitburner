import { IProgram } from "/_internal/interfaces/program.js";
import { PortOpeners } from "/_internal/types/programs.js";

/**
 * All openers to use.
 */
export const ALL_OPENERS: PortOpeners[] = [
    "BruteSSH.exe",
    "FTPCrack.exe",
    "relaySMTP.exe",
    "HTTPWorm.exe",
    "SQLInject.exe",
];

export const PROGRAMS: IProgram[] = [
    {
        name: "BruteSSH.exe",
        cost: 500000,
        hack: 50,
    },
    {
        name: "FTPCrack.exe",
        cost: 1500000,
        hack: 100,
    },
    {
        name: "relaySMTP.exe",
        cost: 5000000,
        hack: 250,
    },
    {
        name: "HTTPWorm.exe",
        cost: 30000000,
        hack: 500,
    },
    {
        name: "SQLInject.exe",
        cost: 250000000,
        hack: 750,
    },
    {
        name: "DeepscanV1.exe",
        cost: 50000,
        hack: 75,
    },
    {
        name: "DeepscanV2.exe",
        cost: 25000000,
        hack: 400,
    },
    {
        name: "ServerProfiler.exe",
        cost: 500000,
        hack: 75,
    },
    {
        name: "AutoLink.exe",
        cost: 1000000,
        hack: 25,
    },
    {
        name: "Formulas.exe",
        cost: 5000000000,
        hack: 1000,
    },
];

PROGRAMS.forEach(
    (p) => (p.isOpener = ALL_OPENERS.includes(p.name as PortOpeners))
);
