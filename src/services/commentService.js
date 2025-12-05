import axiosClient from "../utils/axios.js";

export const commentService = {
    getAll: async (courseId) => {
        const res = await axiosClient.get(`/comment/${courseId}`);
        return res.data;
    },
    create: async (courseId, body) => {
        const res = await axiosClient.post(`/comment/${courseId}`, body);
        return res.data;
    },
    answer: async (courseId, body) => {
        const res = await axiosClient.post(`/comment/answer/${courseId}`, body);
        return res.data;
    },
    accept: async (commentId) => {
        const res = await axiosClient.put(`/comment/accept/${commentId}`);
        return res.data;
    },

    reject: async (commentId) => {
        const res = await axiosClient.put(`/comment/reject/${commentId}`);
        return res.data;
    },

    delete: async (commentId) => {
        const res = await axiosClient.delete(`/comment/${commentId}`);
        return res.data;
    }
}