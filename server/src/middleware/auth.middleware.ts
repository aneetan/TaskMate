import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { redis } from "../app";

export const verifyAccessToken = async(req: Request, res: Response, next: NextFunction ) => {
    const token = req.header("Authorization")?.replace('Bearer ', '');

    if(!token) return res.status(401).json({error: "Authentication Failed"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as jwt.JwtPayload;

        const isBlacklisted = await redis.get(`blacklist:${decoded.jti}`);
        if (isBlacklisted) return res.status(401).json({ error: "Token revoked" });
        
        res.locals.user = decoded.user;
        next();
    } catch(e) {
        res.status(401).json({error: e instanceof Error? e: 'Invalid token' })
    }
};