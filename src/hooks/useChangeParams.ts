import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useChangeSearchParams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateKeys = useCallback(
    (
      keys: string[],
      values: (string | undefined)[],
      params: URLSearchParams,
    ) => {
      keys.forEach((key, indx) => {
        if (values[indx]) {
          params.set(key, values[indx]);
        } else {
          params.delete(key);
        }
      });
    },
    [],
  );

  const changeParams = useCallback(
    (key: string | string[], newValue: string | string[]) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (Array.isArray(key) && Array.isArray(newValue)) {
        updateKeys(key, newValue, current);
      } else if (typeof key === "string" && typeof newValue === "string") {
        updateKeys([key], [newValue], current);
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
    },
    [pathname, router, searchParams, updateKeys],
  );

  return { changeParams, searchParams };
};

export default useChangeSearchParams;
