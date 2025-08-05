
export type Status = "todo" | "in-progress" | "done";
export type Priority = "high" | "medium" | "low";
export type Category = "personal" | "work" | "college" | "others"

export interface TaskAttributes {
    id: number;
    title: string;
    description ?: string;
    category: Category;
    priority: Priority;
    status: Status;
    due_date: Date;
    createdAt ?: Date;
    updatedAt ?: Date;
    userId: number;
}

export interface TaskAttributesDto {
    title: string;
    description ?: string;
    category: Category;
    priority: Priority;
    status: Status;
    due_date: Date;
    userId: number;
}