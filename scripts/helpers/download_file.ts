import { get } from "https";

/**
 * Downloads a file from `url` and passes the contents to `fn` if successful, an empty string if failed.
 *
 * @param {string} url - The URL to download file from.
 * @param {(response: string)} fn - Function to call when completed downloading.
 */
export function downloadAndProcess(url: string, fn: (res: string) => void) {
    let res = "";

    console.log(`Downloading file...`);
    get(url, (response) => {
        response.on("error", (error) => {
            console.log("Error occurred:", error);
            fn("");
        });

        response.on("data", (chunk) => {
            res += chunk;
        });

        response.on("end", () => {
            console.log(`Download completed, executing callback function`);
            fn(res);
        });
    });
}
