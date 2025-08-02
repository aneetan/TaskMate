import { IoIosAddCircleOutline } from "react-icons/io"
import Tasks from "./Tasks"

const TaskStatusFilter = () => {
  return (
        <div className="mr-12">
            <div className="flex justify-between items-center ">
                <div className="font-bold text-xl text-gray-800"> Todo </div>
                <div className="flex gap-4">
                    <IoIosAddCircleOutline className="w-6 h-6"/>
                </div>
            </div> 
            <div className="container">
                <Tasks/>
            </div>

            <div className="mt-6">
              <button className="flex gap-4 border-2 text-gray-400 border-gray-400 border-dashed w-full justify-center py-2 
                hover:border-solid hover:bg-gray-100 transition-all rounded-xl">
                <IoIosAddCircleOutline className="w-6 h-6" />
                Add Task
                </button>
            </div>
        </div>
  )
}

export default TaskStatusFilter
