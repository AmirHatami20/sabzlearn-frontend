import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import {FaCheck} from "react-icons/fa";
import {FiX} from "react-icons/fi";

let toastHandler = null;

export const toast = (message, type = "success", duration = 3000) => {
    if (toastHandler) toastHandler({message, type, duration});
};

export const ToastProvider = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        toastHandler = ({message, type, duration}) => {
            const id = Date.now();
            setToasts(prev => [...prev, {id, message, type, duration}]);
        };
        return () => {
            toastHandler = null;
        }
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return createPortal(
        <div className="fixed top-8 left-6 z-50 flex flex-col gap-4">
            {toasts.map(t => (
                <ToastItem
                    key={t.id}
                    message={t.message}
                    type={t.type}
                    duration={t.duration}
                    onClose={() => removeToast(t.id)}
                />
            ))}
        </div>,
        document.body
    );
};

const ToastItem = ({message, type, duration, onClose}) => {
    const [visible, setVisible] = useState(true);

    const toastStyles = {
        success: {
            icon: <FaCheck/>,
            color: "bg-green-600",
            title: "موفق",
            border: "border-green-500"
        },
        error: {
            icon: <FiX/>,
            color: "bg-red-600",
            title: "خطا",
            border: "border-red-600"
        }
    };

    const {icon, color, title, border} = toastStyles[type] || toastStyles["success"];

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`flex items-center gap-x-5 px-6 py-4 border-b-3 text-gray-900 dark:text-white bg-white dark:bg-secendery-dark text-sm transform transition-all duration-300 
            ${border} ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
            <div
                className={`w-10 h-10 text-xl flex items-center justify-center rounded-full text-white dark:text-gray-900 ${color}`}
            >
                {icon}
            </div>
            <div className="flex flex-col items-start gap-y-1">
                <span className="font-dana-bold text-lg">
                    {title}
                </span>
                <p>{message}</p>
            </div>
        </div>
    );
};
