import { Router } from "express";
import taskController from "../controller/task.controller";

const taskRouter = Router();

taskRouter.post('/add-task', taskController.addTask);
taskRouter.get('/:userId', taskController.getTasks);
taskRouter.put('/edit-task/:id', taskController.editTask);
taskRouter.delete('/delete-task/:id', taskController.deleteTask);

export default taskRouter;
