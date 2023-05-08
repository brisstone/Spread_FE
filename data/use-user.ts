import { ApiError } from "@/lib/ApiError";
import { User } from "@/types/general";
import useSWR from "swr";

export default function useUser() {
  const { data: user, error, isLoading, mutate } = useSWR<User>("/auth/user");

  const loggedOut =
    error &&
    error.response &&
    [401, 403].includes((error as ApiError<any>).response.status);

  return {
    user,
    error,
    loggedOut,
    isLoading,
    mutate,
  };
}
