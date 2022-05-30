import { NS } from "Netscript";

// Base URLs
const BASE_URL = "https://bb-vlad-gg.netlify.app";
const MANIFEST_URL = `${BASE_URL}/res/manifest.json`;

/**
 * Synchronizes files with hosted version. Base URL can be passed in as `args[0]`.
 *
 * @example <caption>Synchronize with default server</caption>
 * run /sync.js
 * 
 * @example <caption>Synchronize with custom server</caption>
 * run /sync.js http://1.2.3.4:8123
 *
 * @param {NS} ns - The Netscript object.
 */
export async function main(ns: NS) {

}