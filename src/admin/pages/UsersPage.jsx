import React, {useState, useEffect} from 'react';
import {
    FiUsers,
    FiPlus,
    FiSearch,
    FiRefreshCw,
    FiCheck,
} from 'react-icons/fi';

import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";

import CreateUser from "../components/modals/CreateUser.jsx";
import {GoTrash} from "react-icons/go";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, searchTerm]);

    const fetchData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.userToken;

            const [usersRes] = await Promise.all([
                axiosInstance.get(API_PATHS.USER.GET_ALL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }),
            ]);
            setUsers(usersRes.data);
        } catch (error) {
            console.error('Error fetching users/roles:', error);
            alert('خطا در دریافت اطلاعات کاربران');
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        let filtered = users;

        if (searchTerm) {
            filtered = filtered.filter(u =>
                u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.username?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredUsers(filtered);
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm('آیا از حذف این کاربر اطمینان دارید؟')) return;
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.userToken;

            await axiosInstance.delete(API_PATHS.USER.DELETE(userId), {
                headers: {Authorization: `Bearer ${token}`},
            });
            setUsers(prev => prev.filter(u => u._id !== userId));
            alert('کاربر با موفقیت حذف شد');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('خطا در حذف کاربر');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"/>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">مدیریت کاربران</h1>
                        <p className="mt-1 text-sm text-gray-500">مشاهده و مدیریت کاربران سیستم</p>
                    </div>
                    <div className="flex gap-x-3 space-x-reverse">
                        <button
                            onClick={fetchData}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <FiRefreshCw className="w-4 h-4 ml-2"/>
                            بروزرسانی
                        </button>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md text-white bg-primary hover:bg-primary"
                            onClick={() => setIsOpenModal(true)}
                        >
                            <FiPlus className="w-4 h-4 ml-2"/>
                            ایجاد کاربر جدید
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <StatCard icon={<FiUsers/>} label="کل کاربران" value={users.length}/>
                    <StatCard icon={<FiCheck/>} label="فعال شده" value={users.filter(u => u.isActive).length}/>
                    <StatCard icon={<FiUsers/>} label="ثبت‌نام این ماه" value={
                        users.filter(u =>
                            new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                        ).length
                    }/>
                </div>

                {/* Filters */}
                <div className="bg-white shadow rounded-lg">
                    <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">جستجو</label>
                            <div className="relative">
                                <FiSearch
                                    className="absolute inset-y-0 right-0 pr-3 h-5 w-5 text-gray-400 pointer-events-none"/>
                                <input
                                    type="text"
                                    placeholder="نام، ایمیل یا نام‌کاربری..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* User List */}
                <div className="bg-white shadow overflow-x-hidden p-6 sm:rounded-md">
                    <h3 className="text-lg font-medium text-gray-900">فهرست کاربران
                        ({filteredUsers.length.toLocaleString('fa-IR')})
                    </h3>
                    {filteredUsers.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {filteredUsers.map(user => (
                                <li key={user._id} className="flex items-center justify-between py-4">
                                    <div className="flex items-center gap-x-3">
                                        <div className="flex flex-col">
                                            <p className="font-bold">{user.username}</p>
                                            <p className="text-xs text-gray-600">{user.email}</p>
                                            <p className="text-xs text-primary font-semibold">
                                                {user.role === "ADMIN" ? "ادمین" : "کاربر"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500"
                                    >
                                        <GoTrash className="text-lg text-white"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-12">
                            <FiUsers className="mx-auto h-12 w-12 text-gray-400"/>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">کاربری یافت نشد</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm
                                    ? 'هیچ کاربری با این فیلترها یافت نشد.'
                                    : 'هنوز کاربری ثبت نشده است.'}
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsOpenModal(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm rounded-md text-white bg-primary hover:bg-primary"
                                >
                                    <FiPlus className="w-4 h-4 ml-2"/>
                                    ایجاد اولین کاربر
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CreateUser isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
        </>
    );
};

const StatCard = ({icon, label, value}) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5 flex items-center">
            <div className="flex-shrink-0">{icon}</div>
            <div className="mr-5 w-0 flex-1">
                <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
                    <dd className="text-lg font-medium text-gray-900">{value.toLocaleString('fa-IR')}</dd>
                </dl>
            </div>
        </div>
    </div>
);

export default UsersPage;
