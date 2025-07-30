import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

export default function Slider() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Main Content */}
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-2 rounded w-200"
        >
            <div className='flex items-center gap-4'>
             <FaPlus/> Add Item
           </div>
        </button>
      </div>

      {/* Slider Panel */}
      <div
        className={`fixed top-16 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Item</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes/>
            </button>
          </div>
          
          {/* Slider Content */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}