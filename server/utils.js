import crypto from "crypto";
export default {
    errMsg: (code, msg) => {
        return { code: code, message: msg };
    },
    md5Password: (password) => {
        return crypto
            .createHash("md5")
            .update(password)
            .digest("hex");
    },
};
