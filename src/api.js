import axios from "axios";
import { TOKEN } from "./constant";

const apiUrl = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
