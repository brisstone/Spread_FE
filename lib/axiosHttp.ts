import axios, { InternalAxiosRequestConfig } from "axios";
import { getCookieContext } from ".";
import { StorageEnum } from "@/types/enum";
console.log('apiurl', process.env.NEXT_PUBLIC_API_URL)
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
      Authorization: `Bearer ${getCookieContext()}`,
    },
  } as InternalAxiosRequestConfig<any>;
});

export default axiosHttp;
