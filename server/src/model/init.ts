import { Sequelize } from "sequelize";
import Task from "./task";
import User from "./user";

interface Models {
    User: typeof User;
    Task: typeof Task;
}

export function initializeModels(sequelize: Sequelize): Models{
    //Initialize models as
    const models: Models = {
        User: User.initialize(sequelize),
        Task: Task.initialize(sequelize),
    };

    //set up associations
    Object.values(models).forEach(model => {
        if(model.associate){
            model.associate(models);
        }
    });

    return models;
}

export type {Models}