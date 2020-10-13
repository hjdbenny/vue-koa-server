import authMaker from "../middlewares/auth/auth-maker";
import { ROLE_USER } from "../const";
import Article from "../schema/articel";
import utils from "../utils";
import moment from "moment";

export default {
    // 获取文章列表
    getArticleList: async (ctx) => {
        authMaker.check(ctx, ROLE_USER); //检验用户是否登录
        let pageNumber = +ctx.query.pageNumber;
        let pageSize = +ctx.query.pageSize;
        const articles = await Article.findAndCountAll({
            attributes: [
                "id",
                "title",
                "content",
                "author",
                "html",
                "updateTime",
            ],
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
        });
        ctx.body = {
            code: 0,
            message: null,
            data: {
                datas: articles.rows,
                pageNumber: pageNumber,
                pageSize: pageSize,
                tottalRecords: articles.count,
            },
        };
    },
    // 根据id获取文章
    getArticle: async (ctx) => {
        authMaker.check(ctx, ROLE_USER); //检验用户是否登录
        const article = await Article.findAll({
            attributes: [
                "id",
                "title",
                "content",
                "author",
                "html",
                "updateTime",
            ],
            where: {
                id: ctx.query.id,
            },
        });
        ctx.body = {
            code: 0,
            message: null,
            data: article[0],
        };
    },
    // 新增文章
    addArticle: async (ctx) => {
        authMaker.check(ctx, ROLE_USER); //检验用户是否登录
        let id = utils.createId();
        while (await utils.idExits(Article, id)) {
            id = utils.createId();
        }
        let data = ctx.request.body;
        await Article.create({
            id: id,
            title: data.title,
            content: data.content,
            author: data.author,
            createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            updateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
        ctx.body = {
            code: 0,
            message: "新增成功",
            data: id,
        };
    },
    // 更新文章
    updateArticle: async (ctx) => {
        authMaker.check(ctx, ROLE_USER); //检验用户是否登录
        let data = ctx.request.body;
        let newData = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key != "id") {
                    newData[key] = data[key];
                }
            }
        }
        newData.updateTime = moment().format("YYYY-MM-DD HH:mm:ss");
        await Article.update(newData, {
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
    // 根据id删除文章
    deleteArticle: async (ctx) => {
        await Article.destroy({
            where: {
                id: ctx.request.body.id,
            },
        });
        ctx.body = {
            code: 0,
            message: "删除成功",
            data: null,
        };
    },
};
