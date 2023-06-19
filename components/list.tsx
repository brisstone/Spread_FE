import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import { PropWithActive, Props } from "@/types/props";
import { ForwardedRef, forwardRef } from "react";

interface ListItemProps extends PropWithActive {
  primaryText: string;
  secondaryText: string;
}

export function ListItem(
  props: ListItemProps & { onClick?: () => any; noXPadding?: boolean }
) {
  return (
    <div
      className={`flex gap-3 items-center ${
        !props.noXPadding ? "px-5" : ""
      } py-4 cursor-pointer ${props.active ? utilStyles.glass : ""}`}
      onClick={props.onClick}
    >
      <div className="flex relative after:content-normal after:z-10 after:bottom-0 after:absolute after:w-3 after:h-3 after:rounded-full after:bg-icon after:right-0 after:border-[1.5px] after:border-white after:border-solid">
        <Image
          src="/images/avatar.png"
          height={48}
          width={48}
          alt="avatar"
          className="rounded-full object-cover w-12 h-12"
        />
      </div>
      <div className="grow">
        <p className="text-base">{props.primaryText}</p>
        <p className="text-base text-subtitle2">{props.secondaryText}</p>
      </div>
    </div>
  );
}

export const ScrollableList = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLUListElement>) => {
    return (
      <div className={`relative ${props.className}`}>
        <ul
          ref={ref}
          className="absolute scrollbar-thin scrollbar-track-transparent scrollbar-thumb-icon-back top-0 left-0 overflow-y-auto w-full h-full"
        >
          {props.children}
        </ul>
      </div>
    );
  }
);

ScrollableList.displayName = "ScrollableList";
