export interface TaskProps {
  id: number;
  title: string;
  category: string;
  priority: string;
  status: string;
  description ?: string;
  due_date : Date;
}