import { z } from "zod";
import { getStartOfToday } from "../utils/dateUtilsSchema";

/**
 * @swagger
 * components:
 *   schemas:
 *     AddTask:
 *       type: object
 *       required:
 *         - title
 *         - priority
 *         - status
 *         - category
 *         - due_date
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *         description:
 *           type: string
 *           nullable: true
 *         priority:
 *           type: string
 *           enum: [high, medium, low]
 *         status:
 *           type: string
 *           enum: [todo, in-progress, done]
 *         category:
 *           type: string
 *           enum: [personal, work, college, others]
 *         due_date:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: integer
 *     EditTask:
 *       type: object
 *       allOf: 
 *         - $ref: '#/components/schemas/AddTask'
 *       required:
 *         - id
 */

export const addTaskSchema = z.object({
    body: z.object({
        title: z.string()
            .min(5, "Title must be min 5 characters")
            .max(100, "Title cannot exceed 100 characters"),
        description: z.string().nullable(),
        priority: z.enum(["high", "medium", "low"]),
        status: z.enum(["todo", "in-progress", "done"]),
        category: z.enum(["personal", "work", "college", "others"]),
        due_date: z.coerce.date()
            .min(getStartOfToday(), "Due date cannot be past date"),
        userId: z.number().int().positive(),  
    })
});

export const editTaskSchema = addTaskSchema.extend({
  body: addTaskSchema.shape.body.partial()
});

export type AddTaskUserInput = z.infer<typeof addTaskSchema>;
export type EditTaskUserInput = z.infer<typeof editTaskSchema>;