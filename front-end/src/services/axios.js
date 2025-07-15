// src/api/axios.js
import axios from 'axios';

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URI); // ✅ move this OUTSIDE

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URI,
  withCredentials: true, // for cookie/token support
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
