import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useLoaderValue = (
  value: string,
  checker: (value: string) => Promise<boolean>
) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    const isAvailableTitle = async () => {
      try {
        setIsLoading(true);
        setIsAvailable(true);
        const res = await checker(debouncedValue);
        setIsAvailable(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!debouncedValue) return;
    isAvailableTitle();
  }, [debouncedValue, checker, setIsAvailable, setIsLoading]);

  return { isAvailable, isLoading };
};

export default useLoaderValue;
//
