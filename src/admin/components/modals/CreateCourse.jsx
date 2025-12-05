import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';
import {FiImage} from "react-icons/fi";
import {useGetCategories} from "../../../hooks/react-query/category.js";

const CreateCourse = ({isOpen, setIsOpen}) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        shortName: '',
        category: '',
        discount: '',
        support: '',
        status: 'draft',
    });
    const [image, setImage] = useState(null);

    const {data: categories, isLoading} = useGetCategories()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-xl text-center font-bold mb-4">
                                    ایجاد دوره جدید
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {[
                                        {label: 'عنوان دوره', name: 'name'},
                                        {label: 'توضیح کوتاه', name: 'description'},
                                        {label: 'قیمت (تومان)', name: 'price', type: 'number'},
                                        {label: 'نام کوتاه (URL)', name: 'shortName'},
                                        {label: 'تخفیف (%)', name: 'discount', type: 'number'},
                                        {label: 'پشتیبانی', name: 'support'},
                                    ].map(({label, name, type = 'text'}) => (
                                        <div key={name}>
                                            <label className="block text-sm text-right font-medium mb-1">{label}</label>
                                            <input
                                                type={type}
                                                name={name}
                                                value={form[name]}
                                                onChange={handleChange}
                                                className="w-full border outline-primary rounded px-3 py-2"
                                                required
                                            />
                                        </div>
                                    ))}

                                    {/* دسته‌بندی */}
                                    <div>
                                        <label className="block text-sm text-right font-medium mb-1">دسته‌بندی</label>
                                        <select
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            className="w-full border rounded outline-primary px-3 py-2"
                                            required
                                        >
                                            <option value="">انتخاب دسته‌بندی...</option>
                                            {categories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* وضعیت */}
                                    <div>
                                        <label className="block text-sm text-right font-medium mb-1">وضعیت دوره</label>
                                        <select
                                            name="status"
                                            value={form.status}
                                            onChange={handleChange}
                                            className="w-full border rounded outline-primary px-3 py-2"
                                        >
                                            <option value="draft">پیش‌نویس</option>
                                            <option value="published">منتشر شده</option>
                                        </select>
                                    </div>

                                    {/* عکس */}
                                    <div>
                                        <label className="block text-sm text-right font-medium mb-1">عکس</label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('course-image-input')?.click()}
                                                className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm"
                                            >
                                                <FiImage className="w-5 h-5 ml-2 text-gray-600"/>
                                                انتخاب عکس
                                            </button>
                                            {image && (
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt="preview"
                                                    className="h-16 w-24 object-cover rounded border"
                                                />
                                            )}
                                        </div>
                                        <input
                                            id="course-image-input"
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-primary hover:bg-blue-700 transition-colors text-white py-2 rounded mt-4"
                                    >
                                        {isLoading ? 'در حال ارسال...' : 'ثبت دوره'}
                                    </button>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CreateCourse;
