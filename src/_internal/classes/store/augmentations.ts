// import { NS } from "Netscript";
// import { FactionManager } from "../faction/_manager";

// import { Store } from "/_internal/classes/store/_base.js";
// import { Augmentations } from "/_internal/types/augmentations";
// import { Factions } from "/_internal/types/factions";

// /** Cost of server per GB of RAM. */
// const PRICE_PER_GB = 55000;

// /**
//  * Parameters for purchasing workers.
//  * @interface
//  */
// interface AugmentationPurchaseParams {
//     /** Name of the faction to purchase from. */
//     faction: Factions;

//     /** Name of the augmentation to purchase. */
//     augmentation: Augmentations;
// }

// /**
//  * Layer on top of `NS` to simplify augmentation purchasing.
//  * @class
//  */
// export class AugmentationStore extends Store<AugmentationPurchaseParams, null> {
//     /** Faction manager to help determine what to buy. */
//     private _factionManager: FactionManager;

//     /**
//      * Creates a new Augmentation store instance which allows for purchasing and upgrading augmentations.
//      * @constructor
//      *
//      * @param {NS} ns - The Netscript object.
//      */
//     public constructor(ns: NS) {
//         // Budget is 100% of available money
//         super(ns, 1);

//         // Set the faction manager
//         this._factionManager = new FactionManager(ns);
//     }

//     /**
//      * Get cost of purchasing a new worker with `params.ram`.
//      * @override
//      *
//      * @param {WorkerPurchaseParams} params - Parameters for this transaction.
//      * @returns {number} Cost of the transaction.
//      */
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     public override getPurchaseCost(params: WorkerPurchaseParams): number {
//         return params.ram * PRICE_PER_GB;
//     }

//     /**
//      * Gets current RAM value.
//      *
//      * @returns {number} Current RAM value based on available money.
//      */
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     public getCurrentRAM(): number {
//         return this._currentRAM;
//     }

//     /**
//      * Gets current workers.
//      *
//      * @returns {string[]} All purchased workers.
//      */
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     public getWorkers(): string[] {
//         return this._workers;
//     }

//     /**
//      * Purchase a new worker with `params.ram`.
//      * @override
//      * @async
//      *
//      * @param {WorkerPurchaseParams} params - Parameters for this transaction.
//      * @returns {Promise<boolean>} Whether the transaction was successful.
//      */
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     protected override async _purchase(
//         params: WorkerPurchaseParams
//     ): Promise<boolean> {
//         // Get worker name if not provided
//         if (!params.hostname) {
//             params.hostname = this._getWorkerName();
//         }

//         this._ns.print(
//             `[store] Purchasing new server ${params.hostname} with RAM ${params.ram}.`
//         );

//         // Purchase server
//         const result = this._ns.purchaseServer(params.hostname, params.ram);

//         // Update worker list after operation
//         this._updateWorkers();

//         return result !== "";
//     }

//     /**
//      * Sell a worker with hostnmae `params.hostname`.
//      * @override
//      * @async
//      *
//      * @param {WorkerSellParams} params - Parameters for this sale.
//      * @returns {Promise<boolean>} Whether the transaction was successful.
//      */
//     protected override async _sell(params: WorkerSellParams): Promise<boolean> {
//         this._ns.print(`[store] Selling server ${params.hostname}.`);

//         // Kill all scripts before selling
//         this._ns.killall(params.hostname);

//         // Sell server
//         const result = this._ns.deleteServer(params.hostname);

//         // Update worker list after operation
//         this._updateWorkers();

//         return result;
//     }

//     /**
//      * Check RAM level based on available money, and sell servers if needed.
//      * @async
//      *
//      * @returns {boolean} Whether servers were sold.
//      */
//     public async sellServersIfNeeded() {
//         // Update current RAM and workers
//         this._updateCurrentRAM();
//         this._updateWorkers();

//         const purchaseRAM = this._getBestRAMPurchase();
//         let result = false;

//         if (this._currentRAM < purchaseRAM) {
//             this._currentRAM = purchaseRAM;

//             this._ns.print(
//                 `[store] Can upgrade to ${purchaseRAM}, selling servers and purchasing new ones.`
//             );

//             for (const hostname of this._workers) {
//                 await this.sell({ hostname });
//                 result = true;
//             }
//         } else {
//             this._ns.print(
//                 `[store] Current RAM ${this._currentRAM} is best available.`
//             );
//         }

//         return result;
//     }

//     /**
//      * Gets best available RAM purchase.
//      *
//      * @returns {number} The best available RAM purchase, based on available money.
//      */
//     private _getBestRAMPurchase(): number {
//         for (let i = 12; i > 3; i--) {
//             const ram = Math.pow(2, i);

//             if (
//                 this.getPurchaseCost({ ram }) *
//                     this._ns.getPurchasedServerLimit() <
//                 this.getAvailableMoney()
//             ) {
//                 return ram;
//             }
//         }

//         return 8;
//     }

//     /**
//      * Verifies that the RAM is divisible by 8.
//      *
//      * @override
//      *
//      * @param {WorkerPurchaseParams} params - Parameters for this transaction.
//      * @returns {boolean} Whether the parameters are valid.
//      */
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     protected _checkParams(
//         params: WorkerPurchaseParams | WorkerSellParams
//     ): boolean {
//         let ramCheck = true;
//         let hostnameCheck = true;

//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const _isPurchaseParams = (p: any): p is WorkerPurchaseParams => {
//             return p.ram !== undefined;
//         };

//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const _isSellParams = (p: any): p is WorkerSellParams => {
//             return p.ram === undefined;
//         };

//         if (_isPurchaseParams(params)) {
//             ramCheck = params.ram % 8 === 0;
//         }

//         if (_isSellParams(params)) {
//             hostnameCheck =
//                 typeof params.hostname === "string" &&
//                 params.hostname.length > 0;
//         }

//         return ramCheck && hostnameCheck;
//     }

//     private _getWorkerName(): string {
//         return `ps-worker-${this._workers.length}`;
//     }

//     /**
//      * Update the number of workers purchased.
//      *
//      * @returns {number} The number of workers purchased.
//      */
//     private _updateWorkers(): string[] {
//         return (this._workers = this._ns.getPurchasedServers());
//     }

//     /**
//      * Update the current RAM of purchased workers.
//      *
//      * @returns {number} The RAM of the first worker if available, `this._currentRAM` otherwise.
//      */
//     private _updateCurrentRAM(): number {
//         let currentRAM = this._currentRAM;

//         // Update current workers if needed
//         this._updateWorkers();

//         if (this._workers.length > 0) {
//             currentRAM = this._ns.getServerMaxRam(this._workers[0]);
//         }

//         return (this._currentRAM = currentRAM);
//     }
// }
