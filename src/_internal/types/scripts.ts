/** All scripts that can be run on workers. */
export type WorkerScripts =
    | "/_workers/hack.js"
    | "/_workers/weaken.js"
    | "/_workers/grow.js";

/** All scripts that can be run automatically. */
export type RunnerScripts =
    | "cracker.js"
    | "worker.js"
    | "scheduler.js"
    | "hacknet.js"
    | "sf4/backdoor-cracker.js"
    | "sf4/home.js"
    | "sf4/joiner.js"
    | "sf4/focus.js";

/** All scripts. */
export type Scripts = WorkerScripts | RunnerScripts;
