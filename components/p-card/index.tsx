import { Card, CardProps } from "@nextui-org/react";
import React from "react";

type Props = {
  itemStyle?: boolean;
} & CardProps;

const PCard: React.FC<Props> = ({ itemStyle, ...cardProps }) => {
  return (
    <Card
      isPressable={itemStyle}
      {...cardProps}
      className={`${itemStyle ? " rounded shadow-none hover:bg-zinc-700" : ""} ${cardProps.className}`}
    ></Card>
  );
};

export default PCard;
