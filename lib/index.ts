import { ApiError } from "@/lib/ApiError";
import { StorageEnum } from "@/types/enum";
import Cookies from "js-cookie";

export function isAuthError(e: Error) {
  return (
    e &&
    (e as ApiError<any>).response &&
    [401, 403].includes((e as ApiError<any>).response.status)
  );
}

export function setCookie(enterpriseId: string, token: string) {
  return Cookies.set(`${enterpriseId}_access_token`, token, {
    secure: true,
    sameSite: "strict",
  });
}

export function setCookieContext(enterpriseId: string, token: string) {
  localStorage.setItem(StorageEnum.ENT_CONTEXT, enterpriseId);
  return setCookie(enterpriseId, token);
}

export function getCookie(enterpriseId: string) {
  return Cookies.get(`${enterpriseId}_access_token`);
}

export function getCookieContext() {
  return getCookie(localStorage.getItem(StorageEnum.ENT_CONTEXT) || "");
}
