import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: { title: string; description: string; priority: string }) => void;
}

export const AddTaskModal = ({ isOpen, onClose, onAddTask }: AddTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({ title, description, priority });
    onClose();
    setTitle('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                value={title}
                placeholder='Eg. Completing assignment'
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                placeholder='Enter task description (optional)'
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>
            
            <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
            <div className='w-full md:w-1/2'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority*</label>
              <div className="relative">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                >
                    {['Low', 'Medium', 'High'].map((level) => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <RiArrowDropDownLine className='w-6 h-6'/>
                </div>
                </div>
            </div>

            <div className='w-full md:w-1/2'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
               <div className="relative">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                >
                    {['Personal', 'Work', 'College', 'Others'].map((level) => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <RiArrowDropDownLine className='w-6 h-6'/>
                </div>
                </div>
            </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date*</label>
              <input
                type="date"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};