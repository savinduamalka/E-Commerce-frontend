import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_LARAVEL_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); // Get saved token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add the Bearer token to headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { api };
