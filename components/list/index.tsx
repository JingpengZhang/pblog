import React from "react";

type Props<T> = {
  className?: string;
  data: T[]; // 数据源
  itemRender: (item: T, index: number) => React.ReactNode; // 列表项渲染
  empty?: React.ReactNode | string;
};

const List = <T extends object>({
  className,
  data,
  itemRender,
  empty,
}: Props<T>) => {
  return (
    <>
      {data.length !== 0 ? (
        <div className={`${className}`}>
          {data.map((item, index) => (
            <>{itemRender(item, index)}</>
          ))}
        </div>
      ) : (
        <p className="text-center w-full text-xs text-zinc-700 mt-8">
          {empty || "无数据"}
        </p>
      )}
    </>
  );
};

export default List;
