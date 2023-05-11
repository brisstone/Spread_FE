import useSWR from "swr";
import { ListItem } from "./list";
import { Conversation } from "@/types/general";

export default function ConversationsList() {
  const {
    data: conversations,
    error,
    isLoading,
  } = useSWR<Conversation[]>("/messaging/conversations");

  return error ? (
    <p className="text-base text-subtitle text-center">
      Quelque chose s&apos;est mal passé. Nous n&apos;avons pas pu récupérer vos
      conversations. Veuillez réessayer !
    </p>
  ) : (
    <>
      {isLoading ? (
        <p className="text-base text-subtitle text-center">
          Chargement...
        </p>
      ) : (
        <ul>
          {conversations && conversations.length ? (
            conversations.map((c) => (
              <ListItem
                primaryText="📩 Demi Wikinson"
                key={c.id}
                secondaryText="1 Nouveau Message | En Ligne"
              />
            ))
          ) : (
            <p className="text-base text-subtitle text-center">
              Vous n&apos;avez pas encore de conversation
            </p>
          )}
        </ul>
      )}
    </>
  );
}
