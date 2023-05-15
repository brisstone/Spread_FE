import { User } from "@/types/general";

export function getUserName(user: Pick<User, "id" | "email" | "firstName" | "lastName">) {
  return `${user.firstName || ''}${user.lastName ? ` ${user.lastName}` : ''}` || user.email
}