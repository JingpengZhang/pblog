import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { Category } from "@/types/entity/category";
import { useRequest } from "ahooks";

type Params = {
  data: Category["id"] | Category["id"][];
};

export const useDeleteCategory = (options?: { onSuccess?: () => void }) => {
  const req = useRequest(
    async (params: Params) => {
      const data = requestManager.post(API_URLS.category.delete, params);

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

  return {
    ...req,
  };
};
