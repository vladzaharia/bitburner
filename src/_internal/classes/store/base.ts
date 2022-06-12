import { NS } from "Netscript";

import { IPurchaser } from "/_internal/interfaces/store.js";
import { sleep } from "/helpers/sleep";

/**
 * Abstract class representing an entity capable of purchasing and selling.
 * @abstract
 * @class
 * @template P - The purchase parameters for implementing classes.
 * @template S - The sell parameters for implementing classes.
 */
export abstract class Purchaser<P, S> implements IPurchaser<P, S> {
    /** The Netscript object. */
    protected _ns: NS;

    /**
     * Budget available to this purchaser.
     *
     * - If > 1, interpreted as exact budget.
     * - If < 1, interpreted as percentage of available money.
     * - Use 0 to disable purchasing.
     */
    private readonly _budget: number;

    /**
     *
     * @param {NS} ns - The Netscript object.
     * @param {number} budget - Budget, as whole number or percentage of max money.
     */
    constructor(ns: NS, budget: number) {
        this._ns = ns;
        this._budget = budget;
    }

    /**
     * Gets the amount of money available to this store.
     *
     * @returns Available money according to `this._budget`.
     */
    public getAvailableMoney(): number {
        const moneyAvail = this._ns.getServerMoneyAvailable("home");

        // Budget is whole number, return the min of it and the available money.
        if (this._budget > 1) {
            return Math.min(moneyAvail, this._budget);
        }

        // Budget is multiplier of total available money.
        return Math.floor(moneyAvail * this._budget);
    }

    /**
     * Checks whether the user can purchase based on parameters `params`.
     *
     * @param {P} params - Parameters for this transaction.
     * @returns {boolean} Whether this transaction is possible.
     */
    public canPurchase(params: P): boolean {
        this._checkParamsInternal(params);

        return this.getPurchaseCost(params) < this.getAvailableMoney();
    }

    /**
     * Get cost of purchase with parameters `params`.
     * @virtual
     *
     * @param {P} params - Parameters for this transaction.
     * @returns {number} Cost of the transaction.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getPurchaseCost(params: P): number {
        throw "Must be implemented in subclasses.";
    }

    /**
     * Purchase an item with parameters `params` if there is money available.
     *
     * @param {P} params - Parameters for this transaction.
     * @returns {Promise<boolean>} Whether the transaction was successful.
     */
    public async purchase(params: P): Promise<boolean> {
        this._checkParamsInternal(params);

        const cost = this.getPurchaseCost(params);
        const moneyAvail = this.getAvailableMoney();
        if (cost > moneyAvail) {
            this._ns.print(
                `[purchaser] Not enough money available! ${cost}/${moneyAvail}`
            );
            await sleep(this._ns, 60 * 1000);
            return false;
        }

        return await this._purchase(params);
    }

    /**
     * Purchase an item, must be overridden by implementing classes.
     * @virtual
     *
     * @param {P} params - Parameters for this transaction.
     * @returns {Promise<boolean>} Whether the transaction was successful.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async _purchase(params: P): Promise<boolean> {
        throw "Must be implemented in subclasses.";
    }

    /**
     * Sell an item with params `params`, if possible.
     *
     * @param {S} params - Parameters for this sale.
     * @returns {Promise<boolean>} Whether the transaction was successful.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async sell(params: S): Promise<boolean> {
        this._checkParamsInternal(params);

        return await this._sell(params);
    }

    /**
     * Sell an item with params `params`, must be overridden by implementing classes if supported.
     *
     * @param {S} params - Parameters for this sale.
     * @returns {Promise<boolean>} Whether the transaction was successful.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected async _sell(params: S): Promise<boolean> {
        throw "Must be implemented in subclasses.";
    }

    /**
     * Verify the purchase parameters, executed before `canPurchase`, `purchase`, and `sell`.
     *
     * @param {P | S} params - Parameters for this transaction.
     * @returns {boolean} Whether the parameters are valid.
     */
    private _checkParamsInternal(params: P | S): true {
        if (this._checkParams(params)) {
            return true;
        }

        throw "Parameters are invalid!";
    }

    /**
     * Verify the purchase parameters, must be overridden by implementing classes.
     * @virtual
     *
     * @param {P | S} params - Parameters for this transaction.
     * @returns {boolean} Whether the parameters are valid.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _checkParams(params: P | S): boolean {
        throw "Must be implemented in subclasses.";
    }
}
