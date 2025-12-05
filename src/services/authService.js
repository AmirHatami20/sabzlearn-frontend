import axiosClient from "../utils/axios.js";

export const authService = {
    register: async (formData) => {
        const res = await axiosClient.post("/auth/register", formData);
        return res.data;
    },

    login: async (formData) => {
        const res = await axiosClient.post("/auth/login", formData);
        return res.data;
    },

    verifyOtp: async (data) => {
        const res = await axiosClient.post("/auth/verify", data);
        return res.data;
    },

    getMe: async () => {
        const res = await axiosClient.get("/auth/me");
        return res.data;
    },

    logout: async () => {
        const res = await axiosClient.post("/auth/logout");
        return res.data;
    }
};
