import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { Category } from "@/types/entity/category";
import { useInfiniteScroll } from "ahooks";

type TParams = {} & RequestModule.PageParams;

export const useCategoryListScroll = (options?: { pageSize?: number }) => {
  // 每页数量
  const PAGA_SIZE = options?.pageSize || 20;

  const requestResult = useInfiniteScroll<{
    list: Category[];
    total: number;
  }>(async (d) => {
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
  });

  return { ...requestResult };
};
