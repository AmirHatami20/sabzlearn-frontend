import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from 'react';

const CreateUser = ({isOpen, setIsOpen}) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        role: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // TODO
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
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-xl font-bold mb-4 text-center">ایجاد کاربر
                                    جدید</Dialog.Title>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {[
                                        {label: 'نام کامل', name: 'name', type: 'text'},
                                        {label: 'ایمیل', name: 'email', type: 'email'},
                                        {label: 'نام کاربری', name: 'username', type: 'text'},
                                        {label: 'رمز عبور', name: 'password', type: 'password'},
                                    ].map(({label, name, type}) => (
                                        <div key={name}>
                                            <label className="block text-sm font-medium text-right mb-1">{label}</label>
                                            <input
                                                type={type}
                                                name={name}
                                                value={form[name]}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2 outline-primary"
                                                required
                                            />
                                        </div>
                                    ))}

                                    <div>
                                        <label className="block text-sm font-medium text-right mb-1">نقش کاربر</label>
                                        <select
                                            name="role"
                                            value={form.role}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2 outline-primary"
                                            required
                                        >
                                            <option value="">انتخاب نقش...</option>
                                            <option value="user">کاربر</option>
                                            <option value="admin">ادمین</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary hover:bg-blue-700 text-white py-2 rounded mt-4"
                                    >
                                        {loading ? 'در حال ارسال...' : 'ثبت کاربر'}
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

export default CreateUser;
