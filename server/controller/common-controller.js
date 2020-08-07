import authMaker from "../middlewares/auth/auth-maker";
import { ROLE_USER } from "../const";
import fs from "fs";
import path from "path";

// 使用 createWriteStream 写入数据，然后使用管道流pipe拼接
function writeImageStream(ctx, file, fileReader, fileResource) {
    const writeStream = fs.createWriteStream(fileResource);
    fileReader.pipe(writeStream);
    ctx.body = {
        code: 0,
        message: null,
        data: `http://${ctx.host}/images/${file.name}`,
    };
}

export default {
    // 上传单个文件
    uploadImage: async (ctx) => {
        authMaker.check(ctx, ROLE_USER); //检验用户是否登录
        const file = ctx.request.files.file; // 获取上传文件
        // 读取文件流
        const fileReader = fs.createReadStream(file.path);
        // 设置文件保存路径
        let filePath = path.join(__dirname, "../static/images/");
        // 组装成绝对路径
        const fileResource = filePath + `${file.name}`;

        // 判断 /static/images 文件夹是否存在，如果不在的话就创建一个
        if (!fs.existsSync(filePath)) {
            fs.mkdir(filePath, (err) => {
                if (err) {
                    ctx.throw("4016::创建静态资源文件夹失败");
                    throw new Error(err);
                } else {
                    writeImageStream(ctx, file, fileReader, fileResource);
                }
            });
        } else {
            writeImageStream(ctx, file, fileReader, fileResource);
        }
    },
};
