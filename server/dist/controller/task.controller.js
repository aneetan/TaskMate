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
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const task_repository_1 = __importDefault(require("../repository/task.repository"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMessage_1 = require("../helpers/errorMessage");
const task_schema_1 = require("../schemas/task.schema");
dotenv_1.default.config();
class TaskController {
    constructor() {
        this.addTask = [
            (0, validate_middleware_1.validateSchema)(task_schema_1.addTaskSchema),
            auth_middleware_1.verifyAccessToken,
            (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const taskDto = req.body;
                    const taskData = {
                        title: taskDto.title,
                        description: taskDto.description,
                        priority: taskDto.priority,
                        status: taskDto.status,
                        category: taskDto.category,
                        due_date: taskDto.due_date,
                        userId: taskDto.userId
                    };
                    const newTask = yield task_repository_1.default.createTask(taskData);
                    res.status(201).json({ newTask, message: "Task created successfully" });
                }
                catch (e) {
                    (0, errorMessage_1.errorResponse)(e, res, "Error while adding task");
                    next(e);
                }
            })
        ];
        this.getTasks = [
            auth_middleware_1.verifyAccessToken,
            (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const userId = Number(req.params.userId);
                    const tasks = yield task_repository_1.default.getTasks(userId);
                    res.status(200).json(tasks);
                }
                catch (e) {
                    (0, errorMessage_1.errorResponse)(e, res, "Error while retrieving tasks");
                    next(e);
                }
            })
        ];
        this.editTask = [
            (0, validate_middleware_1.validateSchema)(task_schema_1.editTaskSchema),
            auth_middleware_1.verifyAccessToken,
            (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const taskId = parseInt(req.params.id, 10);
                    if (isNaN(taskId))
                        return res.status(400).json({ error: "Invalid task ID" });
                    const updates = req.body;
                    const updatedTask = yield task_repository_1.default.editTask(taskId, updates);
                    if (!updatedTask)
                        return res.status(404).json({ error: "Task not found" });
                    res.status(200).json({ message: "Task updated successfully", task: updatedTask });
                }
                catch (e) {
                    next(e);
                }
            })
        ];
        this.deleteTask = [
            auth_middleware_1.verifyAccessToken,
            (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const taskId = parseInt(req.params.id, 10);
                    if (isNaN(taskId))
                        return res.status(400).json({ error: "Invalid task ID" });
                    const deletedCount = yield task_repository_1.default.deleteTask(taskId);
                    if (deletedCount === false)
                        return res.status(400).json({ error: "Task not found" });
                    res.status(200).json({ message: "User deleted successfully" });
                }
                catch (e) {
                    next(e);
                }
            })
        ];
    }
}
exports.default = new TaskController();
