import {useParams} from 'react-router-dom';
import ContentLayout from "../layout/ContentLayout.jsx";
import {useGetCategories} from "../hooks/react-query/category.js";
import {useGetCourses} from "../hooks/react-query/course.js";

function CoursesPage() {
    const {categoryName} = useParams();

    const {data: categories = []} = useGetCategories();
    const {data = [], isLoading, error} = useGetCourses();

    const selectedCategory = categories.find(c => c.name === categoryName);
    const displayTitle = selectedCategory?.title || "";

    const courses = data.filter(c => c.category._id === selectedCategory._id);

    return (
        <ContentLayout
            contentType="category"
            title={`دوره‌های ${displayTitle}`}
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
        />
    );
}

export default CoursesPage;
