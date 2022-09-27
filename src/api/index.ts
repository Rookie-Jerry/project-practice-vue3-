import axios, { AxiosRequestConfig } from "axios";
import toast from "../utils/toast";
import { getToken } from "./auth";

const http = axios.create({
  baseURL: "/api",
});

http.interceptors.request.use((config) => {
  console.log(config.data);
  return config;
});

// 添加请求拦截器
http.interceptors.request.use(
  (config:AxiosRequestConfig) => {
    // 往header头自动添加token
    const token = getToken()
    if(token && config.headers){//axios版本原因config.headers的对象可能未定义
      config.headers.token  = token
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {

    return response.data.data;
  },
  (error) => {//错误
    // 提示错误
    toast(error.response.data.msg,"error")
    return Promise.reject(error);
  }
);
export default http;
