import { Router } from "express";
import userController from "../controller/user.controller";

const userRouter = Router();

/**
 * @swagger
 * tags:
 *  name:Users
 */

/**
 * @swagger
 * /users/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:     
 *                      $ref: '#/schemas/RegisterUser'
 *      responses:
 *          201:
 *              description: User registered successfully
 *              content:
 *                  application/json
 *          400:
 *              description: Validation Error
 *
 */

//schema => describes the shape or structure of that JSON data
userRouter
    .post('/register', userController.register);

userRouter
    .post('/login', userController.login);


export default userRouter;
