import { Button, ButtonProps } from "@nextui-org/react";
import React from "react";

export type PButtonProps = {
  mini?: boolean;
} & ButtonProps;

const PButton: React.FC<PButtonProps> = ({ mini, ...buttonProps }) => {
  return (
    <Button
      {...buttonProps}
      className={` ${mini ? "h-8 aspect-square min-w-[unset] p-0" : ""} ${buttonProps.className}`}
    >
      {buttonProps.children}
    </Button>
  );
};

export default PButton;
