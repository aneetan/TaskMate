import { useState } from 'react'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { NavLink, Outlet } from 'react-router';
import { MdDashboard, MdTask, MdTaskAlt } from 'react-icons/md';
import type { IconType } from 'react-icons';

interface NavItems {
    item: string;
    action: string;
    icon: IconType;
    isActive ?: boolean;
}

const UserLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    const navLinks: NavItems[] = [
        { item: "Dashboard", action: "/dashboard", icon: MdDashboard },
        { item: "Items", action: "/items", icon: MdTask },
        { item: "Todo", action: "/todo", icon: MdTaskAlt },
    ]

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar onClick={toggleSidebar} isOpen={isSidebarOpen} />
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar}>
                <ul className="space-y-2">
                    {navLinks.map(item => (
                        <li key={item.action}>
                        <NavLink 
                            to={item.action}
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${!isSidebarOpen ? 'justify-center' : ''} 
                                ${isActive 
                                    ? 'bg-[var(--primary-color-hover)] text-white' 
                                    : 'hover:bg-[var(--primary-light)]'
                                }`
                            }
                            title={!isSidebarOpen ? item.item : ''}
                        >
                            <item.icon className="text-2xl" />
                            {isSidebarOpen && <span className="ml-3 font-semibold">{item.item}</span>}
                        </NavLink>
                        </li>
                    ))}
                </ul>
            </Sidebar>

            {/* Main content */}
            <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'} p-4`}>
                <Outlet />
            </main>
        </div>
    )
}

export default UserLayout