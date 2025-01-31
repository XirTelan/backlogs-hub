import { useEffect, useState } from "react";

function useDebounce<T>(value: T, ms = 500) {
  const [devouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return devouncedValue;
}

export default useDebounce;
