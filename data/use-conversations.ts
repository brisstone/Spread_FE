import useSWR from "swr";
import { Conversation } from "@/types/general";

export default function useConversations() {
  const {
    data: conversations,
    error,
    isLoading,
  } = useSWR<Conversation[]>("/messaging/conversations");

  return {
    conversations,
    error,
    isLoading,
  }
}