import { Router } from "express";
import taskController from "../controller/task.controller";

const taskRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task CRUD endpoints (Authentication required)
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /task/add-task:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddTask'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddTask'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Invalid or missing JWT
 */

/**
 * @swagger
 * /task/{userId}:
 *   get:
 *     summary: Get all tasks for a specific user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AddTask'
 *       401:
 *         description: Unauthorized - Invalid or missing JWT
 *       403:
 *         description: Forbidden - Cannot access other user's tasks
 */

/**
 * @swagger
 * /task/edit-task/{id}:
 *   put:
 *     summary: Edit a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditTask'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditTask'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Invalid or missing JWT
 *       403:
 *         description: Forbidden - User doesn't own this task
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /task/delete-task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the task
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       401:
 *         description: Unauthorized - Invalid or missing JWT
 *       403:
 *         description: Forbidden - User doesn't own this task
 *       404:
 *         description: Task not found
 */

taskRouter.post('/add-task', taskController.addTask);
taskRouter.get('/:userId', taskController.getTasks); 
taskRouter.put('/edit-task/:id', taskController.editTask);
taskRouter.delete('/delete-task/:id', taskController.deleteTask);

export default taskRouter;