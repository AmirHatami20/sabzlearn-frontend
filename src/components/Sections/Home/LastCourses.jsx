import React from 'react';
import SectionHeader from "./SectionHeader.jsx";
import CourseCard from "../../Cards/CourseCard/CourseCard.jsx";
import Loader from "../../Loader.jsx";
import {useGetCourses} from "../../../hooks/react-query/course.js";

function LastCourses() {
    const {data:courses, isLoading, error} = useGetCourses();

    return (
        <section>
            <div className="container">
                <SectionHeader
                    title="آخرین دوره های ما"
                    subtitle="سکوی پرتاب شما به سمت موفقیت"
                    link={{path: "/courses", title: "همه دوره ها"}}
                />

                {isLoading ? (
                    <Loader/>
                ) : error ? (
                    <span className="text-sm mr-14 text-red-500">{error}</span>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
                        {courses?.map((course) => (
                            <CourseCard
                                key={course._id}
                                {...course}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default LastCourses;
