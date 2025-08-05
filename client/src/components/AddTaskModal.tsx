import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { type Priority, type Category, type TaskProps, type Status } from '../types/Tasks';
import moment from 'moment';

interface AddTaskModalProps {
  isOpen: boolean;
  status: Status;
  onClose: () => void;
  isEdit: boolean;
  taskToEdit: TaskProps | null;
}

export const AddTaskModal = ({ isOpen, onClose, isEdit, taskToEdit, status: initialStatus }: AddTaskModalProps) => {
  const [formData, setFormData] = useState<TaskProps>({
    id: '',
    title: '', 
    description: '',
    category: 'Personal',
    priority: 'Medium',
    due_date: null,
    status: initialStatus
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: name === 'due_date'
            ? new Date(value)
            : value
    }))
  }

  useEffect(() => {
    if(isEdit && taskToEdit){
        setFormData({
            id: taskToEdit.id,
            title: taskToEdit.title,
            description: taskToEdit.description,
            status: taskToEdit.status,
            priority: taskToEdit.priority,
            due_date: taskToEdit.due_date,
            category: taskToEdit.category
        })
    } else {
        resetForm();
    }
  }, [isEdit, taskToEdit]);

  const resetForm = () => {
    setFormData({
        id: '',
        title: '', 
        description: '',
        category: "Personal",
        priority: "Medium",
        due_date: null,
        status: initialStatus
    })
  }

  const validateForm = () => {
    
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.due_date) return;

    const task = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        description : (formData.description ?? '').trim(),
        priority: formData.priority,
        category: formData.category,
        due_date: new Date(formData.due_date),
        status: formData.status
    }
    console.log(task);

    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full md:max-w-[60%] max-w-md md: m-0 m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold"> 
            {isEdit ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">

             <div className='w-full'>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              
              <div className="flex flex-col md:flex-row gap-2 mt-3">
                {['todo', 'in-progress', 'done'].map((statusOption) => (
                  <button
                    key={statusOption}
                    type="button"
                    onClick={() => setFormData({...formData, status: statusOption as Status})}
                    className={`md:px-3 px-1 pl-2 md:py-1.5 py-1 text-sm rounded-full flex items-center transition-all border font-medium ${
                      formData.status === statusOption
                        ? statusOption === 'todo'
                          ? 'bg-gray-300 border-gray-300 text-gray-800'
                          : statusOption === 'in-progress'
                          ? 'bg-blue-100 border-blue-300 text-blue-800'
                          : 'bg-green-100 border-green-300 text-green-800'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {statusOption === 'todo' && (
                      <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
                    )}
                    {statusOption === 'in-progress' && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                    )}
                    {statusOption === 'done' && (
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                    )}
                    {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
              <div className='w-full md:w-1/2'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  type="text"
                  name='title'
                  value={formData.title}
                  placeholder='Eg. Completing assignment'
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className='w-full md:w-1/2'>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date*</label>
                  <input
                    type="date"
                    name='due_date'
                    value={formData.due_date ? moment(formData.due_date).format('YYYY-MM-DD') : ''}
                    min={moment().format('YYYY-MM-DD')}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
              </div>
            </div>

            
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                name='description'
                placeholder='Enter task description (optional)'
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>
            
            <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
            <div className='w-full md:w-1/2'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority*</label>
              <div className="relative">
                <select
                    value={formData.priority as Priority}
                    name="priority"
                    onChange={handleChange}
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
                    value={formData.category as Category}
                    name='category'
                    onChange={handleChange}
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
              {isEdit? 'Update Task': 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};