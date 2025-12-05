import axiosClient from "../utils/axios.js";

export const categoryServices = {
    create: async (data) => {
        const res = await axiosClient.post("/category", data);
        return res.data;
    },
    getAll: async () => {
        const res = await axiosClient.get("/category");
        return res.data;
    },
    update: async (id, data) => {
        const res = await axiosClient.put(`/category/${id}`, data);
        return res.data;
    },
    remove: async (id) => {
        const res = await axiosClient.delete(`/category/${id}`);
        return res.data;
    }
};
