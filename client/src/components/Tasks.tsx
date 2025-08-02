import { FaRegCheckCircle, FaRegEdit } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { MdDeleteOutline, MdOutlineTimer } from "react-icons/md";
import type { TaskProps } from "../types/Tasks";

const Tasks = (tasks : TaskProps[]) => {
    // const [tasks, setTasks] = useState<TaskProps[]>([
    //     { id: 1, title: "University assignment 2", category: "Personal", isCompleted: false,  description: "This is a personal task description", due_date: new Date("2025-08-01"), priority:"high", status: "in-progress" },
    //     { id: 2, title: "Project Proposal", category: "Work", isCompleted: false, due_date: new Date("2025-08-01"), priority:"low", status: "done" },
    //     { id: 3, title: "Go hiking to champadevi or jamacho", category: "Others", isCompleted: true, description: "Miscellaneous task information", due_date: new Date("2025-08-01"), priority:"medium", status: "in-progress" },
    //     { id: 4, title: "Sleep peacefully", category: "Personal", isCompleted: false, due_date: new Date("2025-08-01"), priority:"high", status: "todo" },
    // ]);
     
  return (
    <>
    {tasks.map((task) => (
        <div className="shadow-sm p-4 mt-4">
            {/* ---------- Task Header --------- */}
            <div className="flex items-start justify-between mb-2">
                <div className="flex gap-2">
                    {task.status === "todo" ? (
                        <MdOutlineTimer className="w-6 h-6 text-gray-600"/>
                    ): task.status === "in-progress"? (
                        <GrInProgress className="w-6 h-6 text-gray-600"/>
                    ): (
                        <FaRegCheckCircle className="w-6 h-6 text-gray-600"/>
                    )}

                    <span className="font-semibold text-base"> {task.title} </span>
                </div>

                <div>
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
                <span className="mt-2 text-gray-500"> {task.description} </span>
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <button className="text-purple-800 cursor-pointer">
                    <FaRegEdit className="w-4 h-4"/>
                </button>
                <button className="text-red-700 cursor-pointer">
                    <MdDeleteOutline className="w-5 h-5"/>  
                </button>
            </div>
           
        </div>
    )
    )}
    </>
  )
}

export default Tasks
