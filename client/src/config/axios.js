import axios from "axios";

import { getCookie, removeCookie } from "../helpers/cookie";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  //const token = localStorage.getItem("token");

  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response.data);
    return response.data;
  },
  (error) => {
    console.log(error.response.data);

    if (
      error.response.data.message &&
      (error.response.data.message.toLowerCase().includes("unauthenticated") ||
        error.response.data.message.toLowerCase().includes("unauthorized"))
    ) {
      removeCookie("token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error.response.data);
  }
);

export { axiosInstance };
