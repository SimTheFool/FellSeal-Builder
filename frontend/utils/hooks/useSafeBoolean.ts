import { useCallback, useState } from "react";

export const useSafeBoolean = (initialValue: boolean) => {
  const [boolean, setBoolean] = useState(initialValue);
  const setSafeBoolean = useCallback(
    (value: boolean) => {
      value !== boolean && setBoolean(() => value);
    },
    [boolean, setBoolean]
  );
  return [boolean, setSafeBoolean] as const;
};
