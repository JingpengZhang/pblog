import { useBoolean, useMemoizedFn } from "ahooks";

export type VisibleControllerProps = {
  visible: boolean;
  hide: () => void;
};

export const useVisibleController = () => {
  const [visible, setVisible] = useBoolean(false);

  const show = useMemoizedFn(() => {
    setVisible.setTrue();
  });

  const hide = useMemoizedFn(() => {
    setVisible.setFalse();
  });

  return {
    visible,
    setVisible,
    show,
    hide,
  };
};
