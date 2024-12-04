import axios from "axios";
import Cookies from "js-cookie";
// import { message } from 'antd';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

// Request interceptor for API calls
// Request interceptor for API calls
api.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("metacog_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response) {
      // message.error(JSON.stringify(error.response.data));
      // const originalRequest = error.config;
      if (error.response.status === 401) {
        // sessionStorage.clear();
        // localStorage.clear();
        Cookies.remove("metacog_token");
        window.location.reload();
      }
      // if (error.response.status === 403 && !originalRequest._retry) {
      //   sessionStorage.clear();
      //   window.location.reload();
      //   //   originalRequest._retry = true;
      //   //   const metacog_token = await refreshAccessToken();
      //   //   axios.defaults.headers.common.Authorization = `Bearer ${metacog_token}`;
      //   //   return api(originalRequest);
      // }
    } // else message.error(JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default api;
