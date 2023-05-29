import { Props } from "@/types/props";
import Image from "next/image";
import { ForwardedRef, forwardRef } from "react";

interface MessageProps extends Props {
  message: string;
  time: string;
}

interface IncomingMessageProps extends MessageProps {
  name: string;
  extraDetail: string;
}

export function MessageList(props: Props) {
  return (
    <ul className="absolute scrollbar-thin scrollbar-track-transparent scrollbar-thumb-icon-back top-0 left-0 w-full h-full flex flex-col-reverse overflow-y-auto">
      {props.children}
    </ul>
  );
}

export const IncomingMessage = forwardRef(
  (props: IncomingMessageProps, ref: ForwardedRef<HTMLLIElement>) => {
    return (
      <li className="flex justify-start mt-8" ref={ref}>
        <div className="flex gap-3 max-w-[60%] items-start">
          {/* <div className=""> */}
          <Image
            src="/images/avatar.png"
            height={32}
            width={32}
            alt="avatar"
            className="rounded-full"
          />
          {/* </div> */}

          <div className="flex gap-2 grow bg-btn p-2 rounded-r-[6px] rounded-b-[6px]">
            <div className="grow mb-4">
              <p className="flex gap-[10px] items-center text-base leading-[18px]">
                <span>{props.name}</span>
                <span className="text-[12px] leading-[14px]">
                  {props.extraDetail}
                </span>
              </p>
              <p className="text-base leading-[20px] break-words">
                {props.message}
              </p>
            </div>
            <div className="self-end mt-5">
              <p
                className={`text-[12px] leading-[15px] font-light`}
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                11:35AM
              </p>
            </div>
          </div>
        </div>
      </li>
    );
  }
);

IncomingMessage.displayName = "IncomingMessage";

export const OutgoingMessage = forwardRef(
  (props: MessageProps, ref: ForwardedRef<HTMLLIElement>) => {
    return (
      <li className="flex justify-end mt-8" ref={ref}>
        <div className="max-w-[60%] items-start">
          <div className="flex gap-2 grow bg-white text-purpleblack p-2 rounded-l-[6px] rounded-b-[6px]">
            <div className="grow mb-4">
              <p className="text-base leading-[20px] break-words">
                {props.message}
              </p>
            </div>
            <div className="flex self-end mt-5 gap-1 flex-nowrap">
              <p
                className={`text-[12px] leading-[15px] font-light`}
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                11:35AM
              </p>
              <Image
                src="/images/readreceipt.svg"
                height={8}
                width={16}
                alt="avatar"
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </li>
    );
  }
);

OutgoingMessage.displayName = "OutgoingMessage";
