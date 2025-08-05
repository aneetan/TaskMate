import { DataTypes, InitOptions, Model, ModelAttributes } from "sequelize";
import { UserAttributes } from "./types/user.types";
import bcrypt from 'bcrypt';

class User extends  Model<UserAttributes, Omit<UserAttributes, 'id'>> implements UserAttributes {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public password!: string;


    static initialize(sequelize: any): typeof User{
        const attributes: ModelAttributes<User, UserAttributes> = {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fullName: {
                type: DataTypes.STRING,
                validate: {
                    len: [5, 100]
                },
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                validate:{
                    isEmail: true
                },
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value : string){
                    const hashed: string = bcrypt.hashSync(value, 10);
                    this.setDataValue('password', hashed);
                }
            }
        };

        const options:InitOptions<User> = {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: false,
            defaultScope: {
                attributes: { exclude : ['password'] }
            },
            scopes: {
                withPassword: {
                    attributes: { include: ['password'] }
                }
            }
        };

        return User.init(attributes, options) as typeof User;
    }

    public static associate(models: any){
        //A user has many Tasks
        User.hasMany(models.Task, {
            foreignKey: 'userId', //name of FK in task table
        });
    }
}

export default User;