import koaRouter from "koa-router";
import auth from "./controller/auth-controller.js";
import user from "./controller/user-controller.js";
import common from "./controller/common-controller";
import article from "./controller/article-controller";

const router = koaRouter();
router.prefix("/api"); //对所有路由添加'/api'前缀

router.post("/auth", auth.getAuth); // 指定访问'/api/auth'的请求由auth.getAuth方法处理

router.get("/user/getUserInfo", user.getUser);
router.post("/user/updateUserInfo", user.updateUserInfo);

router.post("/common/uploadImage", common.uploadImage);

router.get("/article/getArticle", article.getArticle);
router.post("/article/addArticle", article.addArticle);
router.post("/article/updateArticle", article.updateArticle);
router.get("/article/getArticleList", article.getArticleList);
router.delete("/article/deleteArticle", article.deleteArticle);

export default router;
