import { useMemoizedFn, useSetState } from "ahooks";

export const useResetSetState = <T extends object>(params: T) => {
  // 默认参数
  const defaultState: T = params;

  // 参数
  const [state, setState] = useSetState<T>(params);

  // 重置参数
  const reset = useMemoizedFn(() => {
    setState(defaultState);
  });

  return [state, setState, reset] as const;
};
