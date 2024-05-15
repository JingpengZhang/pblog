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
import React, { useState } from "react";
import { ModalProps } from "@/app/lib/interface";
import { useMemoizedFn, useSetState } from "ahooks";
import Flex from "@/components/Flex";
import { useResetSetState } from "@/hooks/use-reset-set-state";
import IconSelector from "@/components/IconSelector";
import { IconEntity } from "@/types/entity";
import Icon, { getIconItems } from "@/components/icon";
import {
  ICreateCategoryParams,
  useCreateCategory,
} from "@/hooks/requests/category/use-create-category";

interface Props extends ModalProps {
  onSuccess?: () => void;
}

const CreateCategoryModal: React.FC<Props> = (props) => {
  // 当前选择的图标
  const [selectedIcon, setSelectedIcon] = useState<IconEntity>(
    getIconItems()[0],
  );

  const createParams = useResetSetState<ICreateCategoryParams>({
    name: "",
    alias: undefined,
    description: undefined,
  });

  const createCategory = useCreateCategory({
    params: {
      ...createParams.state,
      icon: selectedIcon,
    },
    options: {
      onSuccess() {
        props.onClose();
        createParams.reset();
        if (props.onSuccess) props.onSuccess();
      },
    },
  });

  // 提交
  const submit = useMemoizedFn(() => {
    createCategory.run();
  });

  return (
    <Modal
      size="sm"
      radius="sm"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>添加分类</ModalHeader>
            <ModalBody>
              <Flex align="center">
                <IconSelector
                  value={selectedIcon}
                  onChange={(item) => setSelectedIcon(item)}
                >
                  <Button className="h-12 w-12" radius="sm">
                    <Icon {...selectedIcon} />
                  </Button>
                </IconSelector>
                <Spacer />
                <Input
                  isRequired
                  value={createParams.state.name}
                  onChange={(e) =>
                    createParams.setState({ name: e.target.value })
                  }
                  label="分类名"
                  size="sm"
                  radius="sm"
                />
              </Flex>
              <Flex>
                <Input
                  value={createParams.state.alias}
                  onChange={(e) =>
                    createParams.setState({
                      alias: e.target.value,
                    })
                  }
                  label="别名"
                  radius="sm"
                  placeholder="请输入别名"
                />
              </Flex>

              <Flex>
                <Textarea label="描述" radius="sm" placeholder="请输入描述" />
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} radius="sm" size="sm" variant="flat">
                关闭
              </Button>
              <Button
                isLoading={createCategory.loading}
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

export default CreateCategoryModal;
