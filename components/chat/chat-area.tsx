import Image from "next/image";
import { Socket } from "socket.io-client";
import { Message } from "@/types/general";
import IconButton from "../iconbutton";
import useSWRInfinite from "swr/infinite";
import useUser from "@/data/use-user";
import { useCallback, useEffect, useRef, useState } from "react";
import useConversations from "@/data/use-conversations";
import ThreeDots from "@/public/images/threedots.svg";
import { IncomingMessage, MessageList, OutgoingMessage } from "../message-list";
import { getUserName } from "@/lib/util";
import utilStyles from "@/styles/utils.module.css";

const getKey =
  (selectedConvId: string) =>
  (pageIndex: number, previousPageData: Message[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end

    return () =>
      selectedConvId
        ? `/messaging/conversations/${selectedConvId}/messages?page=${
            pageIndex + 1
          }&limit=10`
        : null;
  };

export default function ChatArea({
  selectedConvId,
  socket,
}: {
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
  } = useSWRInfinite<Message[]>(getKey(selectedConvId));

  const { user } = useUser();

  const observer = useRef<IntersectionObserver>(); // ref to store observer

  const [inputValue, setInputValue] = useState("");

  const lastElementRef = useCallback(
    (element: HTMLLIElement) => {
      //element is the react element being referenced

      // disconnect observer set on previous last element
      if (observer.current) observer.current.disconnect();

      // if there's no more data to be fetched, don't set new observer
      console.log("last array", messages && messages[messages.length - 1]);
      const noMore = messages && messages[messages.length - 1].length === 0;
      if (noMore) return;

      // set new observer
      observer.current = new IntersectionObserver((entries) => {
        // increase page number when element enters (is intersecting with) viewport.
        // This triggers the pagination hook to fetch more items in the new page
        if (entries[0].isIntersecting && !noMore) setSize(size + 1);
      });

      // observe/monitor last element
      if (element) observer.current.observe(element);
    },
    [size, setSize, messages]
  );

  const {
    conversations,
    error: convError,
    isLoading: convLoading,
  } = useConversations();

  const selectedConv =
    conversations && conversations.find((c) => c.id === selectedConvId);

  useEffect(() => {
    console.log('effecting')
    socket.on('privateMessage', (msg: Message) => {
      console.log('new private message', msg)
      mutate((m) => {
        console.log('about to mutate', m)
        if (!m) return m;
        const msgs = [...m]
        
        msgs[msgs.length - 1] = [...msgs[msgs.length - 1], msg]
        console.log(msgs)
        console.log(m)
        return msgs
      });
    });

    return () => {
      socket.off('privateMessage')
    }
  }, [socket, mutate]);

  return (
    <div className="relative flex flex-col grow h-full">
      {selectedConv && user ? (
        <>
          {/** Chat window header */}
          <div className="flex justify-between items-center w-full rounded-3xl border-2 border-misc py-[10px] px-4">
            <Image
              src="/images/avatar.png"
              height={32}
              width={32}
              alt="avatar"
              className="rounded-full"
            />
            <p>{selectedConv.users.map((u) => getUserName(u)).join(", ")}</p>
            <ThreeDots />
          </div>
          {/** End of chat window header */}

          {/** Messages section */}
          <div className="relative w-full grow my-5">
            <MessageList>
              {messages &&
                messages.flat().map((msg, index) => {
                  return msg.fromId === user.id ? (
                    <OutgoingMessage
                      key={msg.id}
                      message={msg.text}
                      time={new Date(msg.createdAt).toTimeString()}
                      // ref={
                      //   index === messages.flat().length - 1
                      //     ? lastElementRef
                      //     : undefined
                      // }
                    />
                  ) : (
                    <IncomingMessage
                      key={msg.id}
                      message={msg.text}
                      time="11:35 AM"
                      name={getUserName(msg.from)}
                      extraDetail="CEO"
                      ref={
                        index === messages.flat().length - 1
                          ? lastElementRef
                          : undefined
                      }
                    />
                  );
                })}
              {messagesLoading && <li className="text-base">Chargement...</li>}
            </MessageList>
          </div>

          {/**Chat Input */}
          <div className="w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                socket.emit("privateMessage", {
                  conversationId: selectedConv.id,
                  text: inputValue,
                }, (msg: Message) => {
                  console.log('about to mutate sending', messages)
                  mutate((m) => {
                    if (!m) return m;
                    const msgs = [...m]
                    
                    msgs[msgs.length - 1] = [...msgs[msgs.length - 1], msg]
                    return msgs
                  });
                });

                setInputValue('');
              }}
            >
              <div className="relative w-full flex bg-icon-back py-4 px-6 rounded-lg">
                <IconButton
                  iconUrl="/images/clip.svg"
                  height={20}
                  width={20}
                  onClick={() => setSize(size + 1)}
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
