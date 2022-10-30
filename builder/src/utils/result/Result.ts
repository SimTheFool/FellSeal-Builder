import { AppError, AppErrors } from "../Error.js";
import { foreach } from "./foreach.js";
import { getErrors, getOk } from "./get.js";
import { hasError, isErrors, isOk } from "./is.js";
import { map } from "./map.js";
import { pipe } from "./pipe.js";
//@TODO refacto in several files + test

export type AppResult<Input, InputErrors extends AppErrors> = {
  isOk: () => boolean;
  getOk: () => Input;
  isErrors: () => boolean;
  getErrors: () => InputErrors;
  hasError: (error: AppError) => boolean;
  map: <T, U>(
    onOk: (value: Input) => T,
    onError: (value: InputErrors) => U
  ) => T | U;
  pipe: <Output>(
    pipeable: (value: Input) => Output
  ) => AppResult<Output, InputErrors>;
  pipeResult: <T, U extends InputErrors, OutputResult extends AppResult<T, U>>(
    piper: (x: Input) => OutputResult
  ) => AppResult<T, U | InputErrors>;
  foreach: <Output>(
    piper: Input extends Array<infer R> ? (x: R) => Output : never
  ) => AppResult<Output[], InputErrors>;
  foreachResult: <T, U extends string>(
    piper: Input extends Array<infer R>
      ? (x: R) => AppResult<T, AppErrors<U>>
      : never
  ) => AppResult<T[], AppErrors<U> | InputErrors>;
};

export const newAppResult = <Input, InputErrors extends AppErrors = AppErrors>(
  input: Input | InputErrors
): AppResult<Input, InputErrors> => {
  const pipeFlat = <Output>(piper: (x: Input) => Output) => {
    const res = pipe<Input, Output, InputErrors>(input)(piper);
    return newAppResult(res);
  };

  const pipeResult = <
    T,
    U extends InputErrors,
    OutputResult extends AppResult<T, U>
  >(
    piper: (x: Input) => OutputResult
  ) => {
    const res = pipe<Input, OutputResult, InputErrors>(input)(piper);
    if (isErrors(res)) return newAppResult<T, U | InputErrors>(res);
    return res.map(
      (x) => newAppResult<T, U | InputErrors>(x),
      (x) => newAppResult<T, U | InputErrors>(x)
    );
  };

  const foreachFlat = <Output>(
    piper: Input extends Array<infer R> ? (x: R) => Output : never
  ) => {
    const res = foreach<Input, Output, InputErrors>(input)(piper);
    return newAppResult(res);
  };

  const foreachResult = <
    T,
    U extends string,
    OutputResult extends AppResult<T, AppErrors<U>>
  >(
    piper: Input extends Array<infer R> ? (x: R) => OutputResult : never
  ) => {
    const res = foreach<Input, OutputResult, InputErrors>(input)(piper);
    if (isErrors(res))
      return newAppResult<T[], AppErrors<U> | InputErrors>(res);
    if (res.some((r) => r.isErrors())) {
      const errors = res
        .filter((r) => r.isErrors())
        .flatMap((r) => r.getErrors());
      return newAppResult<T[], AppErrors<U> | InputErrors>(errors);
    }
    const oks = res.flatMap((r) => r.getOk());
    return newAppResult<T[], AppErrors<U> | InputErrors>(oks);
  };

  return {
    isOk: () => isOk<Input, InputErrors>(input),
    getOk: () => getOk<Input, InputErrors>(input),
    isErrors: () => isErrors<Input, InputErrors>(input),
    getErrors: () => getErrors<Input, InputErrors>(input),
    hasError: (e: AppError) => hasError(input)(e),
    map: map<Input, InputErrors>(input),
    pipe: pipeFlat,
    pipeResult: pipeResult as any,
    foreachResult: foreachResult as any,
    foreach: foreachFlat,
  };
};
