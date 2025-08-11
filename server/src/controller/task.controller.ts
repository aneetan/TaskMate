import { NextFunction, Request, Response } from "express";
import { validateSchema } from "../middleware/validate.middleware";
import { addTasksSchema, AddTaskUserInput } from "../schemas/task.schema";
import { verifyAccessToken } from "../middleware/auth.middleware";
import taskRepository from "../repository/task.repository";
import dotenv from "dotenv";

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
            const errorMessage = e instanceof Error ? e.message : 'Error while registering user';
            res.status(400).json({"message": errorMessage});  
            next(e);
         }
      }
   ]
   

}

export default new TaskController();