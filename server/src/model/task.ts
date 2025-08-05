import { DataTypes, InitOptions, Model, ModelAttributes } from "sequelize";
import { Category, Priority, Status, TaskAttributes } from "./types/user.types";

class Task extends Model<TaskAttributes> implements TaskAttributes{
    public id !: number;
    public title !: string;
    public description?: string | undefined;
    public priority !: Priority;
    public category !: Category;
    public status !: Status;
    public due_date !: Date;
    public userId !: number;

    static initialize(sequelize: any): typeof Task{
        const attributes: ModelAttributes<Task, TaskAttributes> = {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [5, 100]
                },
            },
            description : {
                type: DataTypes.STRING,
                allowNull: true,
            },
            priority: {
                type: DataTypes.ENUM("high", "medium", 'low'),
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("todo", "in-progress", "done"),
                allowNull: false
            },
            category:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    isIn: [["personal", "work", "college", "others"]]
                }
            },
            due_date:{
                type: DataTypes.DATE,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users", //table name of users model
                    key: "id"
                }
            }
        };

        const options:InitOptions<Task> = {
            sequelize,
            tableName: "tasks",
            timestamps: true,
            paranoid: true
        };

        return Task.init(attributes, options) as typeof Task;
    }

    public static associate(models:any){
        //Each task belong to a User
        Task.belongsTo(models.User, {
            foreignKey: "userId" //same FK as in user model
        })
    }
}

export default Task;