import { Category } from "@/types/entity/category";
import { Params as CreateParams } from "./use-create-category";
import { useRequest } from "ahooks";
import { requestManager } from "@/request/axios-instance";
import API_URLS from "@/request/api-urls";

type Params = CreateParams & {
  id: Category["id"];
};

export const useUpdateCategory = (
  id?: Category["id"],
  params?: CreateParams,
  options?: {
    onSuccess?: () => void;
  },
) => {
  // 请求
  const req = useRequest(
    async () => {
      const data = requestManager.post<Params>(API_URLS.category.update, {
        id,
        name: params?.name,
        icon: params?.icon,
        alias: params?.alias,
        description: params?.description,
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
