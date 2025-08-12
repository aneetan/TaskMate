import TaskStatusFilter from "../components/TaskStatusFilter"
import {  useQuery } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";
import { viewTasks } from "../api/taskApi";
import type { TaskProps } from "../types/Tasks";
import { getUserId } from "../utils/jwtDecode";
import { isTodayOrUpcoming } from "../helper/formatDueDate";

const Today = () => {
  const {data, isLoading, error} = useQuery<AxiosResponse, AxiosError, TaskProps[]>({
    queryKey: ['task'],
    queryFn: () => viewTasks(getUserId()!),
  })

  const tasks: TaskProps[] = data ?? [];

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const todayTasks = tasks.filter((item) => {
         const { isToday } = isTodayOrUpcoming(item.due_date!);
         return isToday;
  });

  const todoTask = todayTasks.filter((item) => item.status === "todo");
  const inProgressTask = todayTasks.filter((item) => item.status === "in-progress");
  const doneTask = todayTasks.filter((item) => item.status === "done");

  return (
    <div className="rounded-lg shadow p-6 inset-0 bg-opacity-50 backdrop-blur-sm z-40 h-screen">
        <h1 className="text-2xl font-bold mb-4"> Today </h1>
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

export default Today
