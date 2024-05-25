import React from "react";

type Props<T> = {
  className?: string;
  data: T[]; // 数据源
  itemRender: (item: T, index: number) => React.ReactNode; // 列表项渲染
};

const List = <T extends object>({ className, data, itemRender }: Props<T>) => {
  return (
    <>
      <div className={`${className}`}>
        {data.map((item, index) => (
          <>{itemRender(item, index)}</>
        ))}
      </div>
    </>
  );
};

export default List;
