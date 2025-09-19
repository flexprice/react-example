import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.cloud.flexprice.io/v1';

const axiosClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    async (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('auth_token');
                    // Redirect to login or show message
                    window.location.href = '/login';
                    break;
                case 403:
                    // Handle forbidden access
                    break;
                case 404:
                    // Handle not found
                    break;
                case 500:
                    // Handle server error
                    break;
                default:
                    // Handle other errors
                    break;
            }
            // Ensure we reject with the error response data if available
            const errorData = error.response.data;
            return Promise.reject(errorData || error);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
            return Promise.reject(new Error('No response received from server'));
        } else {
            // Error in setting up the request
            console.error('Error:', error.message);
            return Promise.reject(error);
        }
    },
);

export default axiosClient;
