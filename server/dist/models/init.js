"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeModels = initializeModels;
const task_model_1 = __importDefault(require("./task.model"));
const user_model_1 = __importDefault(require("./user.model"));
function initializeModels(sequelize) {
    //Initialize models as
    const models = {
        User: user_model_1.default.initialize(sequelize),
        Task: task_model_1.default.initialize(sequelize),
    };
    //set up associations
    Object.values(models).forEach(model => {
        if (model.associate) {
            model.associate(models);
        }
    });
    return models;
}
