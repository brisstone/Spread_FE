import { ApiError } from "@/lib/ApiError";
import { User } from "@/types/general";
import { isAuthError } from "@/lib";
import useSWR from "swr";
import { baseUserTokenId } from "@/types/enum";
import { authFetcher } from "@/lib/fetcher";

export default function useBaseUser() {
  const { data: user, error, isLoading, mutate } = useSWR<User>(["/auth/user/base", baseUserTokenId], authFetcher);

  const loggedOut = isAuthError(error);

  return {
    user,
    error,
    loggedOut,
    isLoading,
    mutate,
  };
}
