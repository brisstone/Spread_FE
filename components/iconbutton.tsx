import { Props } from "@/types/props";
import { omit } from "lodash";
import Image from "next/image";
import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLProps } from "react";

interface IconButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  iconUrl: string;
  width: number;
  height: number;
  edge?: "left" | "right";
}

export default function IconButton(props: IconButtonProps) {
  return (
    <button
      {...omit(props, ["iconUrl", "width", "height", "edge"])}
      className={`flex justify-center items-center bg-transparent active:bg-active-icon p-2 rounded-full cursor-pointer ${
        (props.edge === "left" && "-ml-[50%]") ||
        (props.edge === "right" && "-mr-[50%]")
      } ${props.className}`}
    >
      <Image
        src={props.iconUrl}
        height={props.height}
        width={props.width}
        alt={props.iconUrl}
      />
    </button>
  );
}
