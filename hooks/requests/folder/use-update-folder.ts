import { useRequest } from "ahooks";
import { Params as CreateParams } from "./use-create-folder";
import { requestManager } from "@/request/axios-instance";
import API_URLS from "@/request/api-urls";
import { Folder } from "@/types/entity/folder";

type Params = {} & CreateParams;

type Data = RequestModule.SimpleResponse;
export const useUpdateFolder = (
  id: Folder["id"],
  params: Params,
  options?: {
    onSuccess?: () => void;
  },
) => {
  // 请求
  const req = useRequest(
    async () => {
      const data = await requestManager.post<Data>(API_URLS.folder.update, {
        id,
        ...params,
      });

      return data;
    },
    {
      manual: true,
      throttleWait: 10,
      onSuccess: () => {
        if (options?.onSuccess) options.onSuccess();
      },
    },
  );

  return req;
};
