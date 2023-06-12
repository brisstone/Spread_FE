import { Socket } from "socket.io-client";
import { Conversation, SocketErrorStatus, User } from "@/types/general";
import useSWR, { useSWRConfig } from "swr";
import { ListItem, ScrollableList } from "./list";
import { createConversation } from "@/services";
import { useAlert } from "@/contexts/alert-context";
import { getUserName } from "@/lib/util";
import useConversations from "@/data/use-conversations";
import { isSocketErrorStatus } from "@/lib/util/typeGuards";
import Modal, { ModalProps } from "./modal";
import { ConversationListType, EnterpriseRole, QuestionType } from "@/types/enum";

export default function UsersList({
  listType,
  socket,
  open,
  handleClose,
}: ModalProps & { socket: Socket; listType: ConversationListType }) {
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<Pick<User, "id" | "email" | "firstName" | "lastName">[]>(
    `/enterprise/users${listType === ConversationListType.CLIENT ? `?roles=${EnterpriseRole.CLIENT}` : ''}`
  );

  const { pushAlert } = useAlert();

  const { mutate } = useConversations(listType);

  return (
    <Modal open={open} handleClose={handleClose}>
      <ul>
        {users ? (
          <>
            {users.length > 0 ? (
              users.map((user) => (
                <ListItem
                  onClick={async () => {
                    socket.emit(
                      "newConversation",
                      [user.id],
                      (d: Conversation | SocketErrorStatus) => {
                        if (isSocketErrorStatus(d)) {
                          console.log(d);
                          pushAlert("Une erreur s'est produite");
                        } else {
                          console.log("mutating", d);
                          mutate();
                        }

                        if (handleClose) handleClose();
                      }
                    );
                  }}
                  key={user.id}
                  primaryText={getUserName(user)}
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
    </Modal>
  );
}
