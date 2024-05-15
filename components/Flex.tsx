import { Property } from "csstype";
import React, { CSSProperties } from "react";

export interface FlexProps {
  className?: string;
  style?: CSSProperties;
  align?: Property.AlignItems;
  justify?: Property.JustifyContent;
  direction?: Property.FlexDirection;
  children?: React.ReactNode;
}

const Flex: React.FC<FlexProps> = ({
  className,
  style,
  align,
  justify,
  direction,
  children,
}) => {
  return (
    <div
      className={`flex ${className}`}
      style={{
        ...style,
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
