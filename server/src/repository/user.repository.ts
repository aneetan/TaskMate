import { UserAttributes } from "../models/types/user.types";
import User from "../models/user.model";

class UserRepository {
    async findByEmail(email:string): Promise<User | null> {
        return await User.findOne({where:{ email }});
    }

    async createUser(userData: Omit<UserAttributes , 'id'>): Promise<User> {
        const {fullName, email, password} = userData;

        return await User.create({  
            fullName,
            email,
            password
        });
    }
}

export default new UserRepository();