import axios from "../axios";

export const register = (payload) => axios.post("/auth/register", payload);

export const login = (payload) => axios.post("/auth/login", payload);

export const logout = () => axios.get("/auth/logout");

export const getCurrentUser = () => axios.get("/auth/me");

export const refreshToken = (refreshToken) => {
    // Nếu có refreshToken, gửi trong body, nếu không để server lấy từ cookie
    if (refreshToken) {
        return axios.post("/auth/refresh-token", { refreshToken });
    }
    return axios.post("/auth/refresh-token");
};
