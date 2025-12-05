import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {authService} from "../../services/authService.js";

export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => authService.register(data),
        onSuccess: (data) => {
            queryClient.setQueryData(["me"], data);
        },
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => authService.login(data),
        onSuccess: (data) => {
            queryClient.setQueryData(["me"], data);
        },
    });
};

export const useVerifyOtp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => authService.verifyOtp(data),
        onSuccess: (data) => {
            queryClient.setQueryData(["me"], data);
        },
    });
};

export const useGetMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: authService.getMe,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });
};
