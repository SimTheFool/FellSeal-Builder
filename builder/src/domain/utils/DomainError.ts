export type DomainError<A extends string = string> = {
  msg: A;
  type: "domain_error";
};

export const newDomainError = <A extends string>(msg: A): DomainError<A> => ({
  msg,
  type: "domain_error",
});

export const isDomainError = (
  error: Record<string, string>
): error is DomainError => {
  if (error.type !== "domain_error") return false;
  if (!error.msg) return false;
  return true;
};
