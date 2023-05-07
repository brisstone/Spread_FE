import { AxiosResponse } from "axios";

export class ApiError<ResType> extends Error {

  statusCode: number;

  constructor(message: string, public response: AxiosResponse<ResType>) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    this.name = 'ApiError';
    this.statusCode = response.status;
    
    // this.code = response.code;
  }
}