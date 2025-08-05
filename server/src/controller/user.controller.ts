import { Request, Response, NextFunction } from "express";
import { UserAttributesDto } from "../models/types/user.types";
import userService from "../service/user.service";

class UserController {
    async register (req: Request, res: Response, next: NextFunction){
        try{
            const userDto = req.body as UserAttributesDto;
            const newUser = await userService.registerUser(userDto);
            
            const plainUser = newUser.get({ plain: true });      // .get({ plain: true }) returns only the raw data
            const { password, ...userWithoutPassword } = plainUser;

            res.status(201).json(userWithoutPassword);

        } catch (e){
            next(e);
        }
    }
}

export default new UserController();