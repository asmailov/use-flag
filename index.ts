import { useState as useReactState } from "react";

type UseState = typeof useReactState;

const createUseFlag = (useState: UseState) =>
  function useFlag<Name extends string>(name: Name, initial: boolean) {
    const [flag, setFlag] = useState<boolean>(initial);

    const toggle = () => setFlag((value) => !value);
    const on = () => setFlag(true);
    const off = () => setFlag(false);

    const controls = {
      toggle,
      on,
      off,
    };

    const state: State = {
      [name]: flag,
    } as any;

    return { ...controls, ...state };

    type State = {
      [name in Name]: boolean;
    };
  };

export const useFlag = createUseFlag(useReactState);
