import { MinimalUser,  } from "@/types/general";
import { MutatorCallback } from "swr";

export function getUserName(
  user: MinimalUser,
) {
  return (
    `${user.firstName || ""}${user.lastName ? ` ${user.lastName}` : ""}` ||
    user.baseUser.email
  );
}

export const getPgKey =
  <T>(s: () => string | null, setPageKey?: (s: string) => any) =>
  (pageIndex: number, previousPageData: T[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end

    const str = s();

    if (!str) return null;

    const index = str.indexOf("?");
    const url = index >= 0 ? str.substring(0, index) : str;
    const search = index >= 0 ? str.substring(index + 1) : "";
    const params = new URLSearchParams(search);

    params.append("page", String(pageIndex + 1));
    params.append("limit", "10");

    const key = url + "?" + params.toString();

    if (setPageKey) setPageKey(key);

    return key;
  };

export const swrInfiniteMutate =
  <T>(u: T, append: "top" | "bottom"): MutatorCallback<T[][]> | undefined =>
  (d: T[][] | undefined) => {
    if (!d) return d;
    const newData = [...d];

    if (append === "top") {
      newData[0] = [u, ...newData[newData.length - 1]];
    } else {
      newData[newData.length - 1] = [...newData[newData.length - 1], u];
    }

    return newData;
  };

export const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;
