import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useMemoizedFn } from "ahooks";
import React, { useState } from "react";
import Flex from "./Flex";
import ColorPicker from "./ColorPicker";
import { IconEntity } from "@/types/entity";
import Icon, { getIconItems } from "./icon";

interface Props {
  children: React.ReactNode;
  value: IconEntity;
  onChange?: (item: IconEntity) => void;
}

const IconSelector: React.FC<Props> = ({ children, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      radius="sm"
      placement="bottom-start"
      isOpen={isOpen}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <ul className="grid grid-cols-5 my-1 w-full">
          {getIconItems().map((item) => (
            <li
              key={item.name}
              onClick={() => {
                if (onChange) onChange({ ...value, name: item.name });
              }}
              title={item.name}
              className={[
                "w-10 hover:bg-zinc-800 cursor-pointer aspect-square flex items-center justify-center",
                value && value.name === item.name ? "bg-zinc-800" : "",
              ].join(" ")}
            >
              <Icon name={item.name} />
            </li>
          ))}
        </ul>
        <Flex className="w-full mt-4" align="center" justify="space-between">
          <ColorPicker.SketchPicker
            color={value.color}
            onChange={(color) => {
              if (onChange) onChange({ ...value, color: color.hex });
            }}
            className="mr-4"
            targetClassName="rounded-full"
            targetHeight={28}
            targetWidth={28}
          />
          <Input
            fullWidth={false}
            label="尺寸"
            type="number"
            className="flex-grow"
            size="sm"
            labelPlacement="outside-left"
            value={value.size.toString()}
            onChange={(e) => {
              if (onChange)
                onChange({
                  ...value,
                  size: parseFloat(e.target.value),
                });
            }}
          />
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default IconSelector;
