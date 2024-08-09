import { useState } from "react";

const useToggle = (initState = false) => {
  const [isOpen, setIsOpen] = useState(initState);

  const setClose = () => {
    setIsOpen(false);
  };

  const setOpen = () => {
    setIsOpen(true);
  };
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return { isOpen, setOpen, setClose, toggle };
};

export default useToggle;
