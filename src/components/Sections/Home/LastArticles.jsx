import React from 'react';
import SectionHeader from "./SectionHeader.jsx";
import ArticleCard from "../../Cards/ArticleCard.jsx";
import Loader from "../../Loader.jsx";
import {useGetArticles} from "../../../hooks/react-query/article.js";

function LastArticles() {
    const {data:articles, isLoading, error} = useGetArticles();

    return (
        <section className="section-wrapper">
            <div className="container">
                <SectionHeader
                    title="آخرین مقالات ما"
                    subtitle="مقاله های بروز برنامه نویسی و تکنولوژی"
                    link={{path: "/articles", title: "همه مقالات"}}
                />

                {isLoading ? (
                    <Loader/>
                ) : error ? (
                    <span className="text-sm mr-14 text-red-500">{error}</span>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
                        {articles?.map((course) => (
                            <ArticleCard
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

export default LastArticles;