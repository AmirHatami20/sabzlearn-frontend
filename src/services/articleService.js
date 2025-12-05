import axiosClient from "../utils/axios.js";

export const articleService = {
    create: async (formData) => {
        const res = await axiosClient.post("/article", formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });
        return res.data;
    },

    getAll: async () => {
        const res = await axiosClient.get("/article");
        return res.data;
    },

    getById: async (id) => {
        const res = await axiosClient.get(`/article/${id}`);
        return res.data;
    },

    remove: async (id) => {
        const res = await axiosClient.delete(`/article/${id}`);
        return res.data;
    },
};
