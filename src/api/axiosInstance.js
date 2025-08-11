import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json'
  }
});

// === Interceptor untuk token ===
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('dcdRdxNkt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);