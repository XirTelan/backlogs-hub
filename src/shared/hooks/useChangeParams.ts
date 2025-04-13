import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useChangeSearchParams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateKeys = useCallback(
    (
      keys: string[],
      values: (string | undefined)[],
      params: URLSearchParams
    ) => {
      keys.forEach((key, indx) => {
        if (values[indx]) {
          params.set(key, values[indx]);
        } else {
          params.delete(key);
        }
      });
    },
    []
  );

  const changeParams = useCallback(
    (key: string | string[], newValue: string | string[]) => {
      const currentSearch = searchParams.toString();
      const newParams = new URLSearchParams(Array.from(searchParams.entries()));

      if (Array.isArray(key) && Array.isArray(newValue)) {
        updateKeys(key, newValue, newParams);
      } else if (typeof key === "string" && typeof newValue === "string") {
        updateKeys([key], [newValue], newParams);
      }

      const newSearch = newParams.toString();
      if (newSearch === currentSearch) return;
      const query = newSearch ? `?${newSearch}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
    },
    [pathname, router, searchParams, updateKeys]
  );

  return { changeParams, searchParams };
};
