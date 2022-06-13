/**
 * Represents a class capable of purchasing and selling, with a percentage of available money allocated to it.
 * @interface
 * @template P - The purchase parameters for implementing classes.
 * @template S - The sell parameters for implementing classes.
 */
export interface IPurchaseable<P> {
    /**
     * Gets the amount of money available to this store.
     *
     * @returns Available money according to specified budget.
     */
    getAvailableMoney(): number;

    /**
     * Checks whether the user can purchase based on parameters `params`.
     *
     * @param {P} params - Parameters for this transaction.
     * @returns {boolean} Whether this transaction is possible.
     */
    canPurchase(params: P): boolean;

    /**
     * Get cost of purchase with parameters `params`.
     *
     * @param {P} params - Parameters for this transaction.
     * @returns {number} Cost of the transaction.
     */
    getPurchaseCost(params: P): number;

    /**
     * Purchase an item with parameters `params` if there is money available.
     *
     * @param {P} params - Parameters for this transaction.
     * @returns {boolean} Whether the transaction was successful.
     */
    purchase(params: P): Promise<boolean>;
}

/**
 * Represents a class capable of selling, with a percentage of available money allocated to it.
 * @interface
 * @template S - The sell parameters for implementing classes.
 */
export interface ISellable<S> {
    /**
     * Sell an item with parameters `params`, if possible.
     *
     * @param {S} params - Parameters for this transaction.
     * @returns {Promise<boolean>} Whether the transaction was successful.
     */
    sell(params: S): Promise<boolean>;
}
