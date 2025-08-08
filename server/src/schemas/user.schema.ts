import { z } from "zod";

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
 */
export const registerUserSchema = z.object({
    body: z.object({
        fullName: z.string()
            .min(5, "Full name must be at least 5 characters")
            .max(100, "Full name must be less that 100 characters"),
        email: z.string()
            .email("Invalid email address"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string()
    }).refine(data => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ["confirmPassword"]
    })
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;