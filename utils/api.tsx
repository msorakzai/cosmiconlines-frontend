// File: utils/api.tsx
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ Create Axios instance
const API = axios.create({
  baseURL: 'http://localhost:3001', // Your backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ✅ Request interceptor to add JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong!';
    console.error('API Error:', message);

    // Optional: show toast for API errors
    toast.error(`❌ ${message}`);

    return Promise.reject(error);
  }
);

export default API;
