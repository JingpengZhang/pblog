import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { useMemoizedFn } from "ahooks";
import Flex from "@/components/Flex";
import IconSelector from "@/components/IconSelector";
import Icon from "@/components/icon";
import {
  Params as CreateParams,
  useCreateCategory,
} from "@/hooks/requests/category/use-create-category";
import {
  CUModalProps,
  useHandleCUDataEffect,
} from "@/hooks/component/use-cu-modal";
import { Category } from "@/types/entity/category";
import { useUpdateCategory } from "@/hooks/requests/category/use-update-category";
import { toast } from "react-toastify";
import { useResetSetState } from "@/hooks/use-reset-set-state";

interface Props extends CUModalProps<Category> {}

const CategoryCUModal: React.FC<Props> = (props) => {
  // 参数
  const [params, setParams, resetParams] = useResetSetState<CreateParams>({
    name: "",
    icon: {
      name: "TagOutline",
      size: 24,
      color: "white",
      strokeWidth: 1.5,
    },
  });

  useHandleCUDataEffect(props, [params, setParams, resetParams]);

  // 创建分类请求
  const createReq = useCreateCategory({
    params,
    options: {
      onSuccess() {
        props.hide();
        if (props.onSuccess) props.onSuccess();
      },
    },
  });

  // 修改分类请求
  const updateReq = useUpdateCategory(props.data?.id, params, {
    onSuccess: () => {
      toast.success("修改成功");
      props.hide();
      if (props.onSuccess) props.onSuccess();
    },
  });

  // 提交
  const submit = useMemoizedFn(() => {
    if (props.mode === "create") createReq.req.run();

    if (props.mode === "update") updateReq.run();
  });

  return (
    <Modal
      size="sm"
      radius="sm"
      isOpen={props.visible}
      onOpenChange={props.hide}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>添加分类</ModalHeader>
            <ModalBody>
              <Flex align="center">
                <IconSelector
                  value={params.icon}
                  onChange={(item) => setParams({ icon: item })}
                >
                  <Button className="h-12 w-12" radius="sm">
                    <Icon {...params.icon} />
                  </Button>
                </IconSelector>
                <Spacer />
                <Input
                  isRequired
                  value={params.name}
                  onChange={(e) => setParams({ name: e.target.value })}
                  label="分类名"
                  size="sm"
                  radius="sm"
                />
              </Flex>
              <Flex>
                <Input
                  value={params.alias}
                  onChange={(e) =>
                    setParams({
                      alias: e.target.value,
                    })
                  }
                  label="别名"
                  radius="sm"
                  placeholder="请输入别名"
                />
              </Flex>

              <Flex>
                <Textarea
                  value={params.description}
                  onChange={(e) => setParams({ description: e.target.value })}
                  label="描述"
                  radius="sm"
                  placeholder="请输入描述"
                />
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} radius="sm" size="sm" variant="flat">
                关闭
              </Button>
              <Button
                isLoading={createReq.req.loading}
                radius="sm"
                size="sm"
                color="primary"
                onPress={submit}
              >
                提交
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CategoryCUModal;
