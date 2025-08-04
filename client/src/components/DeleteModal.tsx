import type { TaskProps } from "../types/Tasks";

interface DeleteTaskProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteTask: (task: TaskProps) => void;
  task: TaskProps | null;
}

const DeleteModal = ({ isOpen, onClose, onDeleteTask, task }: DeleteTaskProps) => {
  if (!isOpen || !task) return null;

  const handleDelete = () => {
    onDeleteTask(task);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md  md:m-0 m-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Task</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the task <span className="font-semibold">"{task.title}"</span>? 
          This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;