import axiosHttp from "@/lib/axiosHttp";
import { apiErrorParser, commonSuccessRespFilter } from "@/lib/responseHelpers";
import { CRMLead, Task } from "@/types/general";
import { SuccessDataResponse } from "@/types/responses";

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

export function moveLead(id: string, newCategory: string) {
  return axiosHttp
    .post<SuccessDataResponse<CRMLead>>(`/crm/leads/${id}/move`, { categoryId: newCategory })
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function checkAndUncheckTask(id: string, done: boolean) {
  return axiosHttp
    .patch<SuccessDataResponse<Task>>(`/tasks/${id}`, { done })
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}