import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
        process.env.DB_NAME || 'taskmate',
        process.env.DB_USERNAME || '' ,
        process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false
    }
)

export const connectToDatabase = async():Promise<void> => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false});
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
};


export default sequelize;