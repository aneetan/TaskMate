import { IoIosAddCircleOutline } from "react-icons/io"
import Tasks from "./Tasks"
import type { TaskProps } from "../types/Tasks";

interface TaskStatusProps {
    header: string;
    tasks: TaskProps[];
}

const TaskStatusFilter: React.FC<TaskStatusProps> = ({header, tasks}) => {

  return (
        <div className="mr-12">
            <div className="flex justify-between items-center ">
                <div className="font-bold text-xl text-gray-800"> {header} </div>
                <div className="flex gap-4">
                    <button className="cursor-pointer transition-colors hover:text-purple-700">
                        <IoIosAddCircleOutline className="w-6 h-6"/>
                    </button>
                </div>
            </div> 
            <div className="container">
                <Tasks data={tasks} />
            </div>

            <div className="mt-6">
              <button className="flex gap-4 border-2 text-gray-400 border-gray-400 border-dashed w-full justify-center py-2 
                hover:border-solid hover:border-purple-400 hover:bg-purple-100 transition-all rounded-xl cursor-pointer">
                <IoIosAddCircleOutline className="w-6 h-6" />
                Add Task
                </button>
            </div>
        </div>
  )
}

export default TaskStatusFilter
