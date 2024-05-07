import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useMemoizedFn } from "ahooks";
import Icon, { IconSelectItem, getIconItems } from "../icon";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  value?: IconSelectItem;
  onChange?: (item: IconSelectItem) => void;
}

const IconSelector: React.FC<Props> = ({ children, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onIconClick = useMemoizedFn((item: IconSelectItem) => {
    setIsOpen(false);
    if (onChange) onChange(item);
  });

  return (
    <Popover
      radius="sm"
      placement="bottom-start"
      isOpen={isOpen}
      onOpenChange={(isOpen) => setIsOpen(isOpen)}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <ul className="grid grid-cols-5 my-1">
          {getIconItems().map((item) => (
            <li
              key={item.value}
              onClick={() => onIconClick(item)}
              className={[
                "w-10 hover:bg-zinc-800 cursor-pointer aspect-square flex items-center justify-center",
                value && value.value === item.value ? "bg-zinc-800" : "",
              ].join(" ")}
            >
              <Icon name={item.value} type={item.type} />
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default IconSelector;
