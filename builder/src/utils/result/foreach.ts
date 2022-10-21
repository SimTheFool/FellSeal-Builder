import { AppErrors, newAppError } from "@utils/Error";
import { getErrors, getOk } from "./get";
import { isErrors } from "./is";

const NOT_AN_ARRAY = newAppError(
  "result is not an array, you can't use foreach"
);

export const foreach =
  <Input, Output, InputErrors extends AppErrors = AppErrors>(
    input?: Input | InputErrors
  ) =>
  (piper: Input extends Array<infer R> ? (x: R) => Output : never) => {
    if (isErrors<Input, InputErrors>(input)) return getErrors(input);

    const elems = getOk(input);
    if (!Array.isArray(elems)) {
      throw NOT_AN_ARRAY;
    }

    return elems.map((e) => piper(e));
  };
