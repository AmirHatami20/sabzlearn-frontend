import axiosClient from "../utils/axios.js";

export const offService = {
    create: async (data) => {
        const res = await axiosClient.post("/off", data);
        return res.data;
    },

    getAll: async () => {
        const res = await axiosClient.get("/off");
        return res.data;
    },

    getOne: async (id) => {
        const res = await axiosClient.get(`/off/${id}`);
        return res.data;
    },

    delete: async (id) => {
        const res = await axiosClient.delete(`/off/${id}`);
        return res.data;
    },

    useCode: async (courseId, code) => {
        const res = await axiosClient.post(`/off/use/${courseId}`, {code});
        return res.data;
    },

    setOnAll: async (discount) => {
        const res = await axiosClient.post(`/off/set-on-all`, {discount});
        return res.data;
    },
};
