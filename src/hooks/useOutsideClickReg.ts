import { useEffect } from "react";

const useOutsideClickReg = (
  state: boolean,
  ref: React.RefObject<HTMLDivElement | null>,
  handleClick: () => void,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClick();
      }
    }
    if (state) document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [state, ref, handleClick]);
};

export default useOutsideClickReg;
