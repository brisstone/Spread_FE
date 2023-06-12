import io from "socket.io-client";
import Card from "@/components/card";
import Layout, { LayoutHeader } from "@/components/layout";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import { useEffect, useMemo, useState } from "react";
import ConversationsList from "@/components/conversation-list";
import Button from "@/components/button";
import Modal from "@/components/modal";
import UsersList from "@/components/users-list";
import ChatArea from "@/components/chat/chat-area";
import { getCookieContext } from "@/lib";
import useConversations from "@/data/use-conversations";
import { Conversation } from "@/types/general";
import { SocketType } from "@/types/socket-io";
import useUserAndEnterprise from "@/data/user-user-enterprise";
import {
  ConversationListType,
  ConversationType,
  EnterpriseRole,
} from "@/types/enum";

export default function Chat() {
  const [tabIndex, setTabIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientsModalOpen, setClientsModalOpen] = useState(false);

  const [selectedConvId, setSelectedConvId] = useState("");

  const socket: SocketType = useMemo(
    () =>
      io(process.env.NEXT_PUBLIC_WS_URL || "", {
        autoConnect: false,
      }),
    []
  );

  const { user } = useUserAndEnterprise();

  const { mutate: teamMutate } = useConversations(ConversationListType.TEAM);

  const { mutate: clientMutate } = useConversations(
    ConversationListType.CLIENT
  );

  const listType = tabIndex === 0 
    ? ConversationListType.TEAM 
    : ConversationListType.CLIENT;

  useEffect(() => {
    const token = getCookieContext();
    socket.auth = { token };
    socket.connect();

    socket.on("newConversation", (data) => {
      if (!user) return;
      const others = data.users.filter((u) => u.id !== user.id);
      if (
        data.type === ConversationType.DIRECT &&
        others[0].enterpriseRole.name === EnterpriseRole.CLIENT
      ) {
        clientMutate((prev) => (prev ? [data, ...prev] : prev));
      } else {
        teamMutate((prev) => (prev ? [data, ...prev] : prev));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, clientMutate, teamMutate, user]);

  return (
    <Layout header="Conversations Récentes 💬">
      <div className="flex flex-col w-full grow sticky">
        <Card className="flex w-full h-full grow p-5">
          <div className="flex flex-col h-full w-1/3">
            <div className="w-full">
              <Tab
                value={tabIndex}
                onChange={(newValue) => setTabIndex(newValue)}
                className="w-full"
              >
                <TabItem active>💡 Équipe</TabItem>
                <TabItem>‍🧑‍💼 Clients</TabItem>
                {/* <TabItem>📥 Direct</TabItem> */}
              </Tab>
            </div>

            <div className="relative grow w-full mt-8">
              <TabPanel index={0} value={tabIndex}>
                <UsersList
                  listType={listType}
                  socket={socket}
                  open={modalOpen}
                  handleClose={() => setModalOpen(false)}
                />
                <ConversationsList
                  type={ConversationListType.TEAM}
                  selectedConvId={selectedConvId}
                  onActive={(id) => {
                    setSelectedConvId(id);
                  }}
                />
                <div className="absolute bottom-0 w-full">
                  <Button onClick={() => setModalOpen(true)}>
                    Nouveau Message
                  </Button>
                </div>
              </TabPanel>

              <TabPanel index={1} value={tabIndex}>
                <UsersList
                  socket={socket}
                  open={clientsModalOpen}
                  handleClose={() => setClientsModalOpen(false)}
                  listType={listType}
                />
                <ConversationsList
                  type={ConversationListType.CLIENT}
                  selectedConvId={selectedConvId}
                  onActive={(id) => {
                    setSelectedConvId(id);
                  }}
                />

                <div className="absolute bottom-0 w-full">
                  <Button onClick={() => setClientsModalOpen(true)}>
                    Nouveau Message
                  </Button>
                </div>
              </TabPanel>
            </div>
          </div>
          <div className={`w-0.5 h-full bg-gradient-divider mx-12`}></div>
          <ChatArea
            listType={listType}
            selectedConvId={selectedConvId}
            socket={socket}
          />
        </Card>
      </div>
    </Layout>
  );
}

Chat.Layout = Layout;
