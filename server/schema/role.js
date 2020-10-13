import Sequelize from "sequelize";
import sequelize from "./db.js";
import utils from "../utils.js";

const Model = Sequelize.Model;
class Role extends Model {}

Role.init(
    {
        id: {
            type: Sequelize.INTEGER,
            defaultValue: utils.createId(),
            primaryKey: true,
        },
        uid: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "role",
    }
);

Role.sync({ alter: true }).then(() => {
    console.log("== Table: Role init!");
});

export default Role;
