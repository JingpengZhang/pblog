import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { useRequest } from "ahooks";

type Params = FormData;

type Data = {
  code: 200;
  message: string;
};

// 上传文件
export const useUploadFile = (options?: { onSuccess?: () => void }) => {
  // 请求
  const request = useRequest(
    async (params: Params) => {
      const data = await requestManager.post<Params, Data>(
        API_URLS.file.upload,
        params,
      );

      return data;
    },
    {
      manual: true,
      throttleWait: 1,
      debounceWait: 10,
      onSuccess: (data) => {
        if (data.code === 200) {
          if (options?.onSuccess) options.onSuccess();
        }
      },
    },
  );

  return { request };
};
