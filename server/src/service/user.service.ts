import { email } from "zod";
import { BadRequestError } from "../errors/http.errors";
import { UserAttributesDto } from "../models/types/user.types";
import User from "../models/user.model";
import userRepository from "../repository/user.repository";

class UserService {
    async registerUser(userDto:UserAttributesDto): Promise<User>{
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

        return await userRepository.createUser(userData);
    }
}


export default new UserService();