import useSWR from "swr";
import useUser from "./use-user";
import { isAuthError } from "@/lib";
import { Enterprise } from "@/types/general";

export default function useUserAndEnterprise() {
  const {
    user,
    isLoading: userLoading,
    error: userError,
    loggedOut: userLoggedOut,
  } = useUser();

  const {
    data: enterprise,
    isLoading: enterpriseLoading,
    error: enterpriseError,
  } = useSWR<Enterprise>("/enterprise");

  const error = userError || enterpriseError;

  const isLoading = userLoading || enterpriseLoading;

  const enterpriseAuthError = isAuthError(enterpriseError);

  const loggedOut = userLoggedOut || enterpriseAuthError;

  return {
    user,
    enterprise,
    error,
    isLoading,
    loggedOut,
  };
}
