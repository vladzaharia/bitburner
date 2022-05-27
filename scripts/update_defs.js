//Load the library and specify options
const replace = require('replace-in-file');
const https = require('https');
const fs = require('fs');

let def = "";
const url = "https://raw.githubusercontent.com/danielyxie/bitburner/dev/src/ScriptEditor/NetscriptDefinitions.d.ts";

console.log(`Downloading definition file from ${url}`);
const request = https.get(url, (response) => {
    response.on("error", (err) => {
        console.error(err);
    })

    response.on("data", (chunk) => {
        def += chunk;
    });

    response.on("end", () => {
        console.log("Download completed, creating file from Netscript.d.ts.tt");

        fs.copyFile(__dirname + "/../src/lib/Netscript.d.ts.tt", __dirname + "/../src/lib/Netscript.d.ts", (err) => {
            if (err) {
                console.error(err);
            }

            const options = {
                files: __dirname + "/../src/lib/Netscript.d.ts",
                from: "[[DEFS]]",
                to: def
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
    });
});



