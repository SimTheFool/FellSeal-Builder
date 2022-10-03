import { DomainError, isDomainError } from "./DomainError.js";

export type DomainResult<A, B extends DomainError[]> = {
  isOk: () => boolean;
  isError: () => boolean;
};

export const newDomainResult = <A, B extends DomainError[]>(
  input: A | B
): DomainResult<A, B> => {
  const isOk = () => {
    if (Array.isArray(input) && input.length > 0 && isDomainError(input[0]))
      return false;
    return true;
  };

  const isError = () => !isOk();

  return {
    isOk,
    isError,
  };
};
