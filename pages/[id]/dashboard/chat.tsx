import Card from "@/components/card";
import Layout, { LayoutHeader } from "@/components/layout";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import { useState } from "react";
import ConversationsList from "@/components/conversation-list";
import Button from "@/components/button";
import Modal from "@/components/modal";
import UsersList from "@/components/users-list";
import ChatArea from "@/components/chat/chat-area";

export default function Chat() {
  const [tabIndex, setTabIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedConvId, setSelectedConvId] = useState("");

  return (
    <Layout header="Conversations Récentes 💬">
      <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
        <UsersList />
      </Modal>
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
                <TabItem>📥 Direct</TabItem>
              </Tab>
            </div>

            <div className="relative grow w-full mt-8">
              <TabPanel index={0} value={tabIndex}>
                <ConversationsList selectedConvId={selectedConvId} onActive={(id) => setSelectedConvId(id)} />
                <div className="absolute bottom-0 w-full">
                  <Button onClick={() => setModalOpen(true)}>
                    Nouveau Message
                  </Button>
                </div>
              </TabPanel>
            </div>
          </div>
          <div className={`w-0.5 h-full bg-gradient-divider mx-12`}></div>
          <ChatArea selectedConvId={selectedConvId}/>
        </Card>
      </div>
    </Layout>
  );
}

Chat.Layout = Layout;
