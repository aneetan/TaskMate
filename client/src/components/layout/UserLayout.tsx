import { useState } from 'react'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router';

interface NavItems{
    item: string;
    action: string;
    icon: string;
}

const UserLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  return (
     <div className="min-h-screen bg-gray-100 w-screen">
        <div className='relative'>
        <Navbar onClick={toggleSidebar} isOpen={isSidebarOpen}/>
        </div>

      {/* Sidebar */}
      <div className='flex'>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
            <ul className="space-y-2">
                {["Dashboard", "Project", "Teams", "Setting"].map(items => (
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded transition">{items}</a>
                    </li>
                ))}
            </ul>
        </Sidebar>

      {/* Main content */}
      <main className={`p-4 ml-0 transition-all duration-300 ${isSidebarOpen? 'translate-x-0' : '-translate-x-60'}`}>
        <Outlet/>
      </main>
    </div>
    </div>
  )
}

export default UserLayout
