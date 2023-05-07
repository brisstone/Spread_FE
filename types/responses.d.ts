export interface Response {
  status: 'error' | 'success';
  message: string;
}

export interface PaginatedResponse<Data> extends SuccessDataResponse<Data> {
  count?: number;
  next?: {
    page: number;
    limit: number;
  }
  prev?: {
    page: number;
    limit: number;
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
