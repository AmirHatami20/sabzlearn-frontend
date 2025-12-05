import React, {useState, useEffect} from 'react';
import {
    FiFileText,
    FiPlus,
    FiSearch,
    FiRefreshCw,
    FiCheck,
} from 'react-icons/fi';

import CreateArticle from "../components/modals/CreateArticle.jsx";
import {FaRegEye} from "react-icons/fa";
import {GoTrash} from "react-icons/go";
import {useGetArticles} from "../../hooks/react-query/article.js";
import {useGetCategories} from "../../hooks/react-query/category.js";

const ArticlesPage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const {data: articles = [], isLoading} = useGetArticles();
    const {data: categories = []} = useGetCategories();

    useEffect(() => {
        filterArticles();
    }, [articles, searchTerm, selectedCategory]);

    const filterArticles = () => {
        let filtered = articles;

        if (searchTerm) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.shortName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'ALL') {
            filtered = filtered.filter(article => article.category === selectedCategory);
        }

        setFilteredArticles(filtered);
    };

    const handleDeleteArticle = async () => {
        // if (!confirm('آیا از حذف این مقاله اطمینان دارید؟')) return;

        // TODO
    };

    if (isLoading) {
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
                        <h1 className="text-2xl font-bold text-gray-900">مدیریت مقالات</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            مشاهده و مدیریت مقالات سایت
                        </p>
                    </div>
                    <div className="flex gap-x-3 space-x-reverse">
                        <button
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
                            نوشتن مقاله جدید
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FiFileText className="h-6 w-6 text-gray-400"/>
                                </div>
                                <div className="mr-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">کل مقالات</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {articles.length.toLocaleString('fa-IR')}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FiCheck className="h-6 w-6 text-gray-400"/>
                                </div>
                                <div className="mr-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">منتشر شده</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {articles.filter(a => a.isPublished).length.toLocaleString('fa-IR')}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FiFileText className="h-6 w-6 text-gray-400"/>
                                </div>
                                <div className="mr-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">این ماه</dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {articles.filter(article =>
                                                new Date(article.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                                            ).length.toLocaleString('fa-IR')}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white shadow rounded-lg">
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">جستجو</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <FiSearch className="h-5 w-5 text-gray-400"/>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="عنوان مقاله یا نام کوتاه..."
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
                </div>

                {/* Articles List */}
                <div className="bg-white shadow overflow-x-hidden p-6 sm:rounded-md">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mt-0">
                        فهرست مقالات ({filteredArticles.length.toLocaleString('fa-IR')})
                    </h3>

                    {filteredArticles.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {filteredArticles.map((article) => {
                                const category = categories.find(cat => cat._id === article.category);

                                return (
                                    <li
                                        key={article._id}
                                        className="flex items-center gap-x-10 justify-between"
                                    >
                                        <div className="flex gap-x-2 items-center">
                                            <div className="w-22 h-14 shrink-0 rounded-sm overflow-hidden">
                                                {article.imageUrl ? (
                                                    <img
                                                        src={article.imageUrl}
                                                        alt={article.title}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200"/>
                                                )}
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-bold text-gray-900 line-clamp-1 overflow-hidden">
                                                    {article.title}
                                                </p>
                                                <p className="text-xs line-clamp-1 lg:w-2/3 overflow-hidden">{article.description}</p>
                                                <p className="text-xs text-primary font-semibold">{category.title}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-x-3">
                                            <button
                                                className="w-10 h-10 rounded-full flex items-center justify-center bg-primary"
                                                onClick={() => window.open(`/article-info/${article.shortName}`, '_blank')}
                                            >
                                                <FaRegEye className="text-lg text-white"/>
                                            </button>
                                            <button
                                                className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500"
                                                onClick={() => handleDeleteArticle(article._id)}
                                            >
                                                <GoTrash className="text-lg text-white"/>
                                            </button>
                                        </div>

                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="text-center py-12">
                            <FiFileText className="mx-auto h-12 w-12 text-gray-400"/>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">مقاله‌ای یافت نشد</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm || selectedCategory !== 'ALL'
                                    ? 'هیچ مقاله‌ای با این فیلترها یافت نشد.'
                                    : 'هنوز مقاله‌ای نوشته نشده است.'
                                }
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() => {
                                        setIsOpenModal(true)
                                    }}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary"
                                >
                                    <FiPlus className="w-4 h-4 ml-2"/>
                                    نوشتن اولین مقاله
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* Create Modal */}
            <CreateArticle
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
            />
        </>
    );
};

export default ArticlesPage;