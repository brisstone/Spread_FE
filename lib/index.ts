import { ApiError } from "@/lib/ApiError";
import { StorageEnum, baseUserTokenId } from "@/types/enum";
import { FormikErrors } from "formik";
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
  setCookie(enterpriseId, token);
}

export const getEnterpriseAccessTokenName = (e: string) => `${e}_access_token`;

export const getCurrentEntAccessTokenName = () => {
  return getEnterpriseAccessTokenName(
    localStorage.getItem(StorageEnum.ENT_CONTEXT) || ""
  );
};

export function getCookie(enterpriseId: string) {
  return Cookies.get(getEnterpriseAccessTokenName(enterpriseId));
}

export function getCookieContext() {
  return getCookie(localStorage.getItem(StorageEnum.ENT_CONTEXT) || "");
}

export function logout(enterpriseId: string) {
  localStorage.setItem(StorageEnum.ENT_CONTEXT, baseUserTokenId);
  return Cookies.remove(getEnterpriseAccessTokenName(enterpriseId));
}

function isStringArr(err: any[], index: number): err is string[] {
  return typeof err[index] === "string";
}

export function arrayError<T, K extends keyof T>(
  errors: string | undefined | string[] | FormikErrors<T>[],
  index: number,
  key: K
) {
  if (typeof errors === "string" || typeof errors === "undefined") {
    return errors;
  } else if (errors instanceof Array) {
    if (!errors[index]) return undefined;
    if (isStringArr(errors, index)) {
      return errors[index];
    }
    return errors[index][key];
  }
}
