import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-instance";
import { useRequest, useSetState } from "ahooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Params = {
  email: string;
  password: string;
  captchaCode: string;
};

type Data = RequestModule.Response<{
  token: string;
}>;

export const useLogin = () => {
  const router = useRouter();

  const [params, setParams] = useSetState<Params>({
    email: "",
    password: "",
    captchaCode: "",
  });

  const requestResult = useRequest(
    async () => {
      const data = await requestManager.post<Data>(API_URLS.auth.login, params);

      return data.data;
    },
    {
      manual: true,
      debounceWait: 10,
      onSuccess(data) {
        toast.success("登录成功");
        localStorage.setItem("token", data.token);
        router.push("/god/categories");
      },
      onError(e) {
        console.log(e);
      },
    },
  );

  return {
    loginParams: params,
    setLoginParams: setParams,
    req: requestResult,
  };
};
