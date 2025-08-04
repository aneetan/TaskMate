import { useState } from "react";
import TaskStatusFilter from "../components/TaskStatusFilter"
import type { TaskProps } from "../types/Tasks";

const Dashboard = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([
        { id: "1", title: "University assignment 2", category: "Personal",  description: "This is a personal task description This is a personal task description ", due_date: new Date("2025-08-01"), priority:"High", status: "in-progress" },
        { id: "2", title: "Project Proposal", category: "Work",  due_date: new Date("2025-08-02"), priority:"Low", status: "done" },
        { id: "3", title: "Go hiking to champadevi or jamacho", category: "Others", description: "Miscellaneous task information", due_date: new Date("2025-08-04"), priority:"Medium", status: "in-progress" },
        { id: "4", title: "Sleep peacefully", category: "Personal", due_date: new Date("2025-08-03"), priority:"High", status: "todo" },
    ]);
  
  const todoTask = tasks.filter((item) => item.status === "todo");
  const inProgressTask = tasks.filter((item) => item.status === "in-progress");
  const doneTask = tasks.filter((item) => item.status === "done");

  return (
    <div className="rounded-lg shadow p-6 inset-0 bg-opacity-50 backdrop-blur-sm z-40">
        <h1 className="text-2xl font-bold mb-4"> Dashboard </h1>
        <div className="flex md:flex-row flex-col justify-between">
          <div className="w-full md:w-1/3">
            <TaskStatusFilter tasks={todoTask} header="To do" status="todo"/>
          </div>
          <div className="w-full md:w-1/3">
            <TaskStatusFilter tasks={inProgressTask} header="In progress" status="in-progress"/>
          </div>
          <div className="w-full md:w-1/3">
            <TaskStatusFilter tasks={doneTask} header="Completed" status="done"/>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
