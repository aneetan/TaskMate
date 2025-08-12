"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
    static initialize(sequelize) {
        const attributes = {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [5, 100]
                },
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            priority: {
                type: sequelize_1.DataTypes.ENUM("high", "medium", 'low'),
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.ENUM("todo", "in-progress", "done"),
                allowNull: false
            },
            category: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [["personal", "work", "college", "others"]]
                }
            },
            due_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
            }
        };
        const options = {
            sequelize,
            tableName: "tasks",
            timestamps: true,
            paranoid: true
        };
        return Task.init(attributes, options);
    }
    static associate(models) {
        //Each task belong to a User
        Task.belongsTo(models.User, {
            foreignKey: "userId" //same FK as in user model
        });
    }
}
exports.default = Task;
