"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        const attributes = {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fullName: {
                type: sequelize_1.DataTypes.STRING,
                validate: {
                    len: [5, 100]
                },
                allowNull: false
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                validate: {
                    isEmail: true
                },
                unique: true,
                allowNull: false
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                set(value) {
                    const hashed = bcryptjs_1.default.hashSync(value, 10);
                    this.setDataValue('password', hashed);
                }
            }
        };
        const options = {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: false,
            defaultScope: {
                attributes: { exclude: ['password'] }
            },
            scopes: {
                withPassword: {
                    attributes: { include: ['password'] }
                }
            }
        };
        return User.init(attributes, options);
    }
    static associate(models) {
        //A user has many Tasks
        User.hasMany(models.Task, {
            foreignKey: 'userId', //name of FK in task table
        });
    }
}
exports.default = User;
