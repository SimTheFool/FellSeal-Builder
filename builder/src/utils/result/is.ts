import { AppError, AppErrors, isAppError } from "@utils/Error";
import { getErrors } from "./get";

export const isOk = <Input, InputErrors extends AppErrors = AppErrors>(
  input?: Input | InputErrors
): input is Input => {
  if (Array.isArray(input) && input.length > 0 && isAppError(input[0]))
    return false;
  return true;
};

export const isErrors = <Input, InputErrors extends AppErrors = AppErrors>(
  input?: Input | InputErrors
): input is InputErrors => {
  return !isOk(input);
};

export const hasError =
  <
    Input,
    InputErrors extends AppErrors = AppErrors,
    CheckedError extends AppError = AppError
  >(
    input?: Input | InputErrors
  ) =>
  (error: CheckedError) => {
    if (!isErrors(input)) return false;
    const errors = getErrors(input);
    return errors.some((e) => e.msg === error.msg);
  };
