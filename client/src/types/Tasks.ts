export type Category = "personal" | "work" | "college" | "others";
export type Priority = "high" | "low" | "medium";
export type Status = "todo"| "in-progress" | "done";

export interface TaskProps {
  id: number | null;
  title: string;
  category: Category | null;
  priority: Priority | null;
  status: Status;
  description ?: string;
  due_date : Date | null;
  userId: number | null;
}