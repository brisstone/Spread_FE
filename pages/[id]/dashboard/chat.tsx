import Image from "next/image";
import useSWR from "swr";
import Card from "@/components/card";
import Layout, { LayoutHeader } from "@/components/layout";
import { ListItem } from "@/components/list";
import Tab, { TabItem, TabPanel } from "@/components/tab";
import utilStyles from "../styles/utils.module.css";
import ThreeDots from "@/public/images/threedots.svg";
import IconButton from "@/components/iconbutton";
import {
  IncomingMessage,
  MessageList,
  OutgoingMessage,
} from "@/components/message-list";
import { useState } from "react";
import ConversationsList from "@/components/conversation-list";
import Button from "@/components/button";
import Modal from "@/components/modal";
import Input from "@/components/input";
import { User } from "@/types/general";
import UsersList from "@/components/users-list";

export default function Chat() {
  const [tabIndex, setTabIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

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
                <ConversationsList />
                <div className="absolute bottom-0 w-full">
                  <Button onClick={() => setModalOpen(true)}>
                    Nouveau Message
                  </Button>
                </div>
              </TabPanel>
            </div>
          </div>
          <div className={`w-0.5 h-full bg-gradient-divider mx-12`}></div>
          <div className="relative flex flex-col grow h-full">
            {/** Chat window header */}
            <div className="flex justify-between items-center w-full rounded-3xl border-2 border-misc py-[10px] px-4">
              <Image
                src="/images/avatar.png"
                height={32}
                width={32}
                alt="avatar"
                className="rounded-full"
              />
              <p>Alvyn</p>
              <ThreeDots />
            </div>
            {/** End of chat window header */}

            {/** Messages section */}
            <div className="relative w-full grow my-5">
              <MessageList>
                <IncomingMessage
                  message="Lorem Ipsum is simply"
                  time="11:35 AM"
                  name="Alvyn LPB"
                  extraDetail="CEO"
                />
                <OutgoingMessage
                  message="Je te rejoins a CapeTown?"
                  time="11:35 AM"
                />

                <IncomingMessage
                  message="Je te rejoins a CapeTown ?"
                  time="11:35 AM"
                  name="Alvyn LPB"
                  extraDetail="CEO"
                />
                <OutgoingMessage
                  message="Je te rejoins a CapeTown?"
                  time="11:35 AM"
                />
                <OutgoingMessage
                  message="Je te rejoins a CapeTown?"
                  time="11:35 AM"
                />
                <OutgoingMessage
                  message="Je te rejoins a CapeTown?"
                  time="11:35 AM"
                />
                <IncomingMessage
                  message="Je te rejoins a CapeTown ?"
                  time="11:35 AM"
                  name="Alvyn LPB"
                  extraDetail="CEO"
                />
              </MessageList>
            </div>

            {/**Chat Input */}
            <div className="w-full">
              <div className="relative w-full flex bg-icon-back py-4 px-6 rounded-lg">
                <IconButton
                  iconUrl="/images/clip.svg"
                  height={20}
                  width={20}
                  // TODO edge not working, fix
                  // edge="left"
                />

                <input
                  type="text"
                  placeholder="Commencer à écrire..."
                  className="outline-none grow mx-1 bg-transparent"
                />

                <IconButton
                  iconUrl="/images/fly.svg"
                  height={20}
                  width={20}
                  // TODO edge not working, fix
                  // edge="left"
                />
              </div>
            </div>
            {/**End of chat input */}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

Chat.Layout = Layout;
