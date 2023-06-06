import utilStyles from "@/styles/utils.module.css";
import Image from "next/image";
import { ReactNode } from "react";
import IconButton from "../iconbutton";

export function DocumentItem(props: {
  primary: ReactNode;
  secondary: ReactNode;
  selected?: boolean;
  onClick: () => any;
  onDelete?: () => any;
}) {
  return (
    <li
      className={`${
        props.selected ? utilStyles.glass : ""
      } p-5 min-w-full mt-3 first:mt-0 cursor-pointer relative ${
        utilStyles.documentItemUtils
      }`}
      onClick={props.onClick}
    >
      <div className="flex">{props.primary}</div>

      <div className="mt-3">{props.secondary}</div>

      <IconButton
        onClick={props.onDelete}
        iconUrl="/images/bin.svg"
        width={10}
        height={10}
        className={`absolute bottom-2 right-5 z-50 ${utilStyles.bin}`}
      />
    </li>
  );
}

export function FolderName(props: { name: string; includeIcon?: boolean }) {
  return (
    <>
      {props.includeIcon && <FolderIcon />}
      <p
        className={`text-base ${
          props.includeIcon && "ml-3"
        } overflow-hidden whitespace-nowrap text-ellipsis`}
      >
        {props.name}
      </p>
    </>
  );
}

export function FolderIcon() {
  return (
    <Image
      src="/images/folder.svg"
      height={13.33}
      width={15}
      alt="folder-icon"
    />
  );
}
