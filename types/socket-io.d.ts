import { Socket } from "socket.io-client";
import { Conversation, Message } from "./general";

export interface ClientToServerEvents {
  privateMessage: (
    data: Pick<Message, 'text' | 'conversationId'>,
    callback: (d: Message | ErrorStatus) => void
  ) => Promise<void>;

  newConversation: (data: string[], callback: (d: ConversationWithUsers | ErrorStatus) => void) => Promise<void>;
}

export interface ServerToClientEvents {
  isActive: (d: { id: string; isActive: boolean }) => void;
  privateMessage: (d: Message) => void;
  userDisconnected: (id: string) => void;
  newConversation: (c: Conversation) => void;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>