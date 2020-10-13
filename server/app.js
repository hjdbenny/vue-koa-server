import Koa from "koa";
// import koaBodyParser from "koa-bodyparser";
import json from "koa-json";
import path from "path";
import errorHandler from "./middlewares/error-handler.js";
import jwtResolver from "./middlewares/auth/jwt-resolver.js";
import router from "./router.js";
import cors from "koa2-cors";
import koaStatic from "koa-static";
import koaBody from "koa-body";
import helmet from "koa-helmet";

const app = new Koa();

app.use(
    cors({
        exposeHeaders: [
            "WWW-Authenticate",
            "Server-Authorization",
            "x-show-msg",
        ],
    })
);
app.use(helmet());
app.use(koaStatic(__dirname + "/static")); // static文件夹用于保存上传的文件,也是静态资源地址
app.use(errorHandler);
app.use(
    koaBody({
        multipart: true,
        parsedMethods: ["POST", "PUT", "PATCH", "DELETE"],
        formidable: {
            maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        },
    })
);
// app.use(koaBodyParser());
app.use(json());
app.use(jwtResolver);
app.use(async (ctx, next) => {
    ctx.body = { msg: "Hello World", path: ctx.path, method: ctx.method };
    await next();
});
app.use(router.routes());

app.listen(3000);
