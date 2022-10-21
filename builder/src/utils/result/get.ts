import { AppErrors, newAppError } from "@utils/Error";
import { isOk, isErrors } from "./is";

const NO_ERROR = newAppError("app_result_can_not_access_error");
const NO_OK = newAppError("app_result_can_not_access_ok");
export const ACCESS_ERRORS = {
  NO_ERROR,
  NO_OK,
};

export const getOk = <Input, InputErrors extends AppErrors>(
  input?: Input | InputErrors
) => {
  if (!isOk(input)) throw NO_OK;
  return input as Input;
};

export const getErrors = <Input, InputErrors extends AppErrors = AppErrors>(
  input?: Input | InputErrors
) => {
  if (!isErrors(input)) throw NO_ERROR;
  return input as InputErrors;
};
