import Task from "../models/task.model";
import { TaskAttributes } from "../types/task.types";

class TaskRepository {
   async createTask (task: Omit<TaskAttributes ,'id'>): Promise<Task> {
      const {title, description, category, priority, status, due_date, userId} = task;

      return await Task.create({
         title, description, category, priority, status, due_date, userId
      })
   }

   async getTasks(userId: number): Promise<Task[]> {
      return await Task.findAll({
         where: {userId}
      });
   }

   async editTask(id: number, updates: Partial<TaskAttributes>): Promise<Task | null> {
      const task = await Task.findByPk(id);
      if(!task) return null;

      await task.update(updates);
      return task;
   }

   async deleteTask (id: number): Promise<boolean>{
      const deletedCount = await Task.destroy({ where: {id} });
      return deletedCount > 0;
   }
}

export default new TaskRepository();