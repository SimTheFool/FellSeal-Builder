export type AppError<A extends string = string> = {
  msg: A;
  type: "app_error";
};

export type AppErrors<A extends string = string> = AppError<A>[];

export const newAppError = <A extends string>(msg: A): AppError<A> => ({
  msg,
  type: "app_error",
});

export const isAppError = (
  error: Record<string, string>
): error is AppError => {
  if (error.type !== "app_error") return false;
  if (!error.msg) return false;
  return true;
};
