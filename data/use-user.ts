import { ApiError } from "@/lib/ApiError";
import { User } from "@/types/general";
import { isAuthError } from "@/lib";
import useSWR from "swr";

export default function useUser() {
  const { data: user, error, isLoading, mutate } = useSWR<User>("/auth/user");

  const loggedOut = isAuthError(error);

  return {
    user,
    error,
    loggedOut,
    isLoading,
    mutate,
  };
}
