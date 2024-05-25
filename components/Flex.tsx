import { Property } from "csstype";
import React, { CSSProperties } from "react";

export interface FlexProps {
  className?: string;
  style?: CSSProperties;
  align?: Property.AlignItems;
  justify?: Property.JustifyContent;
  children?: React.ReactNode;
  vertical?: boolean;
  gap?: number;
  onClick?: () => void;
  key?: string | number;
}

const Flex: React.FC<FlexProps> = ({
  className,
  style,
  align,
  justify,
  children,
  vertical = false,
  gap = 0,
  onClick,
  key,
}) => {
  return (
    <div
      key={key}
      onClick={() => {
        if (onClick) onClick();
      }}
      className={`flex ${vertical ? "flex-col" : ""} ${className}`}
      style={{
        ...style,
        alignItems: align,
        justifyContent: justify,
        gap: gap,
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
