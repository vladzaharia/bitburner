import { RunnerScripts, WorkerScripts } from "/_internal/types/scripts.js";

export const HACK_SCRIPT: WorkerScripts = "/_workers/hack.js";

/** Path to weaken script to execute on hosts. */
export const WEAKEN_SCRIPT: WorkerScripts = "/_workers/weaken.js";

/** Path to grow script to execute on hosts. */
export const GROW_SCRIPT: WorkerScripts = "/_workers/grow.js";

/** All worker scripts. */
export const WORKER_SCRIPTS: WorkerScripts[] = [
    HACK_SCRIPT,
    WEAKEN_SCRIPT,
    GROW_SCRIPT,
];

/** Default worker script weights. */
export const DEFAULT_WEIGHTS: { [key: string]: number } = {};
DEFAULT_WEIGHTS[HACK_SCRIPT] = 25;
DEFAULT_WEIGHTS[WEAKEN_SCRIPT] = 25;
DEFAULT_WEIGHTS[GROW_SCRIPT] = 50;

/** All runners to execute. */
export const RUNNERS: RunnerScripts[] = [
    "cracker.js",
    "worker.js",
    "scheduler.js",
    "hacknet.js",
];

/** Advanced runners to execute, if possible. */
export const ADVANCED_RUNNERS: RunnerScripts[] = [
    "sf4/backdoor-cracker.js",
    "sf4/home.js",
    "sf4/joiner.js",
    "sf4/focus.js",
];
