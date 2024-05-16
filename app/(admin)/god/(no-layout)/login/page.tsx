"use client";

import Flex from "@/components/Flex";
import { useLogin } from "@/hooks/requests/auth/use-login";
import { useGetCaptcha } from "@/hooks/requests/other/use-get-captcha";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Spacer,
} from "@nextui-org/react";
import Image from "next/image";

export default function Page() {
  // 获取验证码
  const getCaptchaReq = useGetCaptcha();

  // 登录请求
  const { loginParams, setLoginParams, req } = useLogin();

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card radius="sm">
        <CardBody className="p-4 w-96">
          <Input
            value={loginParams.email}
            onChange={(e) => setLoginParams({ email: e.target.value })}
            color="primary"
            variant="underlined"
            label="账号"
          />

          <Input
            value={loginParams.password}
            onChange={(e) => setLoginParams({ password: e.target.value })}
            type="password"
            color="primary"
            className="mt-2"
            variant="underlined"
            label="密码"
          />

          <Flex align="end">
            <Input
              value={loginParams.captchaCode}
              onChange={(e) => setLoginParams({ captchaCode: e.target.value })}
              color="primary"
              variant="underlined"
              label="验证码"
            />

            <div
              className="flex-shrink-0 ml-4"
              onClick={getCaptchaReq.run}
              dangerouslySetInnerHTML={{ __html: getCaptchaReq.data as any }}
            ></div>

            {/* <Image */}
            {/*   src={data || ""} */}
            {/*   alt="验证码" */}
            {/*   width={300} */}
            {/*   height={300} */}
            {/*   className="h-full" */}
            {/* /> */}
          </Flex>

          <Checkbox className="mt-4" size="sm">
            记住密码
          </Checkbox>

          <Button
            isLoading={req.loading}
            onClick={req.run}
            radius="sm"
            color="primary"
            type="button"
            className="mt-6"
          >
            登录
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
