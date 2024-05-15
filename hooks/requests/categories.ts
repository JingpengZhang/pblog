import { Category } from "@/app/lib/definitions";
import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { TBaseResponse } from "@/request/types";
import { useRequest } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";

export interface ICreateCategoryParams extends TIconProperties {
  name: string;
  alias?: string;
  description?: string;
}

type TCreateCategoryData = {
  id: Category["id"];
};

export const useCreateCategory = (options?: {
  params?: ICreateCategoryParams;
  options?: Options<TCreateCategoryData, any[]>;
}) => {
  const request = useRequest(
    async (_params?: ICreateCategoryParams) => {
      const { data } = await requestManager.post<
        TBaseResponse<{
          id: number;
        }>
      >(API_URLS.category.create, options?.params || _params);
      return {
        id: data.id,
      };
    },
    {
      manual: true,
      ...options?.options,
    },
  );

  return {
    ...request,
  };
};
