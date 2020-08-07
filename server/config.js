import fs from "fs";
import path from "path";

let secretPath = "secrets";

export default {
    SECRET: fs.readFileSync(path.resolve(__dirname, secretPath, "jwt-key.txt")),
    EXP_TIME: "1h",
    DATA_BASE: JSON.parse(
        fs.readFileSync(path.resolve(__dirname, secretPath, "db.json"))
    ),
};
