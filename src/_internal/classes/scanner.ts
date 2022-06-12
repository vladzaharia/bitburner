import { NS } from "Netscript";

import { IHost } from "/_internal/interfaces/host.js";
import { canCrack } from "/helpers/crack.js";
import { canHack } from "/helpers/hack.js";

/**
 * Discovers and documents
 */
export class Scanner {
    /** The Netscript object. */
    private _ns: NS;

    /** List of workers  */
    private _workers: string[] = [];
    private _hostnames: string[] = [];
    private _hostMap: { [key: string]: IHost } = {};

    public constructor(ns: NS) {
        this._ns = ns;

        // Set up initial worker list
        this._updateWorkers();

        // Discover all hosts and routes
        this._updateHosts();
    }

    /**
     * Updates all hosts, both the `_hostnames` list and the `_hostMap` mapping.
     *
     * @returns {string[]} All discovered hostnames.
     */
    private _updateHosts(): string[] {
        const _scanHost = (hostname: string, route: string[]) => {
            this._ns.print(`[discover] Scanning ${hostname}`);

            // Update global params
            this._hostnames.push(hostname);
            this._updateHost(hostname, route);

            const hostnamesToScan = this._ns
                .scan(hostname)
                .filter(
                    (hn) => !this._isWorker(hn) && !this._hostnames.includes(hn)
                );

            for (const scanHostname of hostnamesToScan) {
                _scanHost(scanHostname, [...route, hostname]);
            }
        };

        // Start scan from home
        _scanHost("home", []);

        this._ns.print(
            `[discover] Discovered ${this._hostnames.length} hosts: ${this._hostnames}`
        );

        this._ns.print(
            `[discover] Discovered routes: ${JSON.stringify(this._hostMap)}`
        );
        return this._hostnames;
    }

    /**
     * Update host information in `_hostMap`.
     *
     * @param {string} hostname - The hostname of the host to update.
     * @param {string[]?} route - The route to host. If not provided, existing route is used.
     *
     * @returns {IHost} Host object for `hostname`, after it is updated.
     */
    private _updateHost(
        hostname: string,
        route: string[] = this._hostMap[hostname]?.route || ["home"]
    ): IHost {
        const host: IHost = {
            hostname,
            route,
            money: {
                current: this._ns.getServerMoneyAvailable(hostname),
                max: this._ns.getServerMaxMoney(hostname),
            },
            ram: {
                current: this._ns.getServerUsedRam(hostname),
                max: this._ns.getServerMaxRam(hostname),
            },
            security: {
                current: this._ns.getServerSecurityLevel(hostname),
                min: this._ns.getServerMinSecurityLevel(hostname),
                hack: this._ns.getServerRequiredHackingLevel(hostname),
            },
            capabilities: {
                crackable: canCrack(this._ns, hostname),
                rooted: this._ns.hasRootAccess(hostname),
                hackable: canHack(this._ns, hostname),
            },
        };

        return (this._hostMap[hostname] = host);
    }

    /**
     * Updates the list of purchased workers.
     *
     * @returns {string[]} Current list of workers.
     */
    private _updateWorkers(): string[] {
        this._workers = this._ns.getPurchasedServers();

        // Update host entry for each worker
        for (const hostname of this._workers) {
            this._updateHost(hostname);
        }

        return this._workers;
    }

    /**
     * Checks whether `hostname` is a worker.
     *
     * @param hostname - The hostname to check.
     * @returns {boolean} Whether the hostname is a worker or other host.
     */
    private _isWorker(hostname: string): boolean {
        // Ensure worker list is up to date
        this._updateWorkers();

        // Check against official worker list
        return this._workers.includes(hostname);
    }
}
