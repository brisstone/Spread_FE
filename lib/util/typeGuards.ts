import { SocketErrorStatus } from "@/types/general";

export function isSocketErrorStatus(msg: any): msg is SocketErrorStatus {
  return msg.errors && typeof msg.errors === 'object' && msg.status;
}