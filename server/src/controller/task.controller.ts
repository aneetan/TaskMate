import { NextFunction, Request, Response } from "express";
import { validateSchema } from "../middleware/validate.middleware";
import { addTasksSchema, AddTaskUserInput } from "../schemas/task.schema";
import { verifyAccessToken } from "../middleware/auth.middleware";
import taskRepository from "../repository/task.repository";
import dotenv from "dotenv";
import { errorResponse } from "../helpers/errorMessage";
import { TaskAttributes } from "../types/task.types";

dotenv.config();

class TaskController {
   addTask = [
      validateSchema(addTasksSchema),
      verifyAccessToken,
      async(req: Request<{}, {}, AddTaskUserInput['body']>, res: Response, next: NextFunction) => {
         try{
            const taskDto = req.body;

            const taskData = {
               title: taskDto.title,
               description: taskDto.description,
               priority: taskDto.priority,
               status: taskDto.status,
               category: taskDto.category,
               due_date: taskDto.due_date,
               userId: taskDto.userId
            }

            const newTask = await taskRepository.createTask(taskData);

            res.status(201).json({newTask, message: "Task created successfully"});
         } catch (e) {
            errorResponse(e, res, "Error while adding task"); 
            next(e);
         }
      }
   ]

   getTasks = [
      verifyAccessToken,
      async (req: Request, res: Response, next: NextFunction){
         try{
            const tasks: TaskAttributes[] = await taskRepository.getTasks();
            res.status(200).json(tasks);
         } catch (e) {
            errorResponse(e, res, "Error while retrieving tasks"); 
            next(e);
         }
      }
   ]

   editTask = [
      validateSchema,
      verifyAccessToken,
      async(req: Request<{ id: string }, {}, Partial<TaskAttributes>>, res: Response, next: NextFunction) => {
         try {
            const taskId = parseInt(req.params.id, 10);
            if (isNaN(taskId)) return res.status(400).json({ error: "Invalid task ID" });

            const updates = req.body;
            const updatedTask = await taskRepository.editTask(taskId, updates);
            if (!updatedTask) return res.status(404).json({ error: "Task not found" });

            res.status(200).json({message: "Task updated successfully", task: updatedTask});

         } catch(e) {
            next(e);
         }
      }
   ]

   deleteTask = [
      verifyAccessToken,
      async(req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) => {
         try {
            const taskId = parseInt(req.params.id, 10);
            if (isNaN(taskId)) return res.status(400).json({ error: "Invalid task ID" });

            const deletedCount = await taskRepository.deleteTask(taskId);
            if(deletedCount === false) return res.status(400).json({ error: "Task not found" });
            
            res.status(200).json({message: "User deleted successfully"});
         } catch(e) {
            next(e);
         }
      }
   ]
   

}

export default new TaskController();