import Sequelize from "sequelize";
import sequelize from "./db.js";
import uuid from "uuid";

const Model = Sequelize.Model;
class Role extends Model {}

Role.init(
    {
        id: {
            // type: Sequelize.UUID,
            // defaultValue: uuid(),
            type: Sequelize.INTEGER,
            defaultValue: Math.floor(
                Math.random() * (99999 - 10000 + 1) + 10000
            ),
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
