import { useState as useReactState } from "react";
import { createUseFlag } from "./createUseFlag";

const useFlag = createUseFlag(useReactState);

export { useFlag };
export default useFlag;