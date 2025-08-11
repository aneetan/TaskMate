import { Router } from "express";
import taskController from "../controller/task.controller";

const taskRouter = Router();

taskRouter.post('/add-task', taskController.addTask);

export default taskRouter;
