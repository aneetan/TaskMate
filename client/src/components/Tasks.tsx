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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
     
  return (
    <>
    {data.map((task) => (
        <div
            className="shadow-sm p-4 mt-4"
            key={task.id}
        >
            {/* ---------- Task Header --------- */}
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                    {task.status === "todo" ? (
                        <MdOutlineTimer className="w-5 mt-1 h-5 text-gray-600"/>
                    ): task.status === "in-progress"? (
                        <GrInProgress className="w-4 mt-1 h-4 text-gray-600"/>
                    ): (
                        <FaRegCheckCircle className="w-4 mt-1 h-4 text-gray-600"/>
                    )}

                    <span
                        className="font-semibold text-base truncate md:w-[180px] w-[80px] cursor-pointer hover:underline"
                        onClick={() => setViewModalOpen(true)}
                    > {task.title} </span>
                </div>

                <ViewTask 
                isOpen={viewModalOpen} 
                onClose={() => setViewModalOpen(false)} 
                task={task}
                />

                <div className="">
                    {/* -------- Priority --------- */}
                    <div className={`rounded-4xl px-2 py-1 text-xs text-white w-fit ml-2
                        ${task.priority === "High" ? "bg-red-500" :
                            task.priority === "Low" ? 'bg-green-500':
                            'bg-yellow-500'
                        }`}>
                        {task.priority}
                    </div>
                </div>
            </div>
            <div className="flex flex-col ml-6">
                <span className="rounded-4xl px-3 py-1 text-xs text-white w-fit bg-purple-500">
                    {task.category}
                </span>
                <span className="mt-2 text-gray-500 truncate">
                    {task.description}
                </span>
            </div>
            <div className="flex justify-between mt-4 ml-4">
                <span className={`text-sm font-semibold md:w-full w-1/2
                    ${task.due_date && moment(task.due_date).isBefore(moment(), 'day') ? "text-red-500" : "text-green-500"}
                `}>
                    {task.due_date ? formatDueDate(task.due_date) : "No due date"}
                </span>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-purple-800 cursor-pointer"
                    >
                        <FaRegEdit className="w-4 h-4"/>
                    </button>

                    <AddTaskModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        isEdit={true}
                        status={task.status}
                        taskToEdit={task}
                    />
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="text-red-700 cursor-pointer"
                    >
                        <MdDeleteOutline className="w-5 h-5"/>  
                    </button>
                    <DeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        task={task}
                    />
                </div>
            </div>
           
        </div>
    )
    )}
    </>
  )
}

export default Tasks
