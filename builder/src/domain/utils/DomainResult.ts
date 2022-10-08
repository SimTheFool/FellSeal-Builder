import { DomainError, isDomainError, newDomainError } from "./DomainError.js";

export type DomainResult<A, B extends DomainError[]> = {
  isOk: () => boolean;
  isErrors: () => boolean;
  getErrors: () => B;
  hasError: (error: DomainError) => boolean;
};

export const newDomainResult = <A, B extends DomainError[]>(
  input: A | B
): DomainResult<A, B> => {
  const isOk = () => {
    if (Array.isArray(input) && input.length > 0 && isDomainError(input[0]))
      return false;
    return true;
  };

  const isErrors = () => !isOk();

  const getErrors = () => {
    if (!isErrors()) throw NO_ERROR_ERROR;
    return input as B;
  };

  const hasError = <T extends DomainError>(error: T) => {
    const errors = getErrors();
    return errors.some((e) => e.msg === error.msg);
  };

  return {
    isOk,
    isErrors,
    getErrors,
    hasError,
  };
};

const NO_ERROR_ERROR = newDomainError("domain_result_can_not_access_error");
