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
    ])(`when provided with '%p' sets initial value to '%p'`, (initial, expected) => {
      const { flagName } = useFlag('flagName', initial);
      expect(flagName).toBe(expected);
    });

    it("updates value to 'true' when switching 'on'", () => {
      const { flagName, on } = useFlag('flagName', false);
      expect(flagName).toBe(false);

      on();
      const { flagName: nextValue } = useFlag('flagName', false);
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

  describe('unnamed', () => {
    test.each([
      [undefined, false],
      [false, false],
      [true, true]
    ])(`when provided with '%p' sets initial value to '%p'`, (initial, expected) => {
      const [flagName] = useFlag(initial);
      expect(flagName).toBe(expected);
    });

    it("updates value to 'true' when switching 'on'", () => {
      const [flagName, { on }] = useFlag(false);
      expect(flagName).toBe(false);

      on();
      const [nextValue] = useFlag(false);
      expect(nextValue).toBe(true);
    });

    it("updates value to 'false' when switching 'off'", () => {
      const [flagName, {off }] = useFlag(true);
      expect(flagName).toBe(true);

      off();
      const [nextValue] = useFlag(true);
      expect(nextValue).toBe(false);
    });

    it("switches on/off values when 'toggling' value", () => {
      const [flagName, {toggle }] = useFlag(false);
      expect(flagName).toBe(false);

      toggle();
      expect(useFlag(false)[0]).toBe(true);

      toggle();
      expect(useFlag(false)[0]).toBe(false);
    });
  })
});

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
