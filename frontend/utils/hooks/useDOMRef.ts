import { useCallback, useEffect, useState } from "react";
import { useId } from "./useId";
import { useSafeBoolean } from "./useSafeBoolean";

export const useDOMRef = <T extends Element>(
  dataSelectorName: string = "ref"
) => {
  const refId = useId(true);
  const selector = `data-${dataSelectorName}-id`;
  const [element, setElement] = useState<T>();
  const [hasTagged, setHasTagged] = useSafeBoolean(false);

  useEffect(() => {
    if (!refId || !hasTagged) return;
    const elem = document.querySelector<T>(`[${selector}="${refId}"]`);
    if (!elem) return;
    const parent = elem.parentElement;
    setElement(elem);
    const mutationObserver = new MutationObserver((mutationList) => {
      const mutation = mutationList.find((mut) => mut.target === parent);
      if (!mutation || ![...mutation.removedNodes].includes(elem)) return;
      setHasTagged(false);
    });
    parent && mutationObserver.observe(parent, { childList: true });

    return () => {
      mutationObserver.disconnect();
    };
  }, [setElement, hasTagged, setHasTagged]);

  const referenceElement = useCallback(() => {
    if (!refId) return {};
    setHasTagged(true);
    return {
      [selector]: refId,
    };
  }, [refId, setHasTagged, hasTagged]);

  return [element, referenceElement] as const;
};
