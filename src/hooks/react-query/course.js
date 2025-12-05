import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {courseService} from "../../services/courseService.js";

// GET ALL COURSES
export const useGetCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: courseService.getAll,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });
};

// GET COURSE INFO BY SHORTNAME
export const useGetCourseInfo = (shortName) => {
    return useQuery({
        queryKey: ["courseInfo", shortName],
        queryFn: () => courseService.getInfo(shortName),
        enabled: !!shortName,
    });
};

// GET RELATED COURSES
export const useGetRelatedCourses = (id) => {
    return useQuery({
        queryKey: ["relatedCourses", id],
        queryFn: () => courseService.getRelated(id),
        enabled: !!id,
    });
};

// CREATE COURSE
export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData) => courseService.create(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["courses"]});
        },
    });
};

// UPDATE COURSE
export const useUpdateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, formData}) => courseService.update(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["courses"]});
        },
    });
};

// DELETE COURSE
export const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => courseService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["courses"]});
        },
    });
};

// REGISTER FOR COURSE
export const useRegisterCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => courseService.register(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["courses"]});
        },
    });
};

// ADD COURSE TO BASKET
export const useAddCourseToBasket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => courseService.addToBasket(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["courses"]});
        },
    });
};
