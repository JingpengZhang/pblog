import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from "@nextui-org/react";
import IconSelector from "../../common/icon-selector";
import React, { useState } from "react";
import { ModalProps } from "@/app/lib/interface";
import Icon, { IconSelectItem, getIconItems } from "../../common/icon";
import { useMemoizedFn } from "ahooks";

interface Props extends ModalProps {}

const AddCategoryModal: React.FC<Props> = (props) => {
  // 当前选择的图标
  const [selectedIcon, setSelectedIcon] = useState<IconSelectItem>(
    getIconItems()[0],
  );

  // 分类名
  const [name, setName] = useState("");

  // 提交
  const submit = useMemoizedFn(() => {
    console.log(selectedIcon.value, name);
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
              <div className="flex items-center">
                <IconSelector
                  value={selectedIcon}
                  onChange={(item) => setSelectedIcon(item)}
                >
                  <Button className="h-12 w-12" radius="sm">
                    <Icon name={selectedIcon.value} type={selectedIcon.type} />
                  </Button>
                </IconSelector>
                <Spacer />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="分类名"
                  size="sm"
                  radius="sm"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} radius="sm" size="sm" variant="flat">
                关闭
              </Button>
              <Button radius="sm" size="sm" color="primary" onPress={submit}>
                提交
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModal;
