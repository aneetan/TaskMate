import { Request, Response, NextFunction } from "express";
import { UserAttributesDto, UserLoginDto } from "../models/types/user.types";
import userService from "../service/user.service";
import { validate } from "../middleware/validate.middleware";
import { LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema } from "../schemas/user.schema";
import userRepository from "../repository/user.repository";
import { BadRequestError } from "../errors/http.errors";

class UserController {
    // array syntax is used to chain multiple middleware functions before final request handler
    register = [
        validate(registerUserSchema),
        //Request<Params, Query, Body>
        async(req: Request<{}, {}, RegisterUserInput['body']>, res: Response, next: NextFunction) => {
            try{
                const userDto = req.body as UserAttributesDto;
                
                //validate password match
                if(userDto.password !== userDto.confirmPassword){
                    throw new BadRequestError("Password doesn't match");
                }

                const existingUser = await userRepository.findByEmail(userDto.email);
                if(existingUser){
                    throw new BadRequestError("Email already in use")
                }

                const userData = {
                    fullName: userDto.fullName,
                    email: userDto.email,
                    password: userDto.password
                };

                const newUser = await userRepository.createUser(userData);
                
                const plainUser = newUser.get({ plain: true });      // .get({ plain: true }) returns only the raw data
                const { password, ...userWithoutPassword } = plainUser;

                res.status(201).json(userWithoutPassword);

            } catch (e){
                const errorMessage = e instanceof Error ? e.message : 'Error while registering user';
                res.status(400).json({"message": errorMessage});  
                next(e);
            }
        }
    ];

    login = [
        validate(loginUserSchema),

        async(req:Request<{}, {}, LoginUserInput['body']>, res: Response, next: NextFunction) => {
            try{
                const userDto = req.body as UserLoginDto;
                const loginData = {
                    email: userDto.email,
                    password: userDto.password
                }
        
                const user = await userRepository.findByEmailAndPassword(userDto.email, userDto.password);
                if (!user) {
                    throw new BadRequestError("Invalid email or password");
                }
                res.status(201).json({"message": "User logged in successfully"});  

            } catch (e) {
                res.status(400).json({"message": "Invalid email or password"});  
                next(e);
            }
        }
    ]

    
     
}

export default new UserController();