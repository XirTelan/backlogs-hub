import { useCallback, useState } from "react";

export const useToggle = (initState = false) => {
  const [isOpen, setIsOpen] = useState(initState);

  const setClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const setOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return { isOpen, setOpen, setClose, toggle };
};
