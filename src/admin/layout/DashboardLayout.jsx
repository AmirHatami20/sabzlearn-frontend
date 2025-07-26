import React, {useState, useContext} from 'react';
import {Outlet, Link, useLocation, Navigate} from 'react-router-dom';
import {
    FiHome,
    FiUsers,
    FiBookOpen,
    FiFileText,
    FiFolder,
    FiMessageSquare,
    FiSettings,
    FiX,
} from 'react-icons/fi';

import {AuthContext} from "../../context/AuthContext.jsx";
import Overlay from "../../components/Overlay.jsx";
import FullLoader from "../../components/FullLoader.jsx";
import {IoIosMenu} from "react-icons/io";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {loading, userInfos} = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <FullLoader/>;
    }

    if (!userInfos) {
        return <Navigate to="/login" replace/>;
    }

    if (userInfos?.role !== "ADMIN") {
        return <Navigate to="/" replace/>;
    }

    const navigationItems = [
        {name: 'داشبورد', href: '/admin', icon: FiHome},
        {name: 'کاربران', href: '/admin/users', icon: FiUsers},
        {name: 'دوره‌ها', href: '/admin/courses', icon: FiBookOpen},
        {name: 'مقالات', href: '/admin/articles', icon: FiFileText},
        {name: 'دسته‌بندی‌ها', href: '/admin/categories', icon: FiFolder},
        {name: 'نظرات', href: '/admin/comments', icon: FiMessageSquare},
        {name: 'تنظیمات', href: '/admin/settings', icon: FiSettings},
    ];

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Sidebar */}
            <div className={`fixed h-full right-0 z-50 w-64 bg-white shadow-xl duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : 'translate-x-full'
            } lg:translate-x-0`}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-6 bg-primary">
                    <h1 className="text-xl font-bold text-white">پنل مدیریت</h1>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white hover:text-gray-200"
                    >
                        <FiX className="w-6 h-6"/>
                    </button>
                </div>
                {/* Nav */}
                <ul className="flex flex-col py-6 px-4 space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href

                        return (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className={`flex items-center px-4 gap-x-2 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="text-lg"/>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {sidebarOpen && (
                <Overlay
                    closeOverlay={() => setSidebarOpen(false)}
                />
            )}
            {/* Mobile Trigger */}
            <button className="lg:hidden p-3" onClick={() => setSidebarOpen(true)}>
                <IoIosMenu className="text-5xl"/>
            </button>

            <main className="lg:mr-64 p-8">
                <Outlet/>
            </main>
        </div>
    );
};

export default DashboardLayout;
