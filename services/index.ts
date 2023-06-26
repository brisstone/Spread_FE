import { getCookie } from "@/lib";
import axiosHttp from "@/lib/axiosHttp";
import { apiErrorParser, commonSuccessRespFilter } from "@/lib/responseHelpers";
import {
  CRMLead,
  DocumentFile,
  KanbanItem,
  LeadOnboarding,
  Task,
  User,
  UserWithEnterprise,
} from "@/types/general";
import { SuccessDataResponse } from "@/types/responses";
import axios from "axios";

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
    .patch<SuccessDataResponse<CRMLead>>(`/crm/leads/${id}/move`, {
      categoryId: newCategory,
    })
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

export function checkAndUncheckNotes(id: string, done: boolean) {
  return axiosHttp
    .patch<SuccessDataResponse<Task>>(`/notes/${id}`, { done })
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function moveKanbanItem(id: string, newCategory: string) {
  return axiosHttp
    .patch<SuccessDataResponse<KanbanItem>>(`/kanban/items/${id}/move`, {
      categoryId: newCategory,
    })
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function closeKanbanItem(id: string) {
  return axiosHttp
    .patch<SuccessDataResponse<KanbanItem>>(`/kanban/items/${id}/close`)
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function getDocumentUploadSignedUrl(data: {
  fileType: string;
  name: string;
  folderId: string;
}) {
  return axiosHttp
    .post<
      SuccessDataResponse<{
        doc: DocumentFile;
        url: string;
      }>
    >("/documents/files", data)
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function deleteDocument(
  id: string,
  reason: "delete" | "uploadFailure" = "delete"
) {
  return axiosHttp
    .delete(`/documents/files/${id}?reason=${reason}`)
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function deleteFolder(id: string) {
  return axiosHttp
    .delete(`/documents/folders/${id}`)
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function getUploadSignedUrl() {
  return axiosHttp
    .get("/files/generate-signed-url")
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function getProfileImageUploadSignedUrl() {
  return axiosHttp
    .get<
      SuccessDataResponse<{
        key: string;
        url: string;
      }>
    >("/auth/user/image-upload-url")
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function updateUserProfile(update: Partial<User>) {
  return axiosHttp
    .patch<SuccessDataResponse<User>>("/auth/user", update)
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function uploadToS3(url: string, file: File) {
  return axios.put(url, file);
}

export function deleteUsers(ids: string[]) {
  return axiosHttp
    .delete("/enterprise/users", {
      data: {
        users: ids,
      },
    })
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function onboardLead(id: string) {
  return axiosHttp
    .post<SuccessDataResponse<LeadOnboarding>>(`/crm/leads/${id}/onboard`)
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function createSubscription(priceId: string) {
  return axiosHttp
    .post<
      SuccessDataResponse<{
        clientSecret: string;
        subscriptionId: string;
        enterpriseId: string;
      }>
    >("/payment/subscriptions", { priceId })
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function markSubscriptionAsActive(data: {
  enterpriseId: string;
  subscriptionId: string;
}) {
  return axiosHttp
    .post("/payment/subscriptions/activate", data)
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function getUserEnterprises() {
  return axiosHttp
    .get<SuccessDataResponse<UserWithEnterprise[]>>("/auth/user/enterprises", {
      headers: {
        Authorization: `Bearer ${getCookie('noent')}`
      }
    })
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}
