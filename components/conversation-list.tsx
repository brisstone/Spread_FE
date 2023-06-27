import useSWR from "swr";
import { ListItem } from "./list";
import { Conversation } from "@/types/general";
import { getUserName } from "@/lib/util";
import useConversations from "@/data/use-conversations";
import useUser from "@/data/use-user";
import { ConversationListType } from "@/types/enum";

export default function ConversationsList(props: {
  noXPadding?: boolean;
  type: ConversationListType;
  onActive?: (id: string) => any;
  selectedConvId?: string;
}) {
  const { conversations, error, isLoading } = useConversations(props.type);

  const { user } = useUser();
  

  return error ? (
    <p className="text-base text-subtitle text-center">
      Quelque chose s&apos;est mal passé. Nous n&apos;avons pas pu récupérer vos
      conversations. Veuillez réessayer !
    </p>
  ) : (
    <>
      {isLoading ? (
        <p className="text-base text-subtitle text-center">Chargement...</p>
      ) : (
        <ul>
          {user && conversations && conversations.length ? (
            conversations.map((c) => (
              <>
                <ListItem
                  user={user}
                  noXPadding={props.noXPadding}
                  onClick={() => (props.onActive ? props.onActive(c.id) : null)}
                  primaryText={c.users
                    .filter((u) => u.id !== user.id)
                    .map((u) => getUserName(u))
                    .join(", ")}
                  key={c.id}
                  secondaryText="1 Nouveau Message | En Ligne"
                  active={c.id === props.selectedConvId}
                />
              </>
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
