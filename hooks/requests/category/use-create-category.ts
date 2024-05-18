import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { TBaseResponse } from "@/request/types";
import { IconEntity } from "@/types/entity";
import { Category } from "@/types/entity/category";
import { useRequest, useSetState } from "ahooks";
import { Options } from "ahooks/lib/useRequest/src/types";

export interface Params extends TIconProperties {
  name: string;
  alias?: string;
  description?: string;
  icon: IconEntity;
}

type TCreateCategoryData = {
  id: Category["id"];
};

export const useCreateCategory = (options?: {
  params?: Params;
  options?: Options<TCreateCategoryData, any[]>;
}) => {
  // 参数
  const [params, setParams] = useSetState<Params>({
    name: "",
    icon: {
      name: "TagOutline",
      size: 0,
      color: "",
      strokeWidth: 0,
    },
  });

  const req = useRequest(
    async () => {
      const { data } = await requestManager.post<
        TBaseResponse<{
          id: number;
        }>
      >(API_URLS.category.create, options?.params || params);
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
    params,
    setParams,
    req,
  };
};
