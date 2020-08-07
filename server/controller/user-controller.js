import authMaker from "../middlewares/auth/auth-maker";
import { ROLE_USER } from "../const";
import User from "../schema/user";
import moment from "moment";

export default {
    getUser: async (ctx) => {
        authMaker.check(ctx, ROLE_USER); //检验用户是否登录
        const users = await User.findAll({
            attributes: ["id", "name", "age", "avatar", "nickname"],
            where: {
                id: ctx.query.id,
            },
        });
        ctx.body = {
            code: 0,
            message: null,
            data: users[0],
        };
    },
    updateUserInfo: async (ctx) => {
        let data = ctx.request.body;
        authMaker.check(ctx, ROLE_USER); //检验用户是否登录
        let newData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key != "id") {
                    newData[key] = data[key];
                }
            }
        }
        const users = await User.update(newData, {
            where: {
                id: data.id,
            },
        });
        ctx.body = {
            code: 0,
            message: "修改成功",
            data: null,
        };
    },
};
