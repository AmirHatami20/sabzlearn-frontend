import axiosClient from "../utils/axios.js";

export const sessionService = {
    // Create a section for a course
    createSection: async (courseId, data) => {
        const res = await axiosClient.post(`/session/${courseId}/section`, data);
        return res.data;
    },

    // Create a session for a course
    createSession: async (courseId, formData) => {
        const res = await axiosClient.post(`/session/${courseId}/sessions`, formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });
        return res.data;
    },

    // Get all sessions for a course
    getSessions: async (courseId) => {
        const res = await axiosClient.get(`/session/${courseId}/sessions`);
        return res.data;
    },

    // Get info for a specific session
    getSessionInfo: async (courseId, sessionId) => {
        const res = await axiosClient.get(`/session/${courseId}/sessions/${sessionId}`);
        return res.data;
    },

    // Delete a session
    deleteSession: async (courseId, sessionId) => {
        const res = await axiosClient.delete(`/session/${courseId}/sessions/${sessionId}`);
        return res.data;
    }
};
