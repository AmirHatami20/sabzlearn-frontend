import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {userService} from "../../services/userService.js";

// GET ALL USERS
export const useGetUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: userService.getAll,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });
};

// DELETE USER
export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => userService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]});
        },
    });
};

// BAN USER
export const useBanUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => userService.ban(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });
};

// UNBAN USER
export const useUnbanUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => userService.unban(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
    });
};

// GET USER COURSES
export const useGetUserCourses = () => {
    return useQuery({
        queryKey: ["userCourses"],
        queryFn: userService.getUserCourses,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });
};

// GET USER BASKET
export const useGetUserBasket = () => {
    return useQuery({
        queryKey: ["userBasket"],
        queryFn: userService.getUserBasket,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });
};

// UPDATE USER
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => userService.updateUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]});
            queryClient.invalidateQueries({queryKey: ["userCourses"]});
            queryClient.invalidateQueries({queryKey: ["userBasket"]});
        },
    });
};

// CHANGE USER ROLE
export const useChangeUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => userService.changeRole(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]});
        },
    });
};
