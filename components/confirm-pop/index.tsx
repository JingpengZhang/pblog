import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React from "react";
import Icon from "../icon";
import Flex from "../Flex";
import { useBoolean, useMemoizedFn } from "ahooks";

type Props = {
  children?: React.ReactNode;
  content?: string;
  onConfirm?: () => void;
  loading?: boolean;
};

const ConfirmPop: React.FC<Props> = ({
  children,
  content,
  onConfirm,
  loading,
}) => {
  const [show, setShow] = useBoolean(false);

  const handleCancle = useMemoizedFn(() => {
    setShow.setFalse();
  });

  const handleConfirm = useMemoizedFn(() => {
    if (onConfirm) onConfirm();

    // setShow.setFalse();
  });

  return (
    <Popover isOpen={show} onOpenChange={(open) => setShow.set(open)}>
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent>
        <Flex align="center" justify="start" className="h-12 px-1 w-full">
          <Icon
            className="mr-1.5"
            name="ExclamationCircleMini"
            color="#f5a524"
            size={20}
          />
          <span>{content || "确认继续？"}</span>
        </Flex>
        <Flex gap={10} justify="end" className="mb-2 w-full">
          <Button
            onClick={handleCancle}
            size="sm"
            className="h-7"
            variant="light"
          >
            取消
          </Button>
          <Button
            isLoading={loading}
            onClick={handleConfirm}
            size="sm"
            color="primary"
            variant="flat"
            className="h-7"
          >
            确认
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default ConfirmPop;
