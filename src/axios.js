// axios
import axios from 'axios';

// Define the base URL for the API, you can change if you want
const baseURL = 'https://todo-api-18-140-52-65.rakamin.com';

const axiosInstance = axios.create({
    baseURL,
});

// Add an interceptor to attach the Authorization header with the token to each request
axiosInstance.interceptors.request.use(
  (config) => {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

export default axiosInstance;
