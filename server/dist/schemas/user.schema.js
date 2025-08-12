"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         fullName:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 *         confirmPassword:
 *           type: string
 *           minLength: 8
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 */
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z.string()
            .min(5, "Full name must be at least 5 characters")
            .max(100, "Full name must be less that 100 characters"),
        email: zod_1.z.string()
            .email("Invalid email address"),
        password: zod_1.z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: zod_1.z.string()
    }).refine(data => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ["confirmPassword"]
    })
});
exports.loginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string()
            .email("Invalid email address"),
        password: zod_1.z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
    })
});
