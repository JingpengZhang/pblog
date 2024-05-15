import { useSetState } from "ahooks";

export const useResetSetState = <T extends object>(params: T) => {
  const defaultState: T = params;

  const [state, setState] = useSetState<T>(params);

  return {
    state,
    setState,
    reset: () => setState(defaultState),
  };
};
