import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Spacer,
} from "@nextui-org/react";

export default function Page() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card radius="sm">
        <CardBody className="p-4 w-96">
          <Input variant="underlined" label="账号" />

          <Input className="mt-2" variant="underlined" label="密码" />

          <Checkbox className="mt-4" size="sm">
            记住密码
          </Checkbox>

          <Button radius="sm" color="primary" type="button" className="mt-6">
            登录
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
