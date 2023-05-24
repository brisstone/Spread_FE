import { User } from "@/types/general";
import { MutatorCallback } from "swr";

export function getUserName(
  user: Pick<User, "id" | "email" | "firstName" | "lastName">
) {
  return (
    `${user.firstName || ""}${user.lastName ? ` ${user.lastName}` : ""}` ||
    user.email
  );
}

export const getPgKey =
  <T>(s: () => string | null) =>
  (pageIndex: number, previousPageData: T[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end

    const str = s();

    return () => (str ? `${str}?page=${pageIndex + 1}&limit=10` : null);
  };

export const swrInfiniteMutate = <T>(u: T): MutatorCallback<T[][]> => (d: T[][] | undefined) => {
  if (!d) return d;
  const newData = [...d];

  console.log('update', u)

  newData[newData.length - 1] = [...newData[newData.length - 1], u];
  return newData;
}