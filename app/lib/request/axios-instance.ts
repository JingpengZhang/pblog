import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // token
    config.headers.Token = "8e293548ea42e36ecb396f76034303ba";

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 相应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
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
