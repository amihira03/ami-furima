import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// リクエスト前にトークンを自動でつける
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
