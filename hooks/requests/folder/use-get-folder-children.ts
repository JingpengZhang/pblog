import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { TFile } from "@/types/entity/file";
import { Folder } from "@/types/entity/folder";
import { useRequest, useSetState } from "ahooks";

type Params = {
  id: Folder["id"];
};

type Data = RequestModule.Response<{
  files: TFile[];
  folders: Folder[];
  parentFolderId: Folder["id"];
}>;

export const useGetFolderChildren = () => {
  // 参数
  const [params, setParams] = useSetState<Params>({ id: 0 });

  const req = useRequest(
    async () => {
      const data = await requestManager.get<Params, Data>(
        API_URLS.folder.children,
        params,
      );
      return data.data;
    },
    {
      throttleWait: 10,
      refreshDeps: [params.id],
    },
  );

  return {
    params,
    setParams,
    req,
  };
};
