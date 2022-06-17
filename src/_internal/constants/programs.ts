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
        create: {
            skill: 50,
            time: 10 * 60 * 1000,
        },
        darkweb: {
            cost: 500000,
        },
    },
    {
        name: "FTPCrack.exe",
        create: {
            skill: 100,
            time: 30 * 60 * 1000,
        },
        darkweb: {
            cost: 1500000,
        },
    },
    {
        name: "relaySMTP.exe",
        create: {
            skill: 250,
            time: 2 * 60 * 60 * 1000,
        },
        darkweb: {
            cost: 5000000,
        },
    },
    {
        name: "HTTPWorm.exe",
        create: {
            skill: 500,
            time: 4 * 60 * 60 * 1000,
        },
        darkweb: {
            cost: 30000000,
        },
    },
    {
        name: "SQLInject.exe",
        create: {
            skill: 750,
            time: 8 * 60 * 60 * 1000,
        },
        darkweb: {
            cost: 250000000,
        },
    },
    {
        name: "DeepscanV1.exe",
        create: {
            skill: 75,
            time: 15 * 60 * 1000,
        },
        darkweb: {
            cost: 50000,
        },
    },
    {
        name: "DeepscanV2.exe",
        create: {
            skill: 400,
            time: 2 * 60 * 60 * 1000,
        },
        darkweb: {
            cost: 25000000,
        },
    },
    {
        name: "ServerProfiler.exe",
        create: {
            skill: 75,
            time: 30 * 60 * 1000,
        },
        darkweb: {
            cost: 500000,
        },
    },
    {
        name: "AutoLink.exe",
        create: {
            skill: 25,
            time: 15 * 60 * 1000,
        },
        darkweb: {
            cost: 1000000,
        },
    },
    {
        name: "Formulas.exe",
        create: {
            skill: 1000,
            time: 4 * 60 * 60 * 1000,
        },
        darkweb: {
            cost: 5000000000,
        },
    },
];

// Check if program is an opener
PROGRAMS.forEach(
    (p) => (p.isOpener = ALL_OPENERS.includes(p.name as PortOpeners))
);
