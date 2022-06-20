import { NS } from "Netscript";

import { Store } from "/_internal/classes/store/_base.js";
import { ALL_OPENERS } from "/_internal/constants/programs.js";
import { Programs } from "/_internal/types/programs.js";

type HomeUpgrade = Programs | "ram" | "tor";

/**
 * Parameters for Home upgrades.
 * @interface
 */
interface HomeParams {
    upgrade: HomeUpgrade;
}

/**
 * Layer on top of `NS` and `Hacknet` to simplify upgrades on "home".
 *
 * **Note:** Requires access to `singularity` functions, either in BN4 or with SF4.
 *
 * @class
 */
export class HomeStore extends Store<HomeParams, null> {
    /**
     * Creates a new Home store which allows for upgrading RAM and purchasing darkweb upgrades.
     * @constructor
     *
     * @param {NS} ns - The Netscript object.
     */
    public constructor(ns: NS) {
        // Budget is 100% of money
        super(ns, 1);
    }

    /**
     * Checks that user can buy "tor" or Darkweb programs.
     * @override
     *
     * @param {HomeParams} params - Parameters for this transaction.
     * @returns {boolean} Whether the user can purchase this upgrade.
     */
    public override canPurchase(params: HomeParams): boolean {
        // Get money-related purchase check
        const superResult = super.canPurchase(params);
        const hasDarkweb =
            this._ns.singularity.getDarkwebProgramCost("Formulas.exe") !== -1;

        switch (params.upgrade) {
            case "ram":
                return superResult;
            case "tor":
                return superResult && !hasDarkweb;
            case "BruteSSH.exe":
            case "FTPCrack.exe":
            case "relaySMTP.exe":
            case "HTTPWorm.exe":
            case "SQLInject.exe":
            case "ServerProfiler.exe":
            case "DeepscanV1.exe":
            case "DeepscanV2.exe":
            case "AutoLink.exe":
            case "Formulas.exe":
                return (
                    superResult &&
                    hasDarkweb &&
                    this.getPurchaseCost(params) > 0
                );
            default:
                throw new Error("Unkown upgrade!");
        }
    }

    /**
     * Gets purchase cost of upgrade, either "ram" for home RAM, "tor" for Tor router, or a program name.
     * @override
     *
     * @param {HomeParams} params - The parameters for this transaction.
     * @returns {number} The cost of this upgrade.
     */
    public override getPurchaseCost(params: HomeParams): number {
        switch (params.upgrade) {
            case "ram":
                return this._ns.singularity.getUpgradeHomeRamCost();
            case "tor":
                return 200000;
            case "BruteSSH.exe":
            case "FTPCrack.exe":
            case "relaySMTP.exe":
            case "HTTPWorm.exe":
            case "SQLInject.exe":
            case "ServerProfiler.exe":
            case "DeepscanV1.exe":
            case "DeepscanV2.exe":
            case "AutoLink.exe":
            case "Formulas.exe":
                return this._ns.singularity.getDarkwebProgramCost(
                    params.upgrade
                );
            default:
                throw new Error("Unkown upgrade!");
        }
    }

    /**
     * Gets the cheapest available upgrade.
     *
     * **Note:** Will not include utility programs (AutoLink.exe, etc).
     *
     * @returns {HomeUpgrade | null} The cheapest upgrade, either "ram", "tor", or a program name. `null` if none is purchaseable.
     */
    public getCheapestUpgrade(): HomeUpgrade | null {
        const upgrades: HomeUpgrade[] = ["ram", "tor", ...ALL_OPENERS];
        let cheapestUpgrade: HomeUpgrade | null = null;
        let cheapestCost = Infinity;

        // Find cheapest upgrade.
        for (const upgrade of upgrades) {
            const cost = Math.ceil(this.getPurchaseCost({ upgrade }));

            this._ns.print(
                `[store] ${upgrade}: cost ${cost}, available ${this.canPurchase(
                    { upgrade }
                )}`
            );

            if (
                cost > 0 &&
                cost < cheapestCost &&
                this.canPurchase({ upgrade })
            ) {
                cheapestUpgrade = upgrade;
                cheapestCost = cost;
            }
        }

        return cheapestUpgrade;
    }

    /**
     * Purchase an upgrade, using `singularity` functions.
     * @override
     * @async
     *
     * @param {HomeParams} params - The parameters of this transaction.
     * @returns {Promise<boolean>} Whether the purchase was successful.
     */
    protected override async _purchase(params: HomeParams): Promise<boolean> {
        this._ns.toast(`Purchasing ${params.upgrade} on home`, "success");

        switch (params.upgrade) {
            case "ram":
                return this._ns.singularity.upgradeHomeRam();
            case "tor":
                return this._ns.singularity.purchaseTor();
            case "BruteSSH.exe":
            case "FTPCrack.exe":
            case "relaySMTP.exe":
            case "HTTPWorm.exe":
            case "SQLInject.exe":
            case "ServerProfiler.exe":
            case "DeepscanV1.exe":
            case "DeepscanV2.exe":
            case "AutoLink.exe":
            case "Formulas.exe":
                return this._ns.singularity.purchaseProgram(params.upgrade);
            default:
                throw new Error("Unkown upgrade!");
        }
    }
}
