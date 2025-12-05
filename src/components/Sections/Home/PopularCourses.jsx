import React from "react";

import SectionHeader from "./SectionHeader.jsx";
import SwiperWrapper from "../../SwiperWrapper.jsx";
import Loader from "../../Loader.jsx";
import {useGetCourses} from "../../../hooks/react-query/course.js";

function PopularCourses() {
    const {data: courses, isLoading, error} = useGetCourses();

    return (
        <section className="section-wrapper">
            <div className="container relative">
                <SectionHeader
                    title="پرطرفدار ترین دوره ها"
                    subtitle="دوره های محبوب و پروژه محور سبزلرن"
                />

                {/* Swiper */}
                {isLoading ? (
                    <Loader/>
                ) : error ? (
                    <span className="text-sm mr-14 text-red-500">{error}</span>
                ) : (
                    <SwiperWrapper
                        items={courses}
                    />
                )}
            </div>
        </section>
    );
}

export default PopularCourses;
