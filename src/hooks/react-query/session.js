import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {sessionService} from "../../services/sessionService.js";

// GET ALL SESSIONS FOR A COURSE
export const useGetSessions = (courseId) => {
    return useQuery({
        queryKey: ["sessions", courseId],
        queryFn: () => sessionService.getSessions(courseId),
        enabled: !!courseId,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    });
};

// GET INFO OF A SINGLE SESSION
export const useGetSessionInfo = (courseId, sessionID) => {
    return useQuery({
        queryKey: ["sessionInfo", courseId, sessionID],
        queryFn: () => sessionService.getSessionInfo(courseId, sessionID),
        enabled: !!courseId && !!sessionID,
    });
};

// CREATE SECTION
export const useCreateSection = (courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (title) => sessionService.createSection(courseId, title),
        onSuccess: () => {
            queryClient.invalidateQueries(["sessions", courseId]);
        },
    });
};

// CREATE SESSION
export const useCreateSession = (courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData) => sessionService.createSession(courseId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries(["sessions", courseId]);
        },
    });
};

// DELETE SESSION
export const useDeleteSession = (courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (sessionID) => sessionService.deleteSession(sessionID),
        onSuccess: () => {
            queryClient.invalidateQueries(["sessions", courseId]);
        },
    });
};
