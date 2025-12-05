import axiosClient from "../utils/axios.js";

export const courseService = {
    create: async (formData) => {
        const res = await axiosClient.post("/course", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    },

    getAll: async () => {
        const res = await axiosClient.get("/course");
        return res.data;
    },

    getInfo: async (shortName) => {
        const res = await axiosClient.get(`/course/${shortName}`);
        return res.data;
    },

    getRelated: async (id) => {
        const res = await axiosClient.get(`/course/related/${id}`);
        return res.data;
    },

    register: async (id) => {
        const res = await axiosClient.post(`/course/register/${id}`);
        return res.data;
    },

    delete: async (id) => {
        const res = await axiosClient.delete(`/course/${id}`);
        return res.data;
    },

    update: async (id, formData) => {
        const res = await axiosClient.put(`/course/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    }
};
