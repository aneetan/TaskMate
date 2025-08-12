"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTaskSchema = exports.addTaskSchema = void 0;
const zod_1 = require("zod");
const dateUtilsSchema_1 = require("../utils/dateUtilsSchema");
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
exports.addTaskSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string()
            .min(5, "Title must be min 5 characters")
            .max(100, "Title cannot exceed 100 characters"),
        description: zod_1.z.string().nullable(),
        priority: zod_1.z.enum(["high", "medium", "low"]),
        status: zod_1.z.enum(["todo", "in-progress", "done"]),
        category: zod_1.z.enum(["personal", "work", "college", "others"]),
        due_date: zod_1.z.coerce.date()
            .min((0, dateUtilsSchema_1.getStartOfToday)(), "Due date cannot be past date"),
        userId: zod_1.z.number().int().positive(),
    })
});
exports.editTaskSchema = exports.addTaskSchema.extend({
    body: exports.addTaskSchema.shape.body.partial()
});
