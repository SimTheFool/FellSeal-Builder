import { useEffect } from "react";
import { useDOMRef } from "./useDOMRef";

type ResizeListener<E extends Element> = (e: E) => void;
export const useResizeObserver = <E extends Element>(
  elem: E | undefined,
  listener: ResizeListener<E>
) => {
  useEffect(() => {
    if (!elem) return;
    const observer = new ResizeObserver((elems) => {
      elems.forEach(({ target }) => {
        if (target !== elem) return;
        listener(elem);
      });
    });
    observer.observe(elem);
    return () => {
      observer.unobserve(elem);
    };
  }, [elem, listener]);
};
