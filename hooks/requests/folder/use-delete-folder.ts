import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { Folder } from "@/types/entity/folder";
import { useRequest, useSetState } from "ahooks";

type Params = {
  data: Folder["id"] | Folder["id"][];
};

type Data = RequestModule.DeleteData;

// 删除文件夹
export const useDeleteFolder = (options?: { onSuccess?: () => void }) => {
  // 请求
  const request = useRequest(
    async (params: Params) => {
      const data = await requestManager.post<Params, Data>(
        API_URLS.folder.delete,
        params,
      );

      return data;
    },
    {
      manual: true,
      debounceWait: 10,
      throttleWait: 10,
      onSuccess: (data) => {
        if (data.code === 200) {
          if (options?.onSuccess) options.onSuccess();
        }
      },
    },
  );

  return request;
};
