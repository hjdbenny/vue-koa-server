import jwt from "jsonwebtoken";
import config from "../config.js";
import userService from "../service/user-service";
import utils from "../utils.js";

export default {
    getAuth: async (ctx, next) => {
        const auth = ctx.request.body;
        const user = await userService.checkUser(auth.name);
        if (!user) {
            ctx.throw("4010::用户名错误");
        } else {
            let curPassword = utils.md5Password(auth.password);
            if (user.password != curPassword) {
                ctx.throw("4011::密码错误");
            }
        }
        const roles = await userService.getRoles(user.id); // 获取用户具有的role
        const token = {
            id: user.id,
            name: user.name,
            password: user.password,
            roles: roles,
        };
        // 签名token，返回
        ctx.body = {
            code: 0,
            message: null,
            data: {
                token: jwt.sign(token, config.SECRET, {
                    expiresIn: config.EXP_TIME,
                }),
                userInfo: {
                    id: user.id,
                    name: user.name,
                    roles: roles,
                },
            },
        };
    },
};
