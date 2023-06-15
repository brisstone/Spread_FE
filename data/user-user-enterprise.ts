import useSWR from "swr";
import useUser from "./use-user";
import { getCurrentEntAccessTokenName, isAuthError } from "@/lib";
import { Enterprise } from "@/types/general";
import { authFetcher } from "@/lib/fetcher";
import { useRouter } from "next/router";

export default function useUserAndEnterprise() {
  const router = useRouter();

  const { id } = router.query;

  const ID = id instanceof Array ? id[0] : (id || '')

  const {
    user,
    isLoading: userLoading,
    error: userError,
    loggedOut: userLoggedOut,
  } = useUser(ID);

  const {
    data: enterprise,
    isLoading: enterpriseLoading,
    error: enterpriseError,
  } = useSWR<Enterprise>(["/enterprise", ID], authFetcher);

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
