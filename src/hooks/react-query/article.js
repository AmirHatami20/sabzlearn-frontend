import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {articleService} from "../../services/articleService.js";

// GET ALL ARTICLES
export const useGetArticles = () => {
    return useQuery({
        queryKey: ["articles"],
        queryFn: articleService.getAll,
        staleTime: 1000 * 60 * 5, // 5 sec
        cacheTime: 1000 * 60 * 30, // 30 sec
    });
}

//  GET ARTICLE BY ID
export const useGetArticleById = (id) => {
    return useQuery({
        queryKey: ["article", id],
        queryFn: () => articleService.getById(id),
        enabled: !!id
    });
};

// CREATE ARTICLE
export const useCreateArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData) => articleService.create(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["articles"]});
        },
    });
};

//  DELETE ARTICLE
export const useDeleteArticle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => articleService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["articles"]});
        },
    });
};
