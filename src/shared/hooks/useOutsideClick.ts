import { useEffect, RefObject } from "react";

// 외부클릭 관련 hooks
export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  isActive: boolean = true,
) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, isActive]);
};
