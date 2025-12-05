import React from 'react';
import SectionHeader from "./SectionHeader.jsx";
import SwiperWrapper from "../../SwiperWrapper.jsx";
import Loader from "../../Loader.jsx";
import {useGetCourses} from "../../../hooks/react-query/course.js";

function NewCourses() {
    const {data: courses, isLoading, error} = useGetCourses();

    return (
        <section className="section-wrapper">
            <div className="container relative">
                <SectionHeader
                    title="جدید ترین ها"
                    subtitle="دوره های جدید، فرصت های نو"
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

export default NewCourses;