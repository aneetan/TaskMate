import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

interface TaskProps {
  id: number;
  title: string;
  category: string;
  isCompleted: boolean;
}

const TaskList = () => {
    const [isOpen, setisOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskProps[]>([
    { id: 1, title: "Task 1", category: "Personal", isCompleted: false },
    { id: 2, title: "Task 2", category: "Work", isCompleted: false },
    { id: 3, title: "Task 3", category: "Others", isCompleted: true },
    { id: 4, title: "Task 4", category: "Personal", isCompleted: false },
  ]);

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {tasks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No tasks found. Add some tasks to get started!</div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 shadow-4xl items-center ${
                task.isCompleted ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {/* Status (Checkbox) */}
              <div className="flex items-center justify-start gap-4 w-200">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
                />
                {task.title}
                 <RiArrowDropDownLine className={`text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Actions
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                  aria-label="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div> */}
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