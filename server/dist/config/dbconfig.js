"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const init_1 = require("../models/init");
dotenv_1.default.config();
// const sequelize = new Sequelize(
//         process.env.DB_NAME || 'taskmate',
//         process.env.DB_USERNAME || '' ,
//         process.env.DB_PASSWORD,
//     {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     logging: false
//     }
// )
const sequelize = new sequelize_1.Sequelize(process.env.SUPABASE_DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        //Initialize the models
        (0, init_1.initializeModels)(sequelize);
        //sync all models
        yield sequelize.sync({ alter: true });
    }
    catch (error) {
        console.error("Failed to connect to the database:", error);
    }
});
exports.connectToDatabase = connectToDatabase;
exports.default = sequelize;
