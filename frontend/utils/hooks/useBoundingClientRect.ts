import { useCallback, useState } from "react";
import { useDocumentScroll } from "./useDocumentScroll";
import { useResizeObserver } from "./useResizeObserver";

export const useBoundingClientRect = (element?: HTMLElement) => {
  const [rect, setRect] = useState<DOMRect>();

  const setBoundingClientRect = useCallback(() => {
    if (!element) return;
    setRect(element.getBoundingClientRect());
  }, [element, setRect]);

  useDocumentScroll(setBoundingClientRect);
  useResizeObserver(element, setBoundingClientRect);

  return rect;
};
