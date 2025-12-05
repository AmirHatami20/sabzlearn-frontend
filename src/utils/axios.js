import axios from "axios";

export const API_URL = "http://localhost:3000";

const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
});

export default axiosClient;
