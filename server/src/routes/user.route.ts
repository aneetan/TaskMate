import { Router } from "express";
import userController from "../controller/user.controller";

const userRouter = Router();

userRouter
    .post('/register', userController.register);


export default userRouter;