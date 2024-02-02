import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const useChangeSearchParams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeParams = (key: string, newValue: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (newValue) {
      current.set(key, newValue);
    } else {
      current.delete(key);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return changeParams;
};

export default useChangeSearchParams;
