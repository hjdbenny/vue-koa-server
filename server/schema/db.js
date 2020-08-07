import Sequelize from "sequelize";
import config from "../config.js";

const dbConfig = config.DATA_BASE;
const sequelize = new Sequelize(
    `mysql://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.schema}`,
    {
        pool: {
            //数据库连接池
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        timezone: dbConfig.timezone,
        logging: false, //sql语句不在控制台显示
    }
);
export default sequelize;
