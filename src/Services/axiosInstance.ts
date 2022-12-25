import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (config && config.headers && !config.headers.token && token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
