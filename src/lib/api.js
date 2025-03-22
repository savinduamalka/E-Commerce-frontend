import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_LARAVEL_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token"); // Get JWT from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken; // Attach CSRF token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
