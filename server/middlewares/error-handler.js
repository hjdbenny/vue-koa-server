import utils from "../utils.js";

export default async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        // ctx.status = e.statusCode || e.status || 200; //捕获异常并设置statusCode，默认500
        ctx.status = 200;
        let [code, msg] = e.message.split("::");
        ctx.body = utils.errMsg(Number(code), msg);
        // switch (ctx.status) {
        //     case 401: // 对401权限错误设置指示“系统接受认证方式”的header
        //         ctx.set({ "WWW-Authenticate": "Bearer " });
        //         break;
        // }
    }
};
