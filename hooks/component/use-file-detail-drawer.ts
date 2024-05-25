import { useState } from "react";
import { useVisibleController } from "./use-visible-controller";
import { TFile } from "@/types/entity/file";
import { useMemoizedFn } from "ahooks";

export const useFileDetailDrawer = (defaultData?: TFile) => {
  // 控制器
  const { visible, hide, show: showCtr } = useVisibleController();

  // 文件数据
  const [data, setData] = useState<TFile | undefined>(defaultData);

  // 预览指定数据
  const show = useMemoizedFn((data: TFile) => {
    setData(data);
    showCtr();
  });

  return {
    visible,
    hide,
    show,
    data,
  };
};
