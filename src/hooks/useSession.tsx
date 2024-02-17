import { fetcher } from "@/utils";
import useSWR from "swr";

const useSession = () => {
  const { data, error, isLoading } = useSWR(`/api/auth/session`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
};

export default useSession;
