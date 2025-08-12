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
const task_model_1 = __importDefault(require("../models/task.model"));
class TaskRepository {
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, category, priority, status, due_date, userId } = task;
            return yield task_model_1.default.create({
                title, description, category, priority, status, due_date, userId
            });
        });
    }
    getTasks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.default.findAll({
                where: { userId }
            });
        });
    }
    editTask(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield task_model_1.default.findByPk(id);
            if (!task)
                return null;
            yield task.update(updates);
            return task;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield task_model_1.default.destroy({ where: { id } });
            return deletedCount > 0;
        });
    }
}
exports.default = new TaskRepository();
