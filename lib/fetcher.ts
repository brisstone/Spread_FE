import axiosHttp from "@/lib/axiosHttp";
import { apiErrorParser, commonSuccessRespFilter } from "@/lib/responseHelpers";
import { PaginationResponse } from "@/types/responses";

export default function fetcher(url: string) {
  return axiosHttp
    .get(url)
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
