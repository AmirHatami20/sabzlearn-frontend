import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {offService} from "../../services/offService.js";

// GET ALL OFF CODES
export const useGetOffs = () => {
    return useQuery({
        queryKey: ["offs"],
        queryFn: offService.getAll,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });
};

// GET ONE OFF BY ID
export const useGetOff = (id) => {
    return useQuery({
        queryKey: ["off", id],
        queryFn: () => offService.getOne(id),
        enabled: !!id,
    });
};

// CREATE OFF
export const useCreateOff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => offService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(["offs"]);
        },
    });
};

// DELETE OFF
export const useDeleteOff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => offService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["offs"]);
        },
    });
};

// USE OFF CODE
export const useUseOffCode = (courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (code) => offService.useCode(courseId, code),
        onSuccess: () => {
            queryClient.invalidateQueries(["offs"]);
        },
    });
};

// SET OFF ON ALL COURSES
export const useSetOffOnAll = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (discount) => offService.setOnAll(discount),
        onSuccess: () => {
            queryClient.invalidateQueries(["offs"]);
        },
    });
};
