export type Category = "Personal" | "Work" | "College" | "Others";
export type Priority = "High" | "Low" | "Medium";

export interface TaskProps {
  id: string;
  title: string;
  category: Category | null;
  priority: Priority | null;
  status: string;
  description ?: string;
  due_date : Date | null;
}