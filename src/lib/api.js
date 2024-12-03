import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_LARAVEL_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export { api };