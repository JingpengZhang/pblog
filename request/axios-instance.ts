import axios from "axios";
import { TResponseCode } from "./types";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // token
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlcyI6WzIsMF0sImlhdCI6MTcxNTY5Mzk0NywiZXhwIjoxNzE1NzI5OTQ3fQ.E3B6PDkohmywGIjJBwLuzsMsaWsoNB6ROjZtqWJubFc`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    const code = response.data.code as TResponseCode;
    const message = response.data.message;

    if (code === 200) {
      toast.success(message);
    }

    return response.data;
  },
  (err) => {
    const { code, error, message } = err.response.data;

    if (code === 400) {
      toast.error(message);
    }

    return Promise.reject(err);
  },
);

/**
 * 请求管理
 */
export const requestManager = {
  /**
   * post
   * @param url 请求地址
   * @param params 参数对象
   * @param toFormData 是否转换为 FormData 对象，如果为 true，将循环 params 并构造 FormData 对象
   */
  post: <T>(
    url: string,
    params: any,
    toFormData: boolean = false,
  ): Promise<T> => {
    let data: object | FormData = params;
    if (toFormData && params instanceof Object) {
      data = new FormData();
      Object.keys(params).forEach((k) => {
        if (data instanceof FormData) data.append(k, params[k]);
      });
    }
    return axiosInstance.post(url, data);
  },
};

export default axiosInstance;
