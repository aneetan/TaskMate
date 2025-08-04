import type { Priority, TaskProps } from "../types/Tasks";

interface ViewTaskProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskProps | null;
}

const ViewTask = ({ isOpen, onClose, task }: ViewTaskProps) => {
  if (!isOpen || !task) return null;

  const formatDate = (date: Date | null) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPriorityColor = (priority: Priority | null) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white md:m-0 m-8 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {task.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Description</h3>
              <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Category</h3>
              {task.category ? (
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500 text-white"
                >
                  {task.category}
                </span>
              ) : (
                <p className="mt-1 text-gray-700">Not specified</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">Priority</h3>
              {task.priority ? (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              ) : (
                <p className="mt-1 text-gray-700">Not specified</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">Status</h3>
              <p className="mt-1 text-gray-700 capitalize">{task.status}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">Due Date</h3>
              <p className="mt-1 text-gray-700">{formatDate(task.due_date)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;