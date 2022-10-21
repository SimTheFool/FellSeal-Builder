import { AppErrors } from "@utils/Error";
import { isErrors, isOk } from "./is";

export const map =
  <Input, InputErrors extends AppErrors, T = any, U = any>(
    input: Input | InputErrors
  ) =>
  (onOk: (value: Input) => T, onError: (value: InputErrors) => U) => {
    if (isErrors(input)) return onError(input);
    return onOk(input);
  };
