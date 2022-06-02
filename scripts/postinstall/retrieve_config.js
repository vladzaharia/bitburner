//Load the library and specify options
const replace = require("replace-in-file");
const https = require("https");
const fs = require("fs");

const BITBURNER_CONFIG_FILE = __dirname + "/../../bitburner-sync.json";
const VSCODE_CONFIG_FILE = __dirname + "/../../.vscode/settings.json";

if (!process.env.DOPPLER_TOKEN) {
    console.error("No Doppler token found!");
} else {
    const url = `https://${process.env.DOPPLER_TOKEN}@api.doppler.com/v3/configs/config/secrets/download?project=bitburner&config=dev&format=json&name_transformer=camel&include_dynamic_secrets=false`;

    let config = "";

    console.log(`Downloading bitburner config from Doppler`);
    const request = https.get(url, (response) => {
        response.on("error", (err) => {
            console.error(err);
        });

        response.on("data", (data) => (config += data));

        response.on("end", () => {
            console.log("Download completed");
            const parsedConfig = JSON.parse(config);

            fs.copyFile(
                VSCODE_CONFIG_FILE + ".tt",
                VSCODE_CONFIG_FILE,
                (err) => {
                    if (err) {
                        console.error(err);
                    }

                    const options = {
                        files: VSCODE_CONFIG_FILE,
                        from: "[[AUTHTOKEN]]",
                        to: parsedConfig.authToken,
                    };

                    try {
                        replace(options).then(
                            (response) => {
                                console.log("Replacement results:", response);

                                fs.copyFile(
                                    BITBURNER_CONFIG_FILE + ".tt",
                                    BITBURNER_CONFIG_FILE,
                                    (err) => {
                                        if (err) {
                                            console.error(err);
                                        }

                                        const options = {
                                            files: BITBURNER_CONFIG_FILE,
                                            from: "[[AUTHTOKEN]]",
                                            to: parsedConfig.authToken,
                                        };

                                        try {
                                            replace(options).then(
                                                (response) => {
                                                    console.log(
                                                        "Replacement results:",
                                                        response
                                                    );
                                                },
                                                () => {
                                                    console.error(
                                                        "Error occurred:",
                                                        error
                                                    );
                                                }
                                            );
                                        } catch (error) {
                                            console.error(
                                                "Error occurred:",
                                                error
                                            );
                                        }
                                    }
                                );
                            },
                            () => {
                                console.error("Error occurred:", error);
                            }
                        );
                    } catch (error) {
                        console.error("Error occurred:", error);
                    }
                }
            );
        });
    });
}
