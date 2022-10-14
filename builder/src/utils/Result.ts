import { AppError, AppErrors, isAppError, newAppError } from "./Error.js";

const NO_ERROR = newAppError("app_result_can_not_access_error");
const NO_OK = newAppError("app_result_can_not_access_ok");

export type AppResult<Input, InputErrors extends AppErrors> = {
  isOk: () => boolean;
  getOk: () => Input;
  isErrors: () => boolean;
  getErrors: () => InputErrors;
  hasError: (error: AppError) => boolean;
  pipe: <Output, OutputError extends AppErrors>(
    pipeable: (value: Input) => AppResult<Output, OutputError>
  ) => AppResult<Output, InputErrors | OutputError>;
};

export const newAppResult = <Input, InputErrors extends AppErrors>(
  input: Input | InputErrors
): AppResult<Input, InputErrors> => {
  const isOk = () => {
    if (Array.isArray(input) && input.length > 0 && isAppError(input[0]))
      return false;
    return true;
  };

  const getOk = () => {
    if (!isOk()) throw NO_OK;
    return input as Input;
  };

  const isErrors = () => !isOk();

  const getErrors = () => {
    if (!isErrors()) throw NO_ERROR;
    return input as InputErrors;
  };

  const hasError = <T extends AppError>(error: T) => {
    const errors = getErrors();
    return errors.some((e) => e.msg === error.msg);
  };

  const pipe = <Output, OutputError extends AppErrors>(
    pipeable: (value: Input) => AppResult<Output, OutputError>
  ) => {
    const piper = (
      result: AppResult<Input, InputErrors>
    ): AppResult<Output, InputErrors | OutputError> => {
      if (result.isErrors()) {
        const errors = result.getErrors();
        return newAppResult<Output, InputErrors | OutputError>(errors);
      }
      return pipeable(result.getOk()) as AppResult<
        Output,
        InputErrors | OutputError
      >;
    };

    return piper(newAppResult(input));
  };

  return {
    isOk,
    getOk,
    isErrors,
    getErrors,
    hasError,
    pipe,
  };
};
