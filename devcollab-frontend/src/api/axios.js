import axios from "axios";

const api = axios.create({
  baseURL: "https://devcollab-em1r.onrender.com/api",
});

// Automatically attach token from localStorage on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
