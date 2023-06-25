import Image from "next/image";
import { Socket } from "socket.io-client";
import { Message, SocketErrorStatus } from "@/types/general";
import IconButton from "../iconbutton";
import useSWRInfinite from "swr/infinite";
import useUser from "@/data/use-user";
import { useCallback, useEffect, useRef, useState } from "react";
import useConversations from "@/data/use-conversations";
import ThreeDots from "@/public/images/threedots.svg";
import { IncomingMessage, MessageList, OutgoingMessage } from "../message-list";
import { getPgKey, getUserName } from "@/lib/util";
import utilStyles from "@/styles/utils.module.css";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import moment from "moment";
import { isSocketErrorStatus } from "@/lib/util/typeGuards";
import { ConversationListType } from "@/types/enum";

export default function ChatArea({
  listType,
  selectedConvId,
  socket,
}: {
  listType: ConversationListType;
  selectedConvId: string;
  socket: Socket;
}) {
  const {
    data: messages,
    error,
    isLoading: messagesLoading,
    size,
    mutate,
    setSize,
  } = useSWRInfinite<Message[]>(
    getPgKey<Message>(() =>
      selectedConvId
        ? `/messaging/conversations/${selectedConvId}/messages`
        : null
    )
  );

  const { observerTarget } = useInfiniteScroll(setSize);

  const { user } = useUser();

  const [inputValue, setInputValue] = useState("");

  const {
    conversations,
    error: convError,
    isLoading: convLoading,
  } = useConversations(listType);

  const selectedConv =
    conversations && conversations.find((c) => c.id === selectedConvId);

  useEffect(() => {
    console.log("effecting");
    socket.on("privateMessage", (msg: Message) => {
      console.log("new private message", msg);
      mutate((m) => {
        if (!m) return m;
        const msgs = [...m];
        msgs[msgs.length - 1] = [...msgs[msgs.length - 1], msg];
        return msgs;
      });
    });

    return () => {
      socket.off("privateMessage");
    };
  }, [socket, mutate]);

  return (
    <div className="relative flex flex-col grow h-full">
      {selectedConv && user ? (
        <>
          {/** Chat window header */}
          <div className="flex justify-between items-center w-full rounded-3xl border-2 border-misc py-[10px] px-4">
            <Image
              src={user.profileImageUrl||"/avart.png"}
              height={22}
              width={22}
              alt="avatar"
              className="rounded-full"
              style={{borderRadius:"100px"}}
            />
            <p>
              {selectedConv.users
                .filter((u) => u.id !== user.id)
                .map((u) => getUserName(u))
                .join(", ")}
            </p>
            <ThreeDots />
          </div>
          {/** End of chat window header */}

          {/** Messages section */}
          <div className="relative w-full grow my-5">
            <MessageList>
              {messages &&
                messages.flat().map((msg, index) => {
                  console.log("msg", msg);
                  return msg.fromId === user.id ? (
                    <OutgoingMessage
                      user={user}
                      key={msg.id}
                      message={msg.text}
                      time={moment(msg.createdAt).format("hh:mm a")}
                      // ref={
                      //   index === messages.flat().length - 1
                      //     ? lastElementRef
                      //     : undefined
                      // }
                    />
                  ) : (
                    <IncomingMessage
                    user={user}
                      key={msg.id}
                      message={msg.text}
                      time={moment(msg.createdAt).format("hh:mm a")}
                      name={getUserName(msg.from)}
                      extraDetail="CEO"
                    />
                  );
                })}
              {messagesLoading && <li className="text-base">Chargement...</li>}
              <li className="h-px" ref={observerTarget}></li>
            </MessageList>
          </div>

          {/**Chat Input */}
          <div className="w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                socket.emit(
                  "privateMessage",
                  {
                    conversationId: selectedConv.id,
                    text: inputValue,
                  },
                  (msg: Message | SocketErrorStatus) => {
                    if (isSocketErrorStatus(msg)) {
                      return;
                    }
                    console.log("about to mutate sending", messages);
                    mutate((m) => {
                      if (!m) return m;
                      const msgs = [...m];

                      msgs[msgs.length - 1] = [...msgs[msgs.length - 1], msg];
                      return msgs;
                    });
                  }
                );

                setInputValue("");
              }}
            >
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
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />

                <IconButton
                  iconUrl="/images/fly.svg"
                  disabled={!Boolean(inputValue)}
                  height={20}
                  width={20}
                  type="submit"
                  // TODO edge not working, fix
                  // edge="left"
                />
              </div>
            </form>
          </div>
          {/**End of chat input */}
        </>
      ) : (
        <p className={`text-lg text-center ${utilStyles.absoluteCentered}`}>
          Cliquez sur une conversation pour afficher les messages
        </p>
      )}
    </div>
  );
}
