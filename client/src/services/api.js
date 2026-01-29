import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getProfile: () => api.get('/auth/profile'),
};

// Course API
export const courseAPI = {
    getAll: () => api.get('/courses'),
    getById: (id) => api.get(`/courses/${id}`),
    getPremium: () => api.get('/courses/premium'),
    getFree: () => api.get('/courses/free'),
};

// Payment API
export const paymentAPI = {
    getConfig: () => api.get('/payments/config'),
    createPaymentIntent: (data) => api.post('/payments/create-payment-intent', data),
    confirmPayment: (data) => api.post('/payments/confirm', data),
    getHistory: () => api.get('/payments/history'),
};

export default api;
