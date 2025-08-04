export type Category = "Personal" | "Work" | "College" | "Others";
export type Priority = "High" | "Low" | "Medium";
export type Status = "todo"| "in-progress" | "done";

export interface TaskProps {
  id: string;
  title: string;
  category: Category | null;
  priority: Priority | null;
  status: Status;
  description ?: string;
  due_date : Date | null;
}