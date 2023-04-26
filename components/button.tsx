import { ButtonHTMLAttributes, FC, HTMLProps } from "react";
import { omit } from "lodash";
import Image from "next/image";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconUrl?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...omit(props, ['iconUrl'])}
      className={`bg-btn rounded-lg outline-none py-4 px-5 ${props.className}`}
    >
      <span className="inline-flex gap-2 items-center">
        {props.iconUrl && (
          <span>
            <Image src="/images/plus.svg" height={15} width={15} alt="plus" />
          </span>
        )}
        <span>{props.children}</span>
      </span>
    </button>
  );
}
