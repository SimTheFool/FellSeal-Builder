import { AppErrors } from "@utils/Error";
import { getErrors } from "./get";
import { isErrors } from "./is";

export const pipe =
  <Input, Output, InputErrors extends AppErrors = AppErrors>(
    input: Input | InputErrors
  ) =>
  (piper: (x: Input) => Output) => {
    if (isErrors(input)) return getErrors(input);
    return piper(input);
  };
