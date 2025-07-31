import { useState } from 'react';
import { RiArrowDropDownLine, RiDeleteBack2Line, RiDeleteBinLine, RiEditLine, RiInformationLine } from 'react-icons/ri';

interface TaskProps {
  id: number;
  title: string;
  category: string;
  isCompleted: boolean;
  description ?: string;
}

const TaskList = () => {
    const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
    const [tasks, setTasks] = useState<TaskProps[]>([
        { id: 1, title: "Task 1", category: "Personal", isCompleted: false,  description: "This is a personal task description" },
        { id: 2, title: "Task 2", category: "Work", isCompleted: false },
        { id: 3, title: "Task 3", category: "Others", isCompleted: true, description: "Miscellaneous task information" },
        { id: 4, title: "Task 4", category: "Personal", isCompleted: false },
    ]);

  const toggleExpandTask = (id: number) => {
    setExpandedTaskId(expandedTaskId === id? null : id);
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  return (
    <>
      <div className="bg-gray-200 rounded-lg shadow-sm overflow-hidden md:w-[60%]">
        {tasks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No tasks found. Add some tasks to get started!</div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className={`mb-2 overflow-hidden rounded-lg p-4 shadow-xs ${
                task.isCompleted ? 'bg-[var(--primary-lighter)]' : 'bg-gray-200'
              }`}
            >
              {/* Task Header */}
              <div className={`flex items-center justify-between gap-4 w-150 cursor-pointer
                ${expandedTaskId === task.id? 'pb-4 border-b border-gray-300' : ''}
                `}
                onClick={() => toggleExpandTask(task.id)}
                >
                <div className='flex gap-4 items-center'>
                    <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="h-5 w-5 text-blue-500 rounded focus:ring-[var(--primary-color)]"
                    />
                    <span className={`font-semibold  ${task.isCompleted? 'line-through' : ''}`}> {task.title} </span>
                
                </div>
                <button 
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  aria-label="Task options"
                >
                  <RiArrowDropDownLine className={`text-2xl transition-transform ${expandedTaskId === task.id ? 'rotate-180' : ''}`} />
                </button>
              </div>

               {expandedTaskId === task.id && (
                  <div className={`p-4 ${task.isCompleted? 'bg-[var(--primary-lighter)]' : 'bg-gray-200'} animate-accordion-open`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p className="mt-1 text-sm text-gray-700">
                        {task.description || "No description provided"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      className="flex items-center px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <RiEditLine className="mr-1" />
                      Edit
                    </button>
                    <button
                      className="flex items-center px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      <RiDeleteBinLine className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              )}

              
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
        <div>Total: <span className="font-medium">{tasks.length}</span></div>
        <div>Completed: <span className="font-medium">{tasks.filter(t => t.isCompleted).length}</span></div>
        <div>Pending: <span className="font-medium">{tasks.filter(t => !t.isCompleted).length}</span></div>
      </div>
    </>      
  );
};

export default TaskList;