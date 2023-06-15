import axiosHttp, { axiosAuth } from "@/lib/axiosHttp";
import { apiErrorParser, commonSuccessRespFilter } from "@/lib/responseHelpers";
import { PaginationResponse } from "@/types/responses";
import axios from "axios";
import { getCookie } from ".";

export default function fetcher(url: string) {
  return axiosHttp
    .get(url)
    .then(commonSuccessRespFilter)
    .then((response) => response.data.data)
    .catch(apiErrorParser);
}

export function authFetcher([url, enterpriseId]: string[]) {
  return axiosAuth
  .get(url, {
    headers: {
      Authorization: `Bearer ${getCookie(enterpriseId)}`
    }
  })
  .then(commonSuccessRespFilter)
  .then((response) => response.data.data)
  .catch(apiErrorParser);
}

export function customFetcher(action: (resp: PaginationResponse<any>) => any) {
  return (url: string) => {
    console.log("FETCHING....");
    return axiosHttp
      .get(url)
      .then(commonSuccessRespFilter)
      .then((response) => {
        action(response as any);
        return response.data.data;
      })
      .catch(apiErrorParser);
  };
}
