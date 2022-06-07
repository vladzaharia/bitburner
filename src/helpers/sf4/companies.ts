import { Companies } from "/helpers/sf4/_types.js";

/**
 * A company that can be worked at.
 */
export interface Company {
    name: Companies;
    enemies: Companies[];
    money: number;
}
