import { Hacknet, NS, NodeStats } from "Netscript";

import { Purchaser } from "/_internal/classes/purchaser/base.js";
import { HacknetUpgrade } from "/_internal/types/hacknet.js";
import { sleep } from "/helpers/sleep";

/**
 * Parameters for Hacknet upgrades.
 */
interface HacknetParams {
    /** Which upgrade to purchase. */
    upgrade: HacknetUpgrade;

    /** Index of node to upgrade, if not upgrading `node`. */
    index?: number;

    /** Number of upgrades to purchase, if not upgrading `node`. */
    num?: number;
}

/**
 * Layer on top of `NS` and `Hacknet` to simplify node management.
 */
export class HacknetPurchaser extends Purchaser<HacknetParams> {
    private readonly _hacknet: Hacknet;
    private _numNodes = 0;
    private _baseNode: NodeStats;

    /**
     * Creates a new Hacknet instance which allows for purchasing and upgrading nodes.
     *
     * @param {NS} ns - The Netscript object.
     */
    public constructor(ns: NS) {
        // Budget is 5% of available money
        super(ns, 0.05);

        // Set NS global objects
        this._hacknet = ns.hacknet;

        // Set the number of nodes purchased
        this._setNumNodes();

        // Buy first node if needed
        if (this._numNodes === 0) {
            this._purchaseNode();
            this.purchase({ index: 0, upgrade: "level", num: 4 });
        }

        // Set the base node statistics
        this._baseNode = this._setBaseNodeStats();
    }

    /**
     * Gets the price of a hacknet upgrade, multiplied by number of nodes.
     * @override
     *
     * @param {string} upgrade - Hacknet upgrade to purchase.
     * @returns {number} The price of the upgrade.
     */
    public override getPurchaseCost(params: HacknetParams): number {
        const { upgrade, num } = params;

        switch (upgrade) {
            case "level":
                return (
                    Math.ceil(this._hacknet.getLevelUpgradeCost(0, num || 5)) *
                    this._numNodes
                );
            case "ram":
                return (
                    Math.ceil(this._hacknet.getRamUpgradeCost(0, num || 1)) *
                    this._numNodes
                );
            case "core":
                return (
                    Math.ceil(this._hacknet.getCoreUpgradeCost(0, num || 1)) *
                    this._numNodes
                );
            case "node":
                return Math.ceil(this._hacknet.getPurchaseNodeCost());
            default:
                throw "Upgrade not possible!";
        }
    }

    /**
     * Upgrade `upgrade` stat on `index` node by `levels` amount.
     * @override
     *
     * @param {number} index
     * @param {string} upgrade
     * @param {levels} levels
     * @throws If trying to upgrade "node" or unknown upgrade type.
     */
    protected override _purchase(params: HacknetParams): boolean {
        const { upgrade, index, num } = params;
        const indexAsNumber = index as number;
        const numAsNumber = num as number;

        let result = false;

        switch (upgrade) {
            case "level":
                result = this._hacknet.upgradeLevel(indexAsNumber, numAsNumber);
                break;
            case "ram":
                result = this._hacknet.upgradeRam(indexAsNumber, numAsNumber);
                break;
            case "core":
                result = this._hacknet.upgradeCore(indexAsNumber, numAsNumber);
                break;
            case "node":
                result = this._purchaseNode();
                break;
            default:
                throw "Upgrade not possible!";
        }

        // If updating the base note, update the node stats as well
        if (index === 0) {
            this._setBaseNodeStats();
        }

        return result;
    }

    /**
     * Upgrade `upgrade` stat on all nodes by `levels` amount.
     *
     * @param {HacknetParams} params - Parameters for purchasing.
     * @param {number} num - Number of upgrades to apply to all nodes.
     * @returns {boolean} Whether the upgrades were successful.
     * @throws If trying to upgrade "node".
     */
    public purchaseOnAllNodes(params: HacknetParams): boolean {
        const { upgrade, num } = params;

        if (upgrade === "node") {
            throw "Upgrade not possible!";
        }

        const result: boolean[] = [];

        this._ns.print(
            `[hacknet] Purchasing ${upgrade}x${num || 1} on all nodes`
        );
        for (let index = 0; index < this._numNodes; index++) {
            result.push(this.purchase({ index, upgrade, num: num || 1 }));
        }

        return result.every((r) => r);
    }

    /**
     * Upgrade all nodes to base node stats, if needed.
     *
     * @param {number} index - The index of the node to upgrade.
     */
    public async upgradeAllNodesToBaseline(): Promise<boolean> {
        const result: boolean[] = [];

        for (let i = 0; i < this._numNodes; i++) {
            const node = this._hacknet.getNodeStats(i);

            if (node.production < this._baseNode.production) {
                result.push(this._upgradeNodeToBaseline(i));
                await sleep(this._ns, 1000, false);
            }
        }

        return result.every((r) => r);
    }

    /**
     * Purchase a new node.
     */
    private _purchaseNode() {
        const result = this._hacknet.purchaseNode();
        this._setNumNodes();

        this._ns.print(
            `[hacknet] Purchased new node, new count: ${this._numNodes}`
        );

        return result !== -1;
    }

    /**
     * Upgrade node `index` to base node stats.
     *
     * @param {number} index - The index of the node to upgrade.
     */
    private _upgradeNodeToBaseline(index: number): boolean {
        this._ns.print(`[hacknet] Upgrading ${index} to baseline stats`);

        const node = this._hacknet.getNodeStats(index);
        const upgrades: HacknetUpgrade[] = ["level", "ram", "core"];
        const result: boolean[] = [];

        for (const upgrade of upgrades) {
            const nodeLevel = node[upgrade];
            const baseNodeLevel = this._baseNode[upgrade];

            if (nodeLevel < baseNodeLevel) {
                this._ns.print(
                    `[hacknet] Upgrading ${upgrade} ${nodeLevel} -> ${baseNodeLevel}`
                );

                let levelDiff = baseNodeLevel - nodeLevel;
                if (upgrade === "ram") {
                    levelDiff = Math.log2(baseNodeLevel) - Math.log2(nodeLevel);
                }

                result.push(this._purchase({ index, upgrade, num: levelDiff }));
            }
        }

        return result.every((r) => r);
    }

    /**
     * Update the number of nodes purchased.
     *
     * @returns {number} The number of nodes purchased.
     */
    private _setNumNodes(): number {
        return (this._numNodes = this._hacknet.numNodes());
    }

    /**
     * Update the base node stats.
     *
     * @returns {NodeStats} The statistics of the base node.
     */
    private _setBaseNodeStats(): NodeStats {
        return (this._baseNode = this._hacknet.getNodeStats(0));
    }
}
