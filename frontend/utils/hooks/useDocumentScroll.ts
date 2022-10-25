import { useEffect } from "react";

export const useDocumentScroll = (listener: (e: Event) => void) => {
  useEffect(() => {
    document.addEventListener("scroll", listener, true);
    return () => document.removeEventListener("scroll", listener, true);
  }, [listener]);
};
