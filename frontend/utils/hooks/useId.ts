import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

export const useId = (clientOnly: boolean = false) => {
  const [id, setId] = useState<string | null>(() =>
    clientOnly ? null : nanoid(10)
  );

  useEffect(() => {
    if (id) return;
    setId(nanoid(10));
  }, []);

  return id;
};
