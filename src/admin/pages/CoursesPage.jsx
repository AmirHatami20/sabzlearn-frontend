import React, {useState, useEffect} from 'react';
import {
    FiBookOpen,
    FiPlus,
    FiSearch,
    FiRefreshCw,
    FiCheck,
} from 'react-icons/fi';

import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";

import CreateCourse from "../components/modals/CreateCourse.jsx";
import {FaRegEye} from "react-icons/fa";
import {GoTrash} from "react-icons/go";

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [courses, searchTerm, selectedCategory]);

    const fetchData = async () => {
        try {
            const [coursesRes, categoriesRes] = await Promise.all([
                axiosInstance.get(API_PATHS.COURSE.GET_ALL),
                axiosInstance.get(API_PATHS.CATEGORY.GET_ALL)
            ]);
            setCourses(coursesRes.data);
            setCategories(categoriesRes.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            alert('خطا در دریافت اطلاعات دوره‌ها');
        } finally {
            setLoading(false);
        }
    };

    const filterCourses = () => {
        let filtered = courses;

        if (searchTerm) {
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.shortName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'ALL') {
            filtered = filtered.filter(course => course.category === selectedCategory);
        }

        setFilteredCourses(filtered);
    };

    const handleDeleteCourse = async (courseId) => {
        if (!confirm('آیا از حذف این دوره اطمینان دارید؟')) return;

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.userToken;

            await axiosInstance.delete(API_PATHS.COURSE.DELETE(courseId), {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setCourses(courses.filter(course => course._id !== courseId));
            alert('دوره با موفقیت حذف شد');
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('خطا در حذف دوره');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">مدیریت دوره‌ها</h1>
                        <p className="mt-1 text-sm text-gray-500">مشاهده و مدیریت دوره‌های سایت</p>
                    </div>
                    <div className="flex gap-x-3 space-x-reverse">
                        <button
                            onClick={fetchData}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <FiRefreshCw className="w-4 h-4 ml-2"/>
                            بروزرسانی
                        </button>
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary"
                            onClick={() => setIsOpenModal(true)}
                        >
                            <FiPlus className="w-4 h-4 ml-2"/>
                            ایجاد دوره جدید
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <StatCard icon={<FiBookOpen/>} label="کل دوره‌ها" value={courses.length}/>
                    <StatCard icon={<FiCheck/>} label="منتشر شده" value={courses.filter(c => c.isPublished).length}/>
                    <StatCard icon={<FiBookOpen/>} label="این ماه" value={
                        courses.filter(course =>
                            new Date(course.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
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
                                    placeholder="عنوان دوره یا نام کوتاه..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">دسته‌بندی</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            >
                                <option value="ALL">همه دسته‌ها</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Course List */}
                <div className="bg-white shadow overflow-x-hidden p-6 sm:rounded-md">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mt-0">
                        فهرست دوره‌ها ({filteredCourses.length.toLocaleString('fa-IR')})
                    </h3>
                    {filteredCourses.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {filteredCourses.map((course) => {
                                return (
                                    <li key={course._id} className="flex items-center gap-x-10 justify-between py-4">
                                        <div className="flex gap-x-2 items-center">
                                            <div className="w-22 h-14 shrink-0 rounded-sm overflow-hidden">
                                                {course.imageUrl ? (
                                                    <img src={course.imageUrl} alt={course.title}
                                                         className="object-cover w-full h-full"/>
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200"/>
                                                )}
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{course.name}</p>
                                                <p className="text-xs line-clamp-1">{course.description}</p>
                                                <p className="text-xs text-primary font-semibold">{course.category?.title || ''}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-3">
                                            <button
                                                className="w-10 h-10 rounded-full flex items-center justify-center bg-primary">
                                                <FaRegEye className="text-lg text-white"/>
                                            </button>
                                            <button onClick={() => handleDeleteCourse(course._id)}
                                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500">
                                                <GoTrash className="text-lg text-white"/>
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="text-center py-12">
                            <FiBookOpen className="mx-auto h-12 w-12 text-gray-400"/>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">دوره‌ای یافت نشد</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm || selectedCategory !== 'ALL'
                                    ? 'هیچ دوره‌ای با این فیلترها یافت نشد.'
                                    : 'هنوز دوره‌ای ایجاد نشده است.'}
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsOpenModal(true)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary"
                                >
                                    <FiPlus className="w-4 h-4 ml-2"/>
                                    ایجاد اولین دوره
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Modal */}
            <CreateCourse isOpen={isOpenModal} setIsOpen={setIsOpenModal}/>
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

export default CoursesPage;
