import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {commentService} from "../../services/commentService.js";

// GET ALL COMMENTS FOR A COURSE
export const useGetComments = (courseId) => {
    return useQuery({
        queryKey: ["comments", courseId],
        queryFn: () => commentService.getAll(courseId),
        enabled: !!courseId,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });
};

// CREATE COMMENT
export const useCreateComment = (courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body) => commentService.create(courseId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["comments", courseId]});
        },
    });
};

// ANSWER COMMENT
export const useAnswerComment = (courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body) => commentService.answer(courseId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["comments", courseId]});
        },
    });
};

// ACCEPT COMMENT
export const useAcceptComment = (courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (commentId) => commentService.accept(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["comments", courseId]});
        },
    });
};

// REJECT COMMENT
export const useRejectComment = (courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (commentId) => commentService.reject(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["comments", courseId]});
        },
    });
};

// DELETE COMMENT
export const useDeleteComment = (courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (commentId) => commentService.delete(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["comments", courseId]});
        },
    });
};
