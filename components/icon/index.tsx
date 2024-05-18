import React from "react";
import { SolidIconName, SolidIcons } from "./src/solid";
import { IconEntity } from "@/types/entity";
import { OutlineIconName, OutlineIcons } from "./src/outline";
import { MiniIconName, MiniIcons } from "./src/mini";
import { useCreation } from "ahooks";

export type IconType = "solid" | "outline" | "mini" | "micro";

export type IconName = SolidIconName | OutlineIconName | MiniIconName;

export interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const icons = {
  ...SolidIcons,
  ...OutlineIcons,
  ...MiniIcons,
};

export const getIconItems = (): IconEntity[] => {
  const _items: IconEntity[] = [];
  for (let name in icons) {
    _items.push({
      name: name as IconName,
      color: "currentColor",
      size: 16,
      strokeWidth: 1.5,
    });
  }
  return _items;
};

const Icon: React.FC<IconProps> = ({
  name,
  color = "currentColor",
  size = 16,
  strokeWidth = 1.5,
  className,
}) => {
  const viewSize = useCreation(() => {
    if (name.endsWith("Micro")) {
      return 16;
    } else if (name.endsWith("Mini")) {
      return 20;
    } else {
      return 24;
    }
  }, [name]);
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      strokeWidth={strokeWidth}
      style={{
        height: size,
        width: size,
        color,
      }}
    >
      {icons[name]}
    </svg>
  );
};

export default Icon;
