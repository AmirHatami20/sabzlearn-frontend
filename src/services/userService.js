import axiosClient from "../utils/axios.js";

export const userService = {
    getAll: async () => {
        const res = await axiosClient.get("/user");
        return res.data;
    },

    delete: async (id) => {
        const res = await axiosClient.delete(`/user/${id}`);
        return res.data;
    },

    ban: async (id) => {
        const res = await axiosClient.post(`/user/ban/${id}`);
        return res.data;
    },

    unban: async (id) => {
        const res = await axiosClient.post(`/user/unban/${id}`);
        return res.data;
    },

    getUserCourses: async () => {
        const res = await axiosClient.get("/user/courses");
        return res.data;
    },

    getUserBasket: async () => {
        const res = await axiosClient.get("/user/basket");
        return res.data;
    },

    updateUser: async (data) => {
        const res = await axiosClient.put("/user", data);
        return res.data;
    },

    changeRole: async (id) => {
        const res = await axiosClient.patch(`/user/role/${id}`);
        return res.data;
    }
};
