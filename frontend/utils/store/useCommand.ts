import { AppQuery, AppErrors, AppResult } from "builder";
import { useCallback, useEffect, useState } from "react";

export const useBuilderCommand = <T extends any[], Errors extends AppErrors>(
  appCommand: (...params: T) => AppResult<undefined, Errors>
) => {
  const [errors, setErrors] = useState<Errors>();

  const command = useCallback(
    (...params: T) => {
      appCommand(...params).map(
        (ok) => {},
        (errors) => setErrors(errors)
      );
    },
    [appCommand]
  );

  return [command, errors] as const;
};
