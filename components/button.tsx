import { ButtonHTMLAttributes, FC, HTMLProps } from "react";
import { omit } from "lodash";
import Image from "next/image";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconUrl?: string;
  loading?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...omit(props, ['iconUrl', 'loading'])}
      className={`bg-btn rounded-lg outline-none py-4 px-5 ${props.className} h-fit flex justify-center items-center`}
    >
      <span className="inline-flex gap-2 items-center">
        {props.iconUrl && (
          <span>
            <Image src={props.iconUrl} height={15} width={15} alt="plus" />
          </span>
        )}
        <span className="leading-[18px]">{props.loading ? 'Loading' : props.children}</span>
      </span>
    </button>
  );
}
