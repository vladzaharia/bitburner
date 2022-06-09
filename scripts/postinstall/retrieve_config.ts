import { copyAndReplaceTT } from "../helpers/copy_replace";
import { downloadAndProcess } from "../helpers/download_file";

const BITBURNER_CONFIG_FILE = __dirname + "/../../bitburner-sync.json";
const VSCODE_CONFIG_FILE = __dirname + "/../../.vscode/settings.json";

/**
 * Replaces token in tt files using `replace-in-file`.
 *
 * @param {string} token
 */
const _processTransforms = (token: string, enableAuth: boolean) => {
    copyAndReplaceTT(
        VSCODE_CONFIG_FILE,
        ["[[AUTHTOKEN]]", "[[FILEWATCHER_ENABLE]]"],
        [token, `${enableAuth}`]
    );

    if (enableAuth) {
        copyAndReplaceTT(BITBURNER_CONFIG_FILE, "[[AUTHTOKEN]]", token);
    }
};

// Check for tokens in Environment variables and set auth token/sync status
if (process.env.BB_AUTH_TOKEN) {
    // Directly set token
    console.log(`Setting Bitburner token from BB_AUTH_TOKEN`);
    _processTransforms(process.env.BB_AUTH_TOKEN, true);
} else if (process.env.DOPPLER_TOKEN) {
    // Set token using Doppler
    console.log(
        `Downloading bitburner config from Doppler using DOPPLER_TOKEN`
    );
    downloadAndProcess(
        `https://${process.env.DOPPLER_TOKEN}@api.doppler.com/v3/configs/config/secrets/download?project=bitburner&config=dev&format=json&name_transformer=camel&include_dynamic_secrets=false`,
        (res: string) => {
            if (res) {
                _processTransforms(JSON.parse(res).authToken, true);
            } else {
                _processTransforms("", false);
            }
        }
    );
} else {
    // Disable file watcher extension
    console.log(
        "No Bitburner (BB_AUTH_TOKEN) or Doppler (DOPPLER_TOKEN) token found, skipping setting setup."
    );
    _processTransforms("", false);
}
