import { NS } from "Netscript";

import { IHost } from "/_internal/interfaces/host.js";
import { getPortOpeners } from "/helpers/crack.js";

import { ScanType } from "../types/scanner";

/**
 * Discovers and documents
 */
export class Scanner {
    /** The Netscript object. */
    private _ns: NS;

    /** List of purchased workers. */
    private _workers: string[] = [];

    /** All known hostnames. */
    private _hostnames: string[] = [];

    /** Mapping to `IHost` object containing information on the hosts. */
    private _hostMap: { [key: string]: IHost } = {};

    /**
     *
     */
    public constructor(ns: NS) {
        this._ns = ns;

        // Set up initial worker list
        this._updateWorkers();

        // Discover all hosts and routes
        this._updateHosts();
    }

    /**
     * Get host object for `hostname`.
     *
     * @param {string} hostname - The hostname to update and lookup.
     * @returns {IHost} The host object for `hostname`.
     */
    public getHost(hostname: string): IHost {
        // Update host before returning
        this._updateHost(hostname);

        return this._hostMap[hostname];
    }

    /**
     * Get all host objects based on provided `scanType`.
     *
     * @param {ScanType} scanType - The scan to perform.
     * @returns {IHost[]} All host objects, according to the `scanType`.
     */
    public getHosts(scanType: ScanType): IHost[] {
        // Update hosts before retrieving
        this._updateHosts();

        // Start with all host objects
        const allHosts: IHost[] = Object.values(this._hostMap);

        // Filter based on scan type
        switch (scanType) {
            case "all":
                return allHosts;
            case "worker":
                return allHosts.filter(({ hostname }) =>
                    this._isWorker(hostname)
                );
            case "crackable":
            case "hackable":
            case "rooted":
                return allHosts.filter(
                    ({ capabilities }) => capabilities[scanType]
                );
            default:
                throw new Error("Unknown scan type!");
        }
    }

    /**
     * Get all hostnames based on provided `scanType`.
     *
     * @param {ScanType} scanType - The scan to perform.
     * @returns {IHost[]} All hostnames, according to the `scanType`.
     */
    public getHostnames(scanType: ScanType): string[] {
        return this.getHosts(scanType).map(({ hostname }) => hostname);
    }

    /**
     * Updates all hosts, both the `_hostnames` list and the `_hostMap` mapping.
     *
     * @returns {string[]} All discovered hostnames.
     */
    private _updateHosts(): string[] {
        const _scanHost = (hostname: string, route: string[]) => {
            // Update global params
            this._hostnames.push(hostname);
            this._updateHost(hostname, [...route, hostname]);

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
                rooted:
                    this._ns.hasRootAccess(hostname) &&
                    !this._isWorker(hostname, false),
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
    private _isWorker(hostname: string, updateWorker = true): boolean {
        if (updateWorker) {
            // Ensure worker list is up to date
            this._updateWorkers();
        }

        // Check against official worker list
        return this._workers.includes(hostname);
    }
}

/**
 * Check if `hostname` can be cracked by current port openers.
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to check.
 * @returns {boolean} Whether `hostname` can be cracked.
 */
export function canCrack(ns: NS, hostname: string): boolean {
    return getPortOpeners(ns).length >= ns.getServerNumPortsRequired(hostname);
}

/**
 * Check if `hostname` can be hacked by current hacking level.
 * @export
 *
 * @param {NS} ns - The Netscript object.
 * @param {string} hostname - The hostname to check.
 * @returns {boolean} Whether `hostname` can be cracked.
 */
export function canHack(ns: NS, hostname: string): boolean {
    return (
        ns.hasRootAccess(hostname) &&
        ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(hostname) &&
        !hostname.startsWith("ps-")
    );
}
