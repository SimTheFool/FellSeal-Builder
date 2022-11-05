import { AppErrors } from "@utils/Error";
import { isErrors, isOk } from "./is";

export const map =
  <Input, InputErrors extends AppErrors>(input: Input | InputErrors) =>
  (onOk: (value: Input) => void, onError?: (value: InputErrors) => void) => {
    if (isErrors(input)) onError?.(input);
    if (isOk(input)) onOk(input as Input);
    return input;
  };
