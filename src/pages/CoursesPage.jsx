import ContentLayout from "../layout/ContentLayout.jsx";
import {useSearchParams} from "react-router-dom";
import {useGetCategories} from "../hooks/react-query/category.js";
import {useGetCourses} from "../hooks/react-query/course.js";

function CoursesPage() {
    const {categories} = useGetCategories();
    const {data: courses, isLoading, error} = useGetCourses();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("s") || "";

    return (
        <ContentLayout
            contentType="course"
            title="دوره ها"
            filters={[
                {id: 1, title: "همه دوره ها", value: "all"},
                {id: 2, title: "ارزان ترین", value: "cheap"},
                {id: 3, title: "گران ترین", value: "expensive"},
                {id: 4, title: "پر مخاطب ترین", value: "popular"},
            ]}
            items={courses}
            categories={categories}
            loading={isLoading}
            error={error}
            searchVal={searchQuery}
        />
    );
}

export default CoursesPage;