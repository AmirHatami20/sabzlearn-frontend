import {useRef, useState} from "react";
import {PiPhoneLight} from "react-icons/pi";
import {HiOutlineUser} from "react-icons/hi2";
import {CiLock, CiMail} from "react-icons/ci";
import {FaArrowLeft} from "react-icons/fa";

import {useForm} from "../../hooks/useForm.js";
import {Link, useNavigate} from "react-router-dom";
import {toEnglishDigits, toPersianNumber} from "../../utils/helper.js";

import AuthInput from "./AuthInput.jsx";
import {useLogin, useRegister, useVerifyOtp} from "../../hooks/react-query/auth.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {toast} from "../ToastManager.jsx";

function AuthForm({mode, title, linkTitle, subTitle, linkHref}) {
    const navigate = useNavigate();
    const inputRefs = useRef([]);
    const [step, setStep] = useState("credentials");
    const {setUser} = useAuth();

    const getFields = (mode) => {
        if (mode === "login") {
            return [
                {name: "email", placeholder: "آدرس ایمیل", icon: CiMail, type: "email"},
            ];
        }

        return [
            {name: "username", placeholder: "نام کاربری", icon: HiOutlineUser, type: "text"},
            {name: "phone", placeholder: "شماره موبایل", icon: PiPhoneLight, type: "text"},
            {name: "email", placeholder: "آدرس ایمیل", icon: CiMail, type: "email"},
            {name: "password", placeholder: "رمز عبور", icon: CiLock, type: "password"},
        ];
    };

    const initialInputs = Object.fromEntries(
        getFields(mode).map(field => [field.name, {value: "", isValid: false}])
    );

    const {formState, onInputHandler} = useForm(initialInputs);

    const registerMutation = useRegister();
    const loginMutation = useLogin();
    const verifyMutation = useVerifyOtp();

    const isLoading = registerMutation.isPending || loginMutation.isPending || verifyMutation.isPending;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(Object.entries(formState.inputs).map(([k, v]) => [k, v.value]));

        if (step === "credentials") {
            if (mode === "login") {
                loginMutation.mutate(formData, {
                    onSuccess: () => {
                        toast("کد تایید به ایمیل شما ارسال شد.", "success");
                        setStep("code");
                    },
                    onError: (err) => toast(err.response?.data?.message || "خطا", "error")
                });
            } else {
                registerMutation.mutate(formData, {
                    onSuccess: () => {
                        toast("کد تایید به ایمیل شما ارسال شد.", "success");
                        setStep("code");
                    },
                    onError: (err) => toast(err.response?.data?.message || "خطا", "error")
                });
            }
        } else if (step === "code") {
            const code = toEnglishDigits(inputRefs.current.map(ref => ref.value).join(""));

            verifyMutation.mutate({code, mode, ...formData}, {
                onSuccess: (res) => {
                    setUser(res.user);
                    toast(res.message || "ورود موفق", "success");
                    navigate("/");
                },
                onError: (err) => toast(err.response?.data?.message || "کد اشتباه است", "error")
            });
        }
    };

    const handleBack = () => setStep("credentials");

    const newInputHandler = (e, index) => {
        const val = e.target.value;
        if (/^\d$/.test(val)) {
            inputRefs.current[index].value = toPersianNumber(val);

            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            } else {
                setTimeout(() => {
                    handleSubmit(new Event("submit"));
                }, 100);
            }
        } else {
            e.target.value = "";
        }
    };

    const prevInputHandler = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {step === "credentials" && (
                <>
                    <h4 className="font-dana-bold text-xl mb-4">{title}</h4>
                    <p className="mb-4">
                        {subTitle}{" "}
                        <Link to={linkHref} className="text-primary">{linkTitle}</Link>
                    </p>

                    {getFields(mode).map(({name, placeholder, icon, type = "text"}) => (
                        <AuthInput
                            key={name}
                            name={name}
                            placeholder={placeholder}
                            value={formState.inputs[name].value}
                            onInputHandler={onInputHandler}
                            icon={icon}
                            type={type}
                            isValid={formState.inputs[name].isValid}
                        />
                    ))}
                </>
            )}

            {step === "code" && (
                <>
                    <div className="flex justify-between items-center">
                        <h4 className="font-dana-bold text-xl">کد تایید</h4>
                        <button onClick={handleBack} className="p-1 bg-slate-500 rounded-full text-white">
                            <FaArrowLeft className="w-3.5 h-3.5"/>
                        </button>
                    </div>
                    <span className="block text-center my-4 font-dana-light">
                        کد تایید برای {formState.inputs.email.value} ارسال شد.
                    </span>
                    <div className="flex justify-between mb-4 md:mb-4.5" dir="ltr">
                        {Array(5).fill(0).map((_, index) => (
                            <input
                                key={index}
                                ref={(el) => inputRefs.current[index] = el}
                                onInput={(e) => newInputHandler(e, index)}
                                onKeyDown={(e) => prevInputHandler(e, index)}
                                className="w-13 h-13 bg-gray-100 dark:bg-secondary-dark focus:outline-1 text-center rounded-[10px] text-lg"
                                type="text"
                                maxLength='1'
                                inputMode="numeric"
                                required
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>
                </>
            )}

            <button
                type="submit"
                className={`w-full text-white py-3 rounded-md ${formState.isFormValid || isLoading ? "bg-primary" : "bg-red-500/80 cursor-not-allowed"}`}
                disabled={!formState.isFormValid || isLoading}
            >
                {isLoading ? "در حال پردازش..." : step === "credentials" ? "ادامه" : "تایید"}
            </button>
        </form>
    );
}

export default AuthForm;
