import { NS } from "Netscript";

import { IPurchaser } from "/_internal/interfaces/purchaser.js";

/**
 * Abstract class representing an entity capable of purchasing using parameters `T`.
 *
 * @template T
 */
export abstract class Purchaser<T> implements IPurchaser<T> {
    /** The Netscript object. */
    protected _ns: NS;

    /**
     * Budget available to this purchaser.
     *
     * If > 1, interpreted as exact budget.
     * If < 1, interpreted as percentage of available money, use 0 for none.
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
     * Gets the amount of money available to this purchaser.
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
        return moneyAvail * this._budget;
    }

    /**
     * Checks whether the user can purchase based on parameters `T`.
     *
     * @param {T} params - Parameters for this transaction.
     * @returns {boolean} Whether this transaction is possible.
     */
    public canPurchase(params: T): boolean {
        return this.getPurchaseCost(params) < this.getAvailableMoney();
    }

    /**
     * Get cost of purchase with parameters `T`.
     * @virtual
     *
     * @param {T} params - Parameters for this transaction.
     * @returns {number} Cost of the transaction.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getPurchaseCost(params: T): number {
        throw "Must be implemented in subclasses.";
    }

    /**
     * Purchase an item with parameters `T` if there is money available.
     *
     * @param {T} params - Parameters for this transaction.
     * @returns {boolean} Whether the transaction was successful.
     */
    public purchase(params: T): boolean {
        const cost = this.getPurchaseCost(params);
        const moneyAvail = this.getAvailableMoney();
        if (cost < moneyAvail) {
            this._ns.print(`[purchaser] Not enough money available!`);
            return false;
        }

        return this._purchase(params);
    }

    /**
     * Purchase an item, must be overridden by implementing classes.
     * @virtual
     *
     * @param {T} params - Parameters for this transaction.
     * @returns {boolean} Whether the transaction was successful.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _purchase(params: T): boolean {
        throw "Must be implemented in subclasses.";
    }
}
