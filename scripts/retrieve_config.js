//Load the library and specify options
const replace = require('replace-in-file');
const https = require('https');
const fs = require('fs');

if (!process.env.DOPPLER_TOKEN) {
    console.error("No Doppler token found!");
} else {
    const file = fs.createWriteStream(__dirname + "/../bitburner-sync.json");
    const url = `https://${process.env.DOPPLER_TOKEN}@api.doppler.com/v3/configs/config/secrets/download?project=bitburner&config=dev&format=json&name_transformer=camel&include_dynamic_secrets=false`;

    let config = "";

    console.log(`Downloading bitburner config from Doppler`);
    const request = https.get(url, (response) => {
        response.on("error", (err) => {
            console.error(err);
        })

        response.on("data", (data) => config += data);

        response.on("end", () => {
            console.log("Download completed");
            const parsedConfig = JSON.parse(config);

            fs.copyFile(__dirname + "/../.vscode/settings.json.tt", __dirname + "/../.vscode/settings.json", (err) => {
                if (err) {
                    console.error(err);
                }

                const options = {
                    files: __dirname + "/../.vscode/settings.json",
                    from: "[[AUTHTOKEN]]",
                    to: parsedConfig.authToken
                };

                try {
                    replace(options).then((response) => {
                        console.log('Replacement results:', response);
                    }, () => {
                        console.error('Error occurred:', error);
                    });
                }
                catch (error) {
                    console.error('Error occurred:', error);
                }
            });

            // TODO add auth token to settings.json.tt
            file.write(JSON.stringify(parsedConfig, null, 4));
            file.close();
        });
    });
}
