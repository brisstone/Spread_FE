import { Conversation, User } from "@/types/general";
import useSWR, { useSWRConfig } from "swr";
import { ListItem, ScrollableList } from "./list";
import { createConversation } from "@/services";
import { useAlert } from "@/contexts/alert-context";

export default function UsersList() {
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<Pick<User, "id" | "email" | "firstName" | "lastName">[]>(
    "/enterprise/users"
  );

  const { pushAlert } = useAlert();
  const { mutate } = useSWRConfig()


  return (
    <ul>
      {users ? (
        <>
          {users.length > 0 ? (
            users.map((user) => (
              <ListItem
                onClick={async () => {
                  createConversation(user.id)
                    .then((data) => {
                      // mutate<Conversation[]>('/messaging/conversations', undefined, {
                      //   optimisticData: (current: Conversation[]) => {
                      //     console.log('current');
                      //   }
                      // })
                      mutate("/messaging/conversations");
                    })
                    .catch((e) => pushAlert(e.message))
                }}
                key={user.id}
                primaryText={`${user.firstName || ''}${user.lastName ? ` ${user.lastName}` : ''}` || user.email}
                secondaryText="Démarrer la conversation"
              />
            ))
          ) : (
            <p className="text-base">Aucun utilisateur pour le moment</p>
          )}
        </>
      ) : (
        <p className="text-base">
          {isLoading && "Chargement..."}
          {error && "Erreur lors de la récupération des utilisateurs"}
        </p>
      )}
    </ul>
  );
}
