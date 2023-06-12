import useSWR from "swr";
import { Conversation } from "@/types/general";
import { ConversationListType } from "@/types/enum";

export default function useConversations(type: ConversationListType) {
  const {
    data: conversations,
    error,
    isLoading,
    mutate,
  } = useSWR<Conversation[]>(`/messaging/conversations?type=${type}`);

  return {
    conversations,
    error,
    isLoading,
    mutate,
  };
}
