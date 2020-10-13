import Sequelize from "sequelize";
import sequelize from "./db.js";
import moment from "moment";
import utils from "../utils.js";

const Model = Sequelize.Model;
class Article extends Model {}
Article.init(
    {
        id: {
            type: Sequelize.INTEGER,
            defaultValue: utils.createId(),
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        html: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createTime: {
            type: Sequelize.STRING,
            defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        updateTime: {
            type: Sequelize.STRING,
            defaultValue: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
    },
    {
        sequelize,
        modelName: "article",
    }
);
Article.sync({ alter: true }).then(() => {
    console.log("== Table: Article init!");
});

export default Article;
