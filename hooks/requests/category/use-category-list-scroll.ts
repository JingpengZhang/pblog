import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { Category } from "@/types/entity/category";
import { useInfiniteScroll } from "ahooks";
import { BasicTarget } from "ahooks/lib/utils/domTarget";

type TParams = {} & RequestModule.PageParams;

export const useCategoryListScroll = (options?: {
  pageSize?: number;
  target?: BasicTarget<Element>;
}) => {
  // 每页数量
  const PAGA_SIZE = options?.pageSize || 20;

  const requestResult = useInfiniteScroll<{
    list: Category[];
    total: number;
  }>(
    async (d) => {
      // 页码
      const page = d ? Math.ceil(d.list.length / PAGA_SIZE) + 1 : 1;

      const { data } = await requestManager.get<
        TParams,
        RequestModule.ListResponse<Category>
      >(API_URLS.category.list, {
        page,
        pageSize: PAGA_SIZE,
      });

      return {
        list: data.list,
        total: data.total,
      };
    },
    {
      target: options?.target,
      isNoMore: (d) => d?.list.length === d?.total,
    },
  );

  return { ...requestResult };
};
