import axiosHttp from "@/lib/axiosHttp";
import { apiErrorParser, commonSuccessRespFilter } from "@/lib/responseHelpers";

export function authenticateUser() {
  return axiosHttp
    .get("/auth/user")
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function createConversation(id: string) {
  return axiosHttp
    .post("/messaging/conversations", { others: [id] })
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}
