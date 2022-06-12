import { NS } from "Netscript";

import { Purchaser } from "/_internal/classes/store/base.js";

/** Cost of server per GB of RAM. */
const PRICE_PER_GB = 55000 * 25;

/**
 * Parameters for purchasing workers.
 * @interface
 */
interface WorkerPurchaseParams {
    /** RAM of the server to purchase */
    ram: number;

    /** Hostname of the worker to purchase. */
    hostname?: string;
}

/**
 * Parameters for selling workers.
 * @interface
 */
interface WorkerSellParams {
    /** Hostname of the worker to sell. */
    hostname: string;
}

/**
 * Layer on top of `NS` to simplify worker management.
 * @class
 */
export class WorkerPurchaser extends Purchaser<
    WorkerPurchaseParams,
    WorkerSellParams
> {
    /** Current number of nodes purchased. */
    private _workers: string[] = [];

    /** Current RAM count */
    private _currentRAM = 8;

    /**
     * Creates a new Hacknet instance which allows for purchasing and upgrading nodes.
     *
     * @param {NS} ns - The Netscript object.
     */
    public constructor(ns: NS) {
        // Budget is 50% of available money
        super(ns, 0.5);

        // Set the purchased workers
        this._updateWorkers();

        // Set the current RAM
        this._updateCurrentRAM();
    }

    /**
     * Get cost of purchasing a new worker with `params.ram`.
     * @virtual
     *
     * @param {WorkerPurchaseParams} params - Parameters for this transaction.
     * @returns {number} Cost of the transaction.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public override getPurchaseCost(params: WorkerPurchaseParams): number {
        return params.ram * PRICE_PER_GB;
    }

    /**
     * Purchase a new worker with `params.ram`.
     * @virtual
     *
     * @param {WorkerPurchaseParams} params - Parameters for this transaction.
     * @returns {Promise<boolean>} Whether the transaction was successful.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected override async _purchase(
        params: WorkerPurchaseParams
    ): Promise<boolean> {
        return (
            this._ns.purchaseServer(params.hostname as string, params.ram) !==
            ""
        );
    }

    /**
     * Sell a worker with hostnmae `params.hostname`.
     *
     * @param {WorkerSellParams} params - Parameters for this sale.
     * @returns {Promise<boolean>} Whether the transaction was successful.
     */
    protected override async _sell(params: WorkerSellParams): Promise<boolean> {
        // Kill all scripts before selling
        this._ns.killall(params.hostname);

        return this._ns.deleteServer(params.hostname);
    }

    /**
     * Check RAM level based on available money, and sell servers if needed.
     *
     * @returns {boolean} Whether servers were sold.
     */
    public async sellServersIfNeeded() {
        // Update current RAM if needed
        this._updateCurrentRAM();

        const purchaseRAM = this._getBestRAMPurchase();
        let result = false;

        if (this._currentRAM < purchaseRAM) {
            this._ns.print(
                `[purchaser] Can upgrade to ${purchaseRAM}, selling servers and purchasing new ones.`
            );

            for (const hostname of this._workers) {
                await this.sell({ hostname });
                result = true;
            }
        } else {
            this._ns.print(
                `[purchaser] Current RAM ${this._currentRAM} is best available.`
            );
        }

        return result;
    }

    /**
     * Gets best available RAM purchase.
     *
     * @returns {number} The best available RAM purchase, based on available money.
     */
    private _getBestRAMPurchase(): number {
        for (let i = 3; i < 13; i++) {
            const ram = Math.pow(2, i);

            if (this.getPurchaseCost({ ram }) < this.getAvailableMoney()) {
                return ram;
            }
        }

        return 8;
    }

    /**
     * Verifies that the RAM is divisible by 8.
     *
     * @override
     *
     * @param {WorkerPurchaseParams} params - Parameters for this transaction.
     * @returns {boolean} Whether the parameters are valid.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _checkParams(
        params: WorkerPurchaseParams | WorkerSellParams
    ): boolean {
        let ramCheck = true;
        let hostnameCheck = true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _isPurchaseParams = (p: any): p is WorkerPurchaseParams => {
            return p.ram !== undefined;
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _isSellParams = (p: any): p is WorkerSellParams => {
            return p.ram === undefined;
        };

        if (_isPurchaseParams(params)) {
            ramCheck = params.ram % 8 === 0;
        }

        if (_isSellParams(params)) {
            hostnameCheck =
                typeof params.hostname === "string" &&
                params.hostname.length > 0;
        }

        return ramCheck && hostnameCheck;
    }

    /**
     * Update the number of workers purchased.
     *
     * @returns {number} The number of workers purchased.
     */
    private _updateWorkers(): string[] {
        return (this._workers = this._ns.getPurchasedServers());
    }

    /**
     * Update the current RAM of purchased workers.
     *
     * @returns {number} The RAM of the first worker if available, `this._currentRAM` otherwise.
     */
    private _updateCurrentRAM(): number {
        let currentRAM = this._currentRAM;

        // Update current workers if needed
        this._updateWorkers();

        if (this._workers.length > 0) {
            currentRAM = this._ns.getServerMaxRam(this._workers[0]);
        }

        return (this._currentRAM = currentRAM);
    }
}
