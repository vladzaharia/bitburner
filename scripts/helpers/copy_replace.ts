import { copyFile, existsSync } from "fs";
import { ReplaceInFileConfig, replaceInFile } from "replace-in-file";

/**
 * Copy `file`.tt to `file` and replace any instances of `search` with `replacement` using `replace-in-file`.
 * If `search` is an array, will replace all instances with single or corresponding `replacement`.
 *
 * @param {string} file - Final filename, requires `file`.tt to exist.
 * @param {string | RegExp | string[] | RegExp[]} search - String(s) to search for.
 * @param {} replacement - Replacement(s) for `search` matches.
 */
export function copyAndReplaceTT(
    file: string,
    search: string | RegExp | string[] | RegExp[],
    replacement: string | string[]
) {
    const ttFile = `${file}.tt`;

    if (!existsSync(ttFile)) {
        throw new Error(`TT file ${ttFile} must exist!`);
    }

    copyFile(ttFile, file, (err) => {
        if (err) {
            console.error(err);
        }

        const options: ReplaceInFileConfig = {
            files: file,
            from: search,
            to: replacement,
        };

        try {
            replaceInFile(options).then(
                (response) => {
                    console.log("Replacement results:", response);
                },
                (error) => {
                    console.error("Error occurred:", error);
                }
            );
        } catch (error) {
            console.error("Error occurred:", error);
        }
    });
}
