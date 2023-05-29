import { ButtonHTMLAttributes, FC, HTMLProps } from "react";
import { omit } from "lodash";
import Image from "next/image";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconUrl?: string;
  loading?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...omit(props, ["iconUrl", "loading"])}
      disabled={props.loading}
      className={`bg-btn rounded-lg outline-none py-4 px-5 ${props.className} h-fit flex justify-center items-center`}
    >
      <span className="inline-flex gap-2 items-center">
        {props.iconUrl && (
          <span>
            <Image src={props.iconUrl} height={15} width={15} alt="plus" />
          </span>
        )}
        <span className="leading-[18px]">
          {props.loading ? "Chargement..." : props.children}
        </span>
      </span>
    </button>
  );
}

export function AddButton(props: ButtonProps & { text: string }) {
  console.log("props", props);
  return (
    <Button
      {...omit(props, ["text"])}
      className={`flex !p-0 flex-nowrap gap-2 !bg-transparent ${props.className}`}
      iconUrl="/images/squareplus.svg"
    >
      <span className="text-base">{props.text}</span>
    </Button>
  );
}
