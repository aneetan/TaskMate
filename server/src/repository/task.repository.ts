import Task from "../models/task.model";
import { TaskAttributes } from "../types/task.types";

class TaskRepository {
   async createTask (task: Omit<TaskAttributes ,'id'>): Promise<Task> {
      const {title, description, category, priority, status, due_date, userId} = task;

      return await Task.create({
         title, description, category, priority, status, due_date, userId
      })
   }
}

export default new TaskRepository();