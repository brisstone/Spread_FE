import { ApiError } from "@/lib/ApiError";
import { User } from "@/types/general";
import { getCurrentEntAccessTokenName, isAuthError } from "@/lib";
import useSWR from "swr";
import { authFetcher } from "@/lib/fetcher";
import { useRouter } from "next/router";

export default function useUser(enterpriseId?: string) {
  const router = useRouter();

  const { id } = router.query;

  const { data: user, error, isLoading, mutate } = useSWR<User>(["/auth/user", enterpriseId || id], authFetcher);

  const loggedOut = isAuthError(error);

  return {
    user,
    error,
    loggedOut,
    isLoading,
    mutate,
  };
}
