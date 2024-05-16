import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { useRequest } from "ahooks";

type Params = undefined;

type Data = RequestModule.Response<{
  captcha: string;
}>;

export const useGetCaptcha = () => {
  const requestResult = useRequest(async () => {
    const data = await requestManager.get<Params, Data>(API_URLS.other.captcha);

    return data.data.captcha;
  });

  return {
    ...requestResult,
  };
};
