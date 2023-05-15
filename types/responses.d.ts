export interface Response {
  status: 'error' | 'success';
  message: string;
}

export interface PaginationResponse<T> {
  data: T[];
  pageData: {
    total: number;
    currentPage: number;
    nextPage: number;
    prevPage: number;
    lastPage: number;
  }
}

export interface SuccessDataResponse<Data> extends Response {
  data: Data
}

export interface VerifyTokenResponse {
  id: string;
  username: string;
}

export interface CreateTokenResponse extends VerifyTokenResponse {
  token: string;
}

interface Client {
  id: string;
  socket_id: string;
  username: string;
}

export interface RoomResponse {
  id: string;
  clients: Client[];
  game_state: string;
  creator: string;
}
