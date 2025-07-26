import React, {useCallback, useContext, useEffect, useState} from 'react';
import Breadcrumb from "../components/Breadcrumb.jsx";
import {useAxios} from "../hooks/useAxios.js";
import {API_PATHS} from "../utils/apiPaths.js";
import {useParams} from "react-router-dom";
import FullLoader from "../components/FullLoader.jsx";
import CourseHeader from "../components/Sections/CourseInfo/CourseHeader.jsx";

import {
    HiOutlineInformationCircle,
    HiOutlineBriefcase,
    HiOutlineVideoCamera,
    HiOutlineClipboardDocument,
    HiAcademicCap,
    HiMiniChatBubbleLeftRight,
    HiOutlineChatBubbleBottomCenterText
} from "react-icons/hi2";
import {LuClock3, LuUsers} from "react-icons/lu";
import {SlCalender} from "react-icons/sl";
import {FaUsers, FaStar} from "react-icons/fa6";
import {IoDocumentText} from "react-icons/io5";
import {GoAlert} from "react-icons/go";
import {BsStars} from "react-icons/bs";

import noProfile from "../assets/images/no-profile.jpg";

import CourseBoxInfo from "../components/Sections/CourseInfo/CourseBoxInfo.jsx";
import CourseProgressBar from "../components/Sections/CourseInfo/CourseProgressBar.jsx";
import ContentHeader from "../components/Sections/CourseInfo/ContentHeader.jsx";
import CourseDescription from "../components/Sections/CourseInfo/CourseDescription.jsx";
import CourseHeadline from "../components/Sections/CourseInfo/CourseHeadline.jsx";
import CourseRelated from "../components/Sections/CourseInfo/CourseRelated.jsx";
import CourseComments from "../components/Sections/CourseInfo/CourseComments.jsx";
import {AuthContext} from "../context/AuthContext.jsx";
import Toast from "../components/Toast.jsx";
import {toPersianNumber} from "../utils/helper.js";
import axiosInstance from "../utils/axiosInstance.js";

function CourseInfoPage() {
    const {request, loading} = useAxios();
    const [courseInfo, setCourseInfo] = useState(null);
    const [showAddComment, setShowAddComment] = useState(false);
    const [toast, setToast] = useState(null); // type , message
    const [commentValue, setCommentValue] = useState("");

    const {isLoginIn, token} = useContext(AuthContext);

    const {courseName} = useParams();

    useEffect(() => {
        if (!courseName) return;
        request({
            method: "GET",
            url: API_PATHS.COURSE.GET_BY_NAME(courseName),
        }).then(res => {
            setCourseInfo(res.data);
        });
    }, [courseName]);

    const showToast = useCallback(({type, message, duration = 3000}) => {
        setToast({type, message, duration});
        setTimeout(() => setToast(null), duration + 300);
    }, []);

    const handleShowAddComment = () => {
        if (!isLoginIn) {
            showToast({type: "error", message: "ابتدا در سایت ثبت نام کنید"});
            return;
        }
        setShowAddComment(true);
    }

    const handleAddComment = async () => {
        if (commentValue < 3) {
            showToast({type: "error", message: "نظر باید بیشتر از 3 حرف باشد."})
            return;
        }

        setShowAddComment(false);

        await axiosInstance.post(
            API_PATHS.COMMENT.CREATE(courseInfo?._id),
            {body: commentValue},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(() => {
            showToast({type: "success", message: "ok"})
        }).catch((err) => {
            console.log("AXIOS ERROR:", err?.response?.data);
            showToast({type: "error", message: err.message})
        })

    }

    const mainBoxData = [
        {
            title: "وضعیت دوره",
            subtitle: courseInfo?.status === "ended" ? "به پایان رسیده" : "در حال برگزاری",
            icon: HiOutlineInformationCircle,
        },
        {
            title: "مدت زمان دوره",
            subtitle: "۲ ساعت",
            icon: LuClock3,
        },
        {
            title: "آخرین بروزرسانی",
            subtitle: "1404/02/28",
            icon: SlCalender,
        },
        {
            title: "روش پشتیبانی",
            subtitle: courseInfo?.support || "ندارد",
            icon: LuUsers,
        },
        {
            title: "پیش‌نیاز",
            subtitle: "ندارد",
            icon: HiOutlineBriefcase,
        },
        {
            title: "نوع مشاهده",
            subtitle: "بصورت آنلاین",
            icon: HiOutlineVideoCamera,
        },
    ];

    const asideBoxData = [
        {
            title: toPersianNumber(courseInfo?.courseStudentsCount) || "۰",
            subtitle: "دانشجو",
            icon: FaUsers,
            variant: "secendery",
        },
        {
            title: "۵.۰",
            subtitle: "رضایت",
            icon: FaStar,
            variant: "secendery",
            star: true,
        },
    ];

    if (loading || !courseInfo) return <FullLoader/>;

    return (
        <main className="container mt-8 md:mt-10">
            <Breadcrumb
                items={[
                    {title: "دوره ها", href: "/courses"},
                    {
                        title: courseInfo.category?.title || "بدون دسته‌بندی",
                        href: `/course-cat/${courseInfo.category?.name || ''}`,
                    },
                    {
                        title: courseInfo.name,
                        href: `/course/${courseInfo.shortName}`,
                    },
                ]}
            />

            <CourseHeader
                title={courseInfo?.name}
                description={courseInfo?.description}
                discount={courseInfo?.discount}
                discountExp="2025-06-11T00:12:00"
                price={courseInfo.price}
                poster={courseInfo.imageUrl}
            />

            {/* Course data */}
            <section className="grid grid-cols-12 gap-6 sm:gap-7 mt-7 lg:mt-20">
                {/* Left Section - Course Info Boxes & Description */}
                <div className="col-span-12 lg:col-span-8">
                    {/* Info boxes */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {mainBoxData.map(({title, subtitle, icon}, index) => (
                            <CourseBoxInfo
                                key={index}
                                title={title}
                                subtitle={subtitle}
                                icon={icon}
                                variant="primary"
                            />
                        ))}
                    </div>
                    {/* Description */}
                    <div className="content-wrapper sm:p-5 mt-8">
                        <ContentHeader
                            title="توضیحات"
                            color="#fbbf24"
                            icon={IoDocumentText}
                        />
                        <div className="my-8">
                            <img
                                className="rounded-lg w-full h-full"
                                src={courseInfo.imageUrl}
                                alt="course-cover"
                            />
                        </div>
                        <h2>معرفی دوره{courseInfo.name}</h2>
                        <p>{courseInfo.description}</p>

                        <CourseDescription
                            text={courseInfo.fullDescription}
                        />
                    </div>
                    {/* Headline */}
                    <div className="content-wrapper sm:p-5 mt-8">
                        <ContentHeader
                            title="سرفصل ها"
                            color="#0a97d4"
                            icon={HiAcademicCap}
                        />
                        <CourseHeadline
                            courseId={courseInfo?._id}
                        />
                    </div>
                    {/* Related */}
                    <div className="content-wrapper hidden lg:block sm:p-5 mt-8">
                        <ContentHeader
                            title="دوره های مرتبط"
                            color="#fbbf24"
                            icon={BsStars}
                        />
                        <CourseRelated
                            courseId={courseInfo?._id}
                        />
                    </div>
                    {/* Comments */}
                    <div className="content-wrapper sm:p-5 mt-8">
                        <ContentHeader
                            title="نظرات"
                            color="#db2e34"
                            icon={HiMiniChatBubbleLeftRight}
                            button={true}
                            buttonText="ایجاد نظر جدید"
                            buttonIcon={HiOutlineChatBubbleBottomCenterText}
                            onClick={handleShowAddComment}
                        />
                        {!showAddComment ? (
                            <div
                                className="bg-blue-50 text-primary dark:bg-blue-500/10 p-4.5 md:p-5 rounded-xl text-sm md:font-dana-demiBold mb-6"
                            >
                                دانشجوی عزیز؛ سوالات مرتبط به پشتیبانی دوره در قسمت نظرات تایید نخواهد شد، لطفا در بخش
                                مشاهده آنلاین هر ویدیو سوالات خود را مطرح کنید.
                            </div>
                        ) : (
                            <div className="mb-10">
                                <div
                                    className="flex items-center gap-x-3 md:gap-x-1 bg-red-500 text-sm text-white px-4 py-3 rounded-xl mb-3"
                                >
                                    <GoAlert className="text-xl"/>
                                    <span>لطفا پرسش مربوط به هر درس یا ویدئو دوره را در صفحه همان ویدئو مطرح کنید.</span>
                                </div>

                                <textarea
                                    className="w-full block p-4.5 md:p-4 min-h-36 bg-gray-100 dark:bg-secendery-dark text-gray-900 dark:text-white placeholder:text-slate-500/70 dark:placeholder:text-slate-200 font-danaMedium text-sm rounded-lg"
                                    placeholder="نظر خود را بنویسید..."
                                    value={commentValue}
                                    onChange={(e) => setCommentValue(e.target.value)}
                                />

                                <div className="flex gap-x-4 justify-between md:justify-end mt-4.5 sm:mt-6">
                                    <button
                                        className="flex items-center justify-center w-36 h-12 rounded-lg border border-primary text-primary"
                                        onClick={() => setShowAddComment(false)}
                                    >
                                        لغو
                                    </button>

                                    <button
                                        className="flex items-center justify-center w-36 h-12 rounded-lg bg-primary text-white"
                                        onClick={handleAddComment}
                                    >
                                        ارسال
                                    </button>
                                </div>

                            </div>
                        )}

                        <CourseComments
                            courseId={courseInfo?._id}
                        />
                    </div>
                </div>

                {/* Right Section - Aside Stats */}
                <aside className="col-span-12 lg:col-span-4 space-y-8">
                    {/* Student & Rating & Progress */}
                    <div className="content-wrapper">
                        <div className="flex gap-x-4">
                            {asideBoxData.map(({title, subtitle, icon, variant, star}, index) => (
                                <CourseBoxInfo
                                    key={index}
                                    title={title}
                                    subtitle={subtitle}
                                    icon={icon}
                                    variant={variant}
                                    star={star}
                                />
                            ))}
                        </div>
                        <CourseProgressBar
                            percent={10}
                        />
                    </div>
                    {/* Teacher */}
                    <div className="content-wrapper">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-20 h-20">
                                <img
                                    className="w-full h-full rounded-full"
                                    src={noProfile}
                                    alt="profile"
                                />
                            </div>
                            <span
                                className="font-dana-demiBold text-lg">مدرس دوره | نامشخص</span>
                            <p className="text-center">
                                برنامه نویس فول استک وب ،موبایل ،دستکاپ کارشناس ارشد مهندسی
                                کامپیوتر نرم افزار
                            </p>
                            <button className="primary-btn">
                                مشاهده پروفایل من
                            </button>
                        </div>
                    </div>
                    {/* Short link */}
                    <div className="content-wrapper">
                        <div className="flex flex-col items-center space-y-2">
                            <span className="font-dana-demiBold text-lg">لینک کوتاه آموزش </span>
                            <div
                                className="w-full flex items-center justify-between gap-x-3 p-4 mt-4.5 bg-sky-50 dark:bg-sky-500/10 text-sky-500 border border-dashed border-sky-500 rounded-xl"
                            >
                                <HiOutlineClipboardDocument className="text-3xl"/>
                                <span>sabzlearn.ir/?p=6171</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </section>

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    duration={3000}
                />
            )}
        </main>
    );
}

export default CourseInfoPage;
