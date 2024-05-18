import {
  useBoolean,
  useMemoizedFn,
  useSetState,
  useToggle,
  useUpdateEffect,
} from "ahooks";
import { useState } from "react";
import { useResetSetState } from "../use-reset-set-state";

type Mode = "create" | "update";

export type CUModalProps<T> = {
  visible: boolean;
  mode: Mode;
  hide: () => void;
  data: T | undefined;
  onSuccess: () => void;
};

export const useCUModal = <T extends object>(options?: {
  initialData?: T;
  onSuccess?: () => void;
}) => {
  // 模式
  const [mode, { set: setMode }] = useToggle<Mode>("create");

  // 显示/隐藏
  const [visible, { setTrue: show, setFalse: hide }] = useBoolean(false);

  // 数据
  const [data, setData] = useState(options?.initialData);

  // 通过创建模式打开
  const create = useMemoizedFn(() => {
    setData(undefined);
    setMode("create");
    show();
  });

  // 通过编辑模式打开
  const update = useMemoizedFn((data: T) => {
    setData(data);
    setMode("update");
    show();
  });

  // 请求成功回调
  const onSuccess = useMemoizedFn(() => {
    if (options?.onSuccess) options.onSuccess();
  });

  return {
    mode,
    setMode,
    visible,
    show,
    hide,
    data,
    create,
    update,
    onSuccess,
  };
};

// 用于监听 CU 弹窗 data 改变，如果是编辑模式，将参数设置为传入的data ，否则，将参数重置为默认值
export const useHandleCUDataEffect = <T extends object>(
  cuModalProps: CUModalProps<T>,
  useParamsReturn: ReturnType<typeof useResetSetState>,
) => {
  // 监听数据改变
  useUpdateEffect(() => {
    if (cuModalProps.data && cuModalProps.mode === "update") {
      useParamsReturn[1](cuModalProps.data);
    } else {
      useParamsReturn[2]();
    }
  }, [cuModalProps.data]);
};
