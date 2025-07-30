import type { ReactNode } from "react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    children ?: ReactNode;
}
const Sidebar: React.FC<SidebarProps> = ({isOpen, onClose, children}) => {
  return (
    <>
      <div className={`flex flex-col top-0 left-0 h-[100vh] w-64 bg-gray-800 text-white shadow-lg
            transform transition-transform duration-300 ease-in-out z-50 -translate-y-16
            ${isOpen? 'translate-x-0' : '-translate-x-full'
        }`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">TaskMate</h2>
                <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-white focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>


            <div className="p-4 overflow-y-auto">
                {children}
            </div>
      </div>
    </>
  )
}

export default Sidebar
