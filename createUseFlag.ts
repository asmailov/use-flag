import { useState as useReactState } from "react";

type UseState = typeof useReactState;

export const createUseFlag = (useState: UseState) => {
  function useFlag(initial?: boolean): [boolean, Controls];
  function useFlag<Name extends string>(name: Name, initial?: boolean): State<Name> & Controls;
  function useFlag<Name extends string>(nameOrInitial?: boolean | Name, initialOrNone?: boolean): any {
    const initial = typeof nameOrInitial === 'boolean' ? nameOrInitial : (initialOrNone || false);
    const [flag, setFlag] = useState<boolean>(initial);

    const toggle = () => setFlag((value) => !value);
    const on = () => setFlag(true);
    const off = () => setFlag(false);

    const controls: Controls = {
      toggle,
      on,
      off,
    };

    if (typeof nameOrInitial === 'string')  {
      const state: State<Name> = {
        [nameOrInitial]: flag,
      } as any;

      return { ...controls, ...state };
    }

    return [flag, controls];
  };

  return useFlag;
}

export interface Controls {
  toggle: () => void;
  on: () => void;
  off: () => void;
}

export type State<Name extends string> = {
  [name in Name]: boolean;
}