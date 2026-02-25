import axios from "axios";
import { server } from "../config/server.js";

const api = axios.create({
  baseURL: server,
});

// ✅ attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;