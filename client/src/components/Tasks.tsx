import { FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdDeleteOutline, MdOutlineTimer } from "react-icons/md";
import type { TaskProps } from "../types/Tasks";
import moment from "moment";
import { formatDueDate } from "../helper/formatDueDate";
import { AddTaskModal } from "./AddTaskModal";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import ViewTask from "./ViewTask";

const Tasks = ({data} : {data: TaskProps[]}) => {
    const [viewedTask, setViewedTask] = useState<TaskProps | null>(null);
    const [taskToEdit, setTaskToEdit] = useState<TaskProps | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<TaskProps | null>(null);

  return (
    <>
    {data.map((task) => (
    <div
        className="shadow-sm p-4 mt-4 rounded-md bg-white max-w-full mx-auto"
        key={task.id}
    >
        <div className="flex flex-wrap justify-between items-center mb-2 w-full">
        <div className="flex items-center gap-2 min-w-0">
            {task.status === "todo" ? (
            <MdOutlineTimer className="w-5 h-5 text-gray-600" />
            ) : task.status === "in-progress" ? (
            <GrInProgress className="w-4 h-4 text-gray-600" />
            ) : (
            <FaRegCheckCircle className="w-4 h-4 text-gray-600" />
            )}

            <span
            className="font-semibold text-base truncate cursor-pointer hover:underline min-w-0"
            style={{ maxWidth: "calc(100vw - 150px)" }} 
            onClick={() => setViewedTask(task)}
            >
            {task.title}
            </span>
        </div>

        <div
            className={`rounded-full px-3 py-1 text-xs font-semibold w-fit ml-2 whitespace-nowrap
            ${
                task.priority === "high"
                ? "text-red-500"
                : task.priority === "low"
                ? "text-green-500"
                : "text-yellow-500"
            }`}
        >
            {task.priority!.charAt(0).toUpperCase() + task.priority?.slice(1)}
        </div>
        </div>

        <div className="flex flex-wrap gap-2 ml-1">
            <div className="flex flex-col">
                <span className="rounded-full px-3 py-1 text-xs text-white w-fit bg-purple-500 whitespace-nowrap">
                    {task.category!.charAt(0).toUpperCase() + task.category?.slice(1)}
                </span>
                <span className="mt-2 text-gray-500 truncate max-w-full sm:max-w-[90%]">
                    {task.description}
                </span>
            </div>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-4">
        <span
            className={`text-sm font-semibold
            ${
                task.due_date && moment(task.due_date).isBefore(moment(), "day")
                ? "text-red-500"
                : "text-green-500"
            }`}
        >
            {task.due_date ? formatDueDate(task.due_date) : "No due date"}
        </span>

        <div className="flex gap-4 mt-2 sm:mt-0">
            <button
            onClick={() => setTaskToEdit(task)}
            className="text-purple-800 cursor-pointer"
            aria-label={`Edit task ${task.title}`}
            >
            <FaRegEdit className="w-4 h-4" />
            </button>

            <AddTaskModal
            isOpen={!!taskToEdit}
            onClose={() => setTaskToEdit(null)}
            isEdit={true}
            status={task.status}
            taskToEdit={taskToEdit}
            />

            <button
            onClick={() => setTaskToDelete(task)}
            className="text-red-700 cursor-pointer"
            aria-label={`Delete task ${task.title}`}
            >
            <MdDeleteOutline className="w-5 h-5" />
            </button>

            <DeleteModal
            isOpen={!!taskToDelete}
            onClose={() => setTaskToDelete(null)}
            task={taskToDelete}
            />
        </div>
        </div>
    </div>
    ))}

    <ViewTask 
    isOpen={!!viewedTask}
    onClose={() => setViewedTask(null)}
    task={viewedTask}
    />
    </>
  )
}

export default Tasks
