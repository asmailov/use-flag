import { useState } from "react";
import { createUseFlag } from "../createUseFlag";

describe("useFlag", () => {
  let useFlag: ReturnType<typeof createUseFlag>;
  beforeEach(() => {
    useFlag = createUseFlag(getUseMockState());
  })

  describe('named', () => {
    test.each([
      [undefined, false],
      [false, false],
      [true, true]
    ])(`when provided with '%p' sets initial value to '%p'`, (intial, expected) => {
      const { flagName } = useFlag('flagName', intial);
      expect(flagName).toBe(expected);
    });

    it("updates value to 'true' when switching 'on'", () => {
      const { flagName, on } = useFlag('flagName', false);
      expect(flagName).toBe(false);

      on();
      const { flagName: nextValue } = useFlag('flagName');
      expect(nextValue).toBe(true);
    });

    it("updates value to 'false' when switching 'off'", () => {
      const { flagName, off } = useFlag('flagName', true);
      expect(flagName).toBe(true);
  
      off();
      const { flagName: nextValue } = useFlag('flagName', true);
      expect(nextValue).toBe(false);
    });

    it("switches on/off values when 'toggling' value", () => {
      const { flagName, toggle } = useFlag('flagName', false);
      expect(flagName).toBe(false);
  
      toggle();
      expect(useFlag('flagName', false).flagName).toBe(true);
  
      toggle();
      expect(useFlag('flagName', false).flagName).toBe(false);
    });
  })

  // it("updates value to 'true' when switching 'on'", () => {
  //   const useFlag = createMockUseFlag("value", false);

  //   const { value, on } = useFlag();
  //   expect(value).toBe(false);

  //   on();
  //   const { value: nextValue } = useFlag();
  //   expect(nextValue).toBe(true);
  // });

  // it("updates value to 'false' when switching 'off'", () => {
  //   const useFlag = createMockUseFlag("value", true);

  //   const { value, off } = useFlag();
  //   expect(value).toBe(true);

  //   off();
  //   const { value: nextValue } = useFlag();
  //   expect(nextValue).toBe(false);
  // });

  // it("switches on/off values when 'toggling' value", () => {
  //   const useFlag = createMockUseFlag("value", false);

  //   const { value, toggle } = useFlag();
  //   expect(value).toBe(false);

  //   toggle();
  //   expect(useFlag().value).toBe(true);

  //   toggle();
  //   expect(useFlag().value).toBe(false);
  // });
});

function testOverload() {

}

function createMockUseFlag<T extends string>(name: T, initial: boolean) {
  let state: any = undefined;
  const setState = (update: any) => {
    if (typeof update === "function") {
      state = update(state);
    } else {
      state = update;
    }
  };
  let firstTime = true;
  const mockUseState = jest.fn((initial) => {
    if (firstTime) {
      state = initial;
      firstTime = false;
    }

    return [state, setState];
  });
  const useFlag = createUseFlag(mockUseState as any);

  return () => useFlag(name, initial);
}

function getUseMockState(): typeof useState {
  let state: any = undefined;
  const setState = (update: any) => {
    if (typeof update === "function") {
      state = update(state);
    } else {
      state = update;
    }
  };
  let firstTime = true;
  const mockUseState = jest.fn((initial) => {
    if (firstTime) {
      state = initial;
      firstTime = false;
    }

    return [state, setState];
  });

  return mockUseState as any;
}
