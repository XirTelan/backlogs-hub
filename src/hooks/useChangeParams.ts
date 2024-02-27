import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useChangeSearchParams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeParams = useCallback((key: string, newValue: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (newValue) {
      current.set(key, newValue);
    } else {
      current.delete(key);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  },[pathname, router, searchParams])

  return {changeParams, searchParams};
};

export default useChangeSearchParams;
