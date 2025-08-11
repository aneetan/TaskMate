import { Request, Response, NextFunction } from "express";
import { validateSchema } from "../middleware/validate.middleware";
import { LoginUserInput, loginUserSchema, RegisterUserInput, registerUserSchema } from "../schemas/user.schema";
import userRepository from "../repository/user.repository";
import { BadRequestError } from "../errors/http.errors";
import jwt  from "jsonwebtoken";
import { verifyAccessToken } from "../middleware/auth.middleware";
import { redis } from "../app";
import { JwtPayload } from "@supabase/supabase-js";
import { generateJwtToken, ONE_WEEK_SECONDS } from "../utils/jwtToken";


class AuthController {
    // array syntax is used to chain multiple middleware functions before final request handler
    register = [
        validateSchema(registerUserSchema),
        //Request<Params, Query, Body>
        async(req: Request<{}, {}, RegisterUserInput['body']>, res: Response, next: NextFunction) => {
            try{
                const userDto = req.body;
                
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
        validateSchema(loginUserSchema),

        async(req:Request<{}, {}, LoginUserInput['body']>, res: Response, next: NextFunction) => {
            try{
                const {email, password} = req.body;

                const user = await userRepository.findByEmailAndPassword(email, password);
                if (!user) {
                    return res.status(401).json({error : "Authentication failed"});
                }

                const accessToken = generateJwtToken({user}, '1h');
                const refreshToken = generateJwtToken({user}, '7d');
                
                //store refresh token in redis
                await redis.set(`refreshToken:${user.id}`, refreshToken, "EX", ONE_WEEK_SECONDS); 
                res
                    .status(200)
                    .cookie("refreshToken", refreshToken, {httpOnly: true, secure: true, sameSite: "strict"})
                    .json({"message": "User logged in successfully", accessToken, id: user.id});  
            } catch (e) {
                res.status(400).json({"message": "Invalid email or password"});  
                next(e);
            }
        }
    ] 

    refresh = async(req: Request, res: Response, next: NextFunction) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({ error: "No refresh token" });
        
        const user = req.body;
        const storedToken = await redis.get(`refreshToken:${user.id}`);
        if (storedToken !== refreshToken) return res.status(403).json({ error: "Invalid refresh token" });

        const newAccessToken = generateJwtToken({user, jti: user.id}, "1h");
        const newRefreshToken = generateJwtToken({user}, "7d");

        // Update redis
        await redis.set(`refresh:${user.id}`, newRefreshToken, "EX", ONE_WEEK_SECONDS);

        res
        .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: "strict" })
        .json({ accessToken: newAccessToken, id: user.id });
        
        next();
    }

    logout = [
        verifyAccessToken,
        async (req: Request, res: Response) => {
            const userId = req.body.userId;
            const token = req.header("Authorization")?.replace("Bearer ", "");
            const decoded = jwt.decode(token!) as JwtPayload;

            // 1. Delete refresh Token
            await redis.del(`refreshToken:${userId}`);

            // 2. Blacklist access token
            const expInSeconds = decoded?.exp -Math.floor(Date.now() / 1000);
            if (expInSeconds > 0) {
                await redis.set(`blacklist:${decoded.jti}`, "true", "EX", expInSeconds);
            }

            // 3. Clear Cookie
            res.clearCookie("refreshToken").json({ message: "Logged out" });
        }
    ]
}

export default new AuthController();