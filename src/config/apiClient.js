import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_ADDRESS,
  timeout: 2000,
});

export default apiClient;
