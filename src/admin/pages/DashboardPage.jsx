import React, {useState} from 'react';
import {
    FiUsers,
    FiBookOpen,
    FiFileText,
    FiMessageSquare,
    FiTrendingUp,
} from 'react-icons/fi';

import CreateArticle from "../components/modals/CreateArticle.jsx";
import CreateCourse from "../components/modals/CreateCourse.jsx";
import CreateUser from "../components/modals/CreateUser.jsx";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        totalArticles: 0,
        totalComments: 0,
        recentUsers: [],
        recentCourses: []
    });
    const [loading, setLoading] = useState(false);

    const [isShowArticleModal, setIsShowArticleModal] = useState(false);
    const [isShowCourseModal, setIsShowCourseModal] = useState(false);
    const [isShowUserModal, setIsShowUserModal] = useState(false);

    const StatCard = ({title, value, icon: Icon, color = 'blue', trend = null}) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
                <div className={`flex-shrink-0 w-8 h-8 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${color}-600`}/>
                </div>
                <div className="mr-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                        <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                                {loading ? '...' : value.toLocaleString('fa-IR')}
                            </div>
                            {trend && (
                                <div className={`mr-2 flex items-baseline text-sm font-semibold ${
                                    trend > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    <FiTrendingUp className="self-center flex-shrink-0 w-4 h-4"/>
                                    <span className="sr-only">
                                        {trend > 0 ? 'افزایش' : 'کاهش'}
                                    </span>
                                    {Math.abs(trend)}%
                                </div>
                            )}
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">داشبورد مدیریت</h1>
                <p className="mt-1 text-sm text-gray-500">
                    آمار کلی و فعالیت‌های اخیر پلتفرم
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="کل کاربران"
                    value={stats.totalUsers}
                    icon={FiUsers}
                    color="blue"
                    trend={12}
                />
                <StatCard
                    title="کل دوره‌ها"
                    value={stats.totalCourses}
                    icon={FiBookOpen}
                    color="green"
                    trend={8}
                />
                <StatCard
                    title="کل مقالات"
                    value={stats.totalArticles}
                    icon={FiFileText}
                    color="yellow"
                    trend={-3}
                />
                <StatCard
                    title="کل نظرات"
                    value={stats.totalComments}
                    icon={FiMessageSquare}
                    color="purple"
                    trend={25}
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Users */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">کاربران جدید</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {stats?.recentUsers?.map((user) => (
                                <div key={user._id} className="flex items-center space-x-4 space-x-reverse">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {user.username?.charAt(0)?.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {user.username}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString('fa-IR')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Courses */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">دوره‌های جدید</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {stats.recentCourses.map((course) => (
                                <div key={course._id} className="flex items-center space-x-4 space-x-reverse">
                                    <div className="flex-shrink-0">
                                        {course.imageUrl ? (
                                            <img
                                                className="w-12 h-8 object-cover rounded"
                                                src={course.imageUrl}
                                                alt={course.name}
                                            />
                                        ) : (
                                            <div
                                                className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                                                <FiBookOpen className="w-4 h-4 text-gray-400"/>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {course.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            قیمت: {course.price.toLocaleString('fa-IR')} تومان
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                course.status
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {course.status ? 'تکمیل شده' : 'در حال تولید'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">عملیات سریع</h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            onClick={() => setIsShowCourseModal(true)}
                        >
                            <FiBookOpen className="w-4 h-4 ml-2"/>
                            ایجاد دوره جدید
                        </button>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                            onClick={() => setIsShowArticleModal(true)}
                        >
                            <FiFileText className="w-4 h-4 ml-2"/>
                            نوشتن مقاله
                        </button>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                            onClick={() => setIsShowUserModal(true)}
                        >
                            <FiUsers className="w-4 h-4 ml-2"/>
                            ایجاد کاربر
                        </button>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors">
                            <FiMessageSquare className="w-4 h-4 ml-2"/>
                            بررسی نظرات
                        </button>
                    </div>
                </div>
            </div>

            <CreateArticle
                isOpen={isShowArticleModal}
                setIsOpen={setIsShowArticleModal}
            />
            <CreateCourse
                isOpen={isShowCourseModal}
                setIsOpen={setIsShowCourseModal}
            />
            <CreateUser
                isOpen={isShowUserModal}
                setIsOpen={setIsShowUserModal}
            />
        </div>
    );
};

export default Dashboard;