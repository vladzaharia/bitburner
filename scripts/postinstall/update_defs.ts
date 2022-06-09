import { copyAndReplaceTT } from "../helpers/_copy_replace";
import { downloadAndProcess } from "../helpers/_download_file";

const NETSCRIPT_DEFS_FILE = __dirname + "/../../src/lib/Netscript.d.ts";

// Download defs file and create Netscript.d.ts
downloadAndProcess(
    "https://raw.githubusercontent.com/danielyxie/bitburner/dev/src/ScriptEditor/NetscriptDefinitions.d.ts",
    (res: string) => {
        if (res) {
            copyAndReplaceTT(NETSCRIPT_DEFS_FILE, "[[DEFS]]", res);
        } else {
            copyAndReplaceTT(NETSCRIPT_DEFS_FILE, "[[DEFS]]", "");
        }
    }
);
