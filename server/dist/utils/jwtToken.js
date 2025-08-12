"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = exports.ONE_WEEK_SECONDS = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
exports.ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;
const generateJwtToken = (payload, expiresIn = "1h") => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JSON_SECRET_KEY is missing in environment variables.");
    }
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};
exports.generateJwtToken = generateJwtToken;
