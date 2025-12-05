import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {categoryServices} from "../../services/categoryService.js";

// GET ALL CATEGORIES
export const useGetCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: categoryServices.getAll,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });
};

// CREATE CATEGORY
export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => categoryServices.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
        },
    });
};

// UPDATE CATEGORY
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}) => categoryServices.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });
};

// DELETE CATEGORY
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => categoryServices.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["categories"]});
        },
    });
};
