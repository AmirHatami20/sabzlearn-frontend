import React from 'react';
import ContentLayout from "../layout/ContentLayout.jsx";
import {useGetArticles} from "../hooks/react-query/article.js";

function ArticlesPage() {
    const {data: articles, isLoading, error} = useGetArticles();

    return (
        <ContentLayout
            contentType="article"
            title="وبلاگ"
            filters={[
                {id: 1, title: "عادی", value: "normal"},
                {id: 2, title: "جدید ترین", value: "new"},
                {id: 3, title: "قدیمی ترین", value: "old"},
                {id: 4, title: "پر نظرها", value: "comment"},
            ]}
            items={articles}
            loading={isLoading}
            error={error}
        />
    );
}

export default ArticlesPage;