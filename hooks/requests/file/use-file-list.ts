import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { TFile } from "@/types/entity/file";
import { usePagination, useRequest, useSetState } from "ahooks";

type Params = {} & RequestModule.PageParams;

export const useFileList = () => {
  // 参数
  const [params, setParams] = useSetState<Params>({});

  // 请求
  const req = usePagination(
    async () => {
      const data = await requestManager.post<RequestModule.ListResponse<TFile>>(
        API_URLS.file.list,
        params,
      );

      return {
        list: data.data.list,
        total: data.data.total,
      };
    },
    {
      throttleWait: 10,
    },
  );

  return {
    params,
    setParams,
    req,
  };
};
