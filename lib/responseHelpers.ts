import axios, { AxiosError, AxiosResponse } from "axios";
import { Response } from "@/types/responses";
import { ApiError } from "./ApiError";

export const apiErrorParser = (e: Error | AxiosError<Response>) => {
  if (axios.isAxiosError(e) && e.response) {
    
    throw new ApiError(e.response?.data.message, e.response);
  } else {
    throw e;
  }
}

export const commonSuccessRespFilter = <RType extends Response>(
  response: AxiosResponse<RType>
) => {
  if (response.data.status === 'error')
    throw new Error(response.data.message);

  return response;
}