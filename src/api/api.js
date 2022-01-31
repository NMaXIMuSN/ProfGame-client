import axios from "axios";
const URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: URL,
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const respons = await api.get("/refresh", { withCredentials: true });
        localStorage.setItem("token", respons.data.accessToken);
        return api.request(originalRequest)
      } catch (error) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
  }
);

export default api;
