import { Router } from "express";
import authController from "../controller/auth.controller";

const authRouter = Router();

//schema => describes the shape or structure of that JSON data

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


authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);


export default authRouter;
