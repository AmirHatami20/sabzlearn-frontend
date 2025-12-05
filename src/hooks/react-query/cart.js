import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {cartServices} from "../../services/cartServices.js";

export const useGetUserCart = () => {
    return useQuery({
        queryKey: ["userCart"],
        queryFn: cartServices.getUserCart,
        staleTime: 1000 * 60 * 5
    });
};

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (courseId) => cartServices.addToCart(courseId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["userCart"]});
        },
    });
};

export const useRemoveFromCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (courseId) => cartServices.removeFromCart(courseId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["userCart"]});
        },
    });
};
