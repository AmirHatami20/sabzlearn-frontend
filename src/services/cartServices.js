import axiosClient from "../utils/axios.js";

export const cartServices = {
    getUserCart: async () => {
        const res = await axiosClient.get("/cart");
        return res.data;
    },

    addToCart: async (courseId) => {
        const res = await axiosClient.post("/cart/add", { courseId });
        return res.data;
    },

    removeFromCart: async (courseId) => {
        const res = await axiosClient.delete(`/cart/remove/${courseId}`);
        return res.data;
    },

};
