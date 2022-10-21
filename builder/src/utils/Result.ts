import { AppError, AppErrors, isAppError, newAppError } from "./Error.js";
//@TODO refacto in several files + test
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
  /* foreach: Input extends Array<infer R>
    ? <Output, OutputError extends AppErrors>(
        pipeable: (value: R) => AppResult<Output, OutputError>
      ) => AppResult<Output[], InputErrors | OutputError>
    : never; */
  foreach: <Output, OutputErrors extends AppErrors>(
    pipeable: (
      value: Input extends Array<infer R> ? R : never
    ) => AppResult<Output, OutputErrors>
  ) => AppResult<Output[], InputErrors | OutputErrors>;
};

export const newAppResult = <Input, InputErrors extends AppErrors = AppErrors>(
  input?: Input | InputErrors
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

  const foreach = <Output, OutputErrors extends AppErrors>(
    pipeable: (
      value: Input extends Array<infer R> ? R : never
    ) => AppResult<Output, OutputErrors>
  ) => {
    const result = newAppResult(input);
    if (result.isErrors()) {
      const errors = result.getErrors();
      return newAppResult<Output[], InputErrors | OutputErrors>(errors);
    }

    const elems = result.getOk();
    if (!Array.isArray(elems))
      throw "result is not an array, you can't use foreach";

    const outputs = elems.map((e) => pipeable(e));
    const outputErrors = outputs.filter((o) => o.isErrors());

    if (outputErrors.length) {
      const errors = outputErrors.flatMap((o) => o.getErrors()) as OutputErrors;
      return newAppResult<Output[], InputErrors | OutputErrors>(errors);
    }

    return newAppResult<Output[], InputErrors | OutputErrors>(
      outputs.map((o) => o.getOk())
    );
  };

  const neverForeach = Array.isArray(input) ? {} : foreach;

  return {
    isOk,
    getOk,
    isErrors,
    getErrors,
    hasError,
    pipe,
    foreach,
  };
};
