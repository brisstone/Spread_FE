import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const axiosHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosHttp.interceptors.request.use(function (config) {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
  } as InternalAxiosRequestConfig<any>;
});

export default axiosHttp;
