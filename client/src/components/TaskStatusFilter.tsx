import { IoIosAddCircleOutline } from "react-icons/io"
import Tasks from "./Tasks"
import type { TaskProps } from "../types/Tasks";
import { AddTaskModal } from "./AddTaskModal";
import { useState } from "react";

interface TaskStatusProps {
    header: string;
    tasks: TaskProps[];
}

const TaskStatusFilter: React.FC<TaskStatusProps> = ({header, tasks}) => {
     const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddTask = (newTask: { title: string; description: string; priority: string }) => {
    };

  return (
        <div className="md:mr-12 mb-12">
            <div className="flex w-full justify-between items-center">
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
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex gap-4 border-2 text-gray-400 border-gray-400 border-dashed w-full justify-center py-2 
                hover:border-solid hover:border-purple-400 hover:bg-purple-100 transition-all rounded-xl cursor-pointer">
                <IoIosAddCircleOutline className="w-6 h-6" />
                Add Task
                </button>

                 <AddTaskModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAddTask={handleAddTask}
                />
            </div>
        </div>
  )
}

export default TaskStatusFilter
