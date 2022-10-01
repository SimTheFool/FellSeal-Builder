export type DomainError<A, B> = A & { __domainError: B };

export const isDomainError = (
  input: unknown
): input is DomainError<unknown, unknown> => {
  if (typeof input !== "object") return false;
  if (input === null) return false;
  if (!(input as any)?.__domainError) return false;
  return true;
};
