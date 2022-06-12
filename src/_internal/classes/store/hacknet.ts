import { Hacknet, NS, NodeStats } from "Netscript";

import { Store } from "/_internal/classes/store/base.js";
import { HacknetUpgrade } from "/_internal/types/hacknet.js";
import { sleep } from "/helpers/sleep";

/**
 * Parameters for Hacknet upgrades.
 * @interface
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
 * @class
 */
export class HacknetPurchaser extends Store<HacknetParams, null> {
    /** Hacknet object within NS. */
    private readonly _hacknet: Hacknet;

    /** Current number of nodes purchased. */
    private _numNodes = 0;

    /** Base node (index 0) to use for upgrades. */
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
        this._updateNumNodes();

        // Buy first node if needed
        if (this._numNodes === 0) {
            this._purchaseNode();
            this.purchase({ index: 0, upgrade: "level", num: 4 });
        }

        // Set the base node statistics
        this._baseNode = this._updateBaseNodeStats();
    }

    /**
     * Gets the price of a hacknet upgrade, multiplied by number of nodes.
     * @override
     *
     * @param {string} upgrade - Hacknet upgrade to purchase.
     * @returns {number} The price of the upgrade.
     */
    public override getPurchaseCost(
        params: HacknetParams,
        useNodes = false
    ): number {
        const { upgrade, index, num } = params;

        switch (upgrade) {
            case "level":
                return (
                    Math.ceil(
                        this._hacknet.getLevelUpgradeCost(index || 0, num || 5)
                    ) * (useNodes ? this._numNodes : 1)
                );
            case "ram":
                return (
                    Math.ceil(
                        this._hacknet.getRamUpgradeCost(index || 0, num || 1)
                    ) * (useNodes ? this._numNodes : 1)
                );
            case "cores":
                return (
                    Math.ceil(
                        this._hacknet.getCoreUpgradeCost(index || 0, num || 1)
                    ) * (useNodes ? this._numNodes : 1)
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
     * @async
     *
     * @param {number} index
     * @param {string} upgrade
     * @param {levels} levels
     * @throws If trying to upgrade "node" or unknown upgrade type.
     */
    protected override async _purchase(
        params: HacknetParams
    ): Promise<boolean> {
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
            case "cores":
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
            this._updateBaseNodeStats();
        }

        return result;
    }

    /**
     * Upgrade `upgrade` stat on all nodes by `levels` amount.
     * @async
     *
     * @param {HacknetParams} params - Parameters for purchasing.
     * @param {number} num - Number of upgrades to apply to all nodes.
     * @returns {Promise<boolean>} Whether the upgrades were successful.
     * @throws If trying to upgrade "node".
     */
    public async purchaseOnAllNodes(params: HacknetParams): Promise<boolean> {
        const { upgrade, num } = params;

        if (upgrade === "node") {
            throw "Upgrade not possible!";
        }

        const result: boolean[] = [];

        this._ns.print(
            `[store] Purchasing ${upgrade}x${num || 1} on all nodes`
        );
        for (let index = 0; index < this._numNodes; index++) {
            result.push(await this.purchase({ index, upgrade, num: num || 1 }));
        }

        return result.every((r) => r);
    }

    /**
     * Upgrade all nodes to base node stats, if needed.
     * @async
     *
     * @param {number} index - The index of the node to upgrade.
     */
    public async upgradeAllNodesToBaseline(): Promise<boolean> {
        const result: boolean[] = [];

        for (let i = 0; i < this._numNodes; i++) {
            const node = this._hacknet.getNodeStats(i);

            if (node.production < this._baseNode.production) {
                result.push(await this._upgradeNodeToBaseline(i));
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
        this._updateNumNodes();

        this._ns.print(
            `[store] Purchased new node, new count: ${this._numNodes}`
        );

        return result !== -1;
    }

    /**
     * Upgrade node `index` to base node stats.
     * @async
     *
     * @param {number} index - The index of the node to upgrade.
     */
    private async _upgradeNodeToBaseline(index: number): Promise<boolean> {
        this._ns.print(`[store] Upgrading ${index} to baseline stats`);

        const node = this._hacknet.getNodeStats(index);
        const upgrades: HacknetUpgrade[] = ["level", "ram", "cores"];
        const result: boolean[] = [];

        for (const upgrade of upgrades) {
            const nodeLevel = node[upgrade];
            const baseNodeLevel = this._baseNode[upgrade];

            if (nodeLevel < baseNodeLevel) {
                this._ns.print(
                    `[store] Upgrading ${upgrade} ${nodeLevel} -> ${baseNodeLevel}`
                );

                let levelDiff = baseNodeLevel - nodeLevel;
                if (upgrade === "ram") {
                    levelDiff = Math.log2(baseNodeLevel) - Math.log2(nodeLevel);
                }

                result.push(
                    await this._purchase({ index, upgrade, num: levelDiff })
                );
            }
        }

        return result.every((r) => r);
    }

    /**
     * Verifies the Hacknet purchase transaction.
     *
     * If `upgrade` is set to "node", checks that `index` is unset.
     * Otherwise, checks if `index` is set.
     *
     * @override
     *
     * @param {HacknetParams} params - Parameters for this transaction.
     * @returns {boolean} Whether the parameters are valid.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _checkParams(params: HacknetParams): boolean {
        switch (params.upgrade) {
            case "node":
                return params.index === undefined;
            case "level":
            case "ram":
            case "cores":
                return params.index !== undefined;
            default:
                return false;
        }
    }

    /**
     * Update the number of nodes purchased.
     *
     * @returns {number} The number of nodes purchased.
     */
    private _updateNumNodes(): number {
        return (this._numNodes = this._hacknet.numNodes());
    }

    /**
     * Update the base node stats.
     *
     * @returns {NodeStats} The statistics of the base node.
     */
    private _updateBaseNodeStats(): NodeStats {
        return (this._baseNode = this._hacknet.getNodeStats(0));
    }
}
