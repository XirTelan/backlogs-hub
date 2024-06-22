import { useEffect } from "react";

const useOutsideClickReg = (
  state: boolean,
  ref: React.RefObject<HTMLDivElement>,
  handleClick: () => void,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClick();
      }
    }
    if (state) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state, ref, handleClick]);
};

export default useOutsideClickReg;
