import { FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdDeleteOutline, MdOutlineTimer } from "react-icons/md";
import type { TaskProps } from "../types/Tasks";
import moment from "moment";
import { formatDueDate } from "../helper/formatDueDate";

const Tasks = ({data} : {data: TaskProps[]}) => {
     
  return (
    <>
    {data.map((task) => (
        <div className="shadow-sm p-4 mt-4">
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

                    <span className="font-semibold text-base truncate md:w-[220px] w-[100px] cursor-pointer hover:underline"> {task.title} </span>
                </div>

                <div className="">
                    {/* -------- Priority --------- */}
                    <div className={`rounded-4xl px-3 py-1 text-xs text-white w-fit ml-4
                        ${task.priority === "high" ? "bg-red-500" :
                            task.priority === "low" ? 'bg-green-500':
                            'bg-yellow-500'
                        }`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
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
                <span className={`text-sm font-semibold
                    ${moment(task.due_date).isBefore(moment(), 'day')? "text-red-500": "text-green-500"}
                `}>
                    {formatDueDate(task.due_date)}
                </span>
                <div className="flex justify-between gap-4">
                    <button className="text-purple-800 cursor-pointer">
                        <FaRegEdit className="w-4 h-4"/>
                    </button>
                    <button className="text-red-700 cursor-pointer">
                        <MdDeleteOutline className="w-5 h-5"/>  
                    </button>
                </div>
            </div>
           
        </div>
    )
    )}
    </>
  )
}

export default Tasks
