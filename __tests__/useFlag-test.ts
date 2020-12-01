import { createUseFlag } from "../createUseFlag";

describe("useFlag", () => {
  it("updates value to 'true' when switching 'on'", () => {
    const useFlag = createMockUseFlag("value", false);

    const { value, on } = useFlag();
    expect(value).toBe(false);

    on();
    const { value: nextValue } = useFlag();
    expect(nextValue).toBe(true);
  });

  it("updates value to 'false' when switching 'off'", () => {
    const useFlag = createMockUseFlag("value", true);

    const { value, off } = useFlag();
    expect(value).toBe(true);

    off();
    const { value: nextValue } = useFlag();
    expect(nextValue).toBe(false);
  });

  it("switches on/off values when 'toggling' value", () => {
    const useFlag = createMockUseFlag("value", false);

    const { value, toggle } = useFlag();
    expect(value).toBe(false);

    toggle();
    expect(useFlag().value).toBe(true);

    toggle();
    expect(useFlag().value).toBe(false);
  });
});

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