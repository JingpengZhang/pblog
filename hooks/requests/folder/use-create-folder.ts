import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { Folder } from "@/types/entity/folder";
import { useRequest } from "ahooks";

export type Params = {
  name?: string;
  description?: string;
};

type Data = RequestModule.Response<{
  id: Folder["id"];
}>;

export const useCreateFolder = (
  parent: Folder["id"],
  params: Params,
  options?: {
    onSuccess?: () => void;
  },
) => {
  // 请求
  const req = useRequest(
    async () => {
      const data = await requestManager.post<Data>(API_URLS.folder.create, {
        parent,
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
