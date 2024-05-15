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
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlcyI6WzIsMF0sImlhdCI6MTcxNTc4MDMwNiwiZXhwIjoxNzE1ODE2MzA2fQ.IirTe4gxdCwN_fvmD8McxnOhFqw5pCZm8OTFG7LK5JM`;

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
      // toast.success(message);
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
  get: <P extends object | undefined, T>(
    url: string,
    params?: P,
  ): Promise<T> => {
    let queryStr = "";

    // 检查 params 是否存在并且是一个对象
    if (params && typeof params === "object") {
      // 遍历 params 对象的键值对，构建查询字符串
      const queryParams = new URLSearchParams();
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          // @ts-ignore
          queryParams.append(key, String(params[key]));
        }
      }
      queryStr = `?${queryParams.toString()}`;
    }

    return axiosInstance.get(url + queryStr);
  },
};

export default axiosInstance;
