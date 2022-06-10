/**
 * Represents a class capable of purchasing, with a percentage of available money allocated to it.
 * @interface
 * @template T
 */
export interface IPurchaser<T> {
    /**
     * Gets the amount of money available to this purchaser.
     *
     * @returns Available money according to specified budget.
     */
    getAvailableMoney(): number;

    /**
     * Checks whether the user can purchase based on parameters `T`.
     *
     * @param {T} params - Parameters for this transaction.
     * @returns {boolean} Whether this transaction is possible.
     */
    canPurchase(params: T): boolean;

    /**
     * Get cost of purchase with parameters `T`.
     *
     * @param {T} params - Parameters for this transaction.
     * @returns {number} Cost of the transaction.
     */
    getPurchaseCost(params: T): number;

    /**
     * Purchase an item with parameters `T` if there is money available.
     *
     * @param {T} params - Parameters for this transaction.
     * @returns {boolean} Whether the transaction was successful.
     */
    purchase(params: T): boolean;
}
