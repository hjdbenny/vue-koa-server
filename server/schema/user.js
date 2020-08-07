import Sequelize from "sequelize";
import sequelize from "./db.js";
import uuid from "uuid";
import moment from "moment";

const Model = Sequelize.Model;
class User extends Model {}
User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            // defaultValue: uuid(),
            defaultValue: Math.floor(
                Math.random() * (99999 - 10000 + 1) + 10000
            ),
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nickname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        age: {
            type: Sequelize.INTEGER,
            defaultValue: Math.floor(Math.random() * (100 - 1 + 1) + 1),
        },
        avatar: {
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
        modelName: "user",
    }
);
User.sync({ alter: true }).then(() => {
    console.log("== Table: User init!");
});

export default User;
