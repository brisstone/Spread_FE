import { ButtonHTMLAttributes, FC, HTMLProps } from "react";
import { omit } from "lodash";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconUrl?: string;
  loading?: boolean;
  iconHeight?: number;
  iconWidth?: number;
  variant?: "primary" | "secondary";
}

export default function Button(props: ButtonProps) {
  const variant = props.variant || "primary";
  return (
    <button
      {...omit(props, ["iconUrl", "loading", "iconHeight", "iconWidth"])}
      disabled={props.loading || props.disabled}
      className={` ${
        variant === "secondary" ? "bg-white" : "bg-btn"
      } rounded-lg outline-none py-4 px-5 ${
        props.className
      } h-fit flex justify-center items-center ${
        variant === "secondary" ? "text-black" : "text-white"
      }`}
    >
      <span className="inline-flex gap-2 text-inherit items-center">
        {props.iconUrl && (
          <span>
            <Image
              src={props.iconUrl}
              height={props.iconHeight || 15}
              width={props.iconWidth || 15}
              alt="plus"
            />
          </span>
        )}
        <span className="leading-[18px] text-inherit">
          {props.loading ? (
            <ClipLoader
              color="#fff"
              loading={true}
              // cssOverride={{
              //   display: "block",
              // }}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            props.children
          )}
        </span>
      </span>
    </button>
  );
}

export function AddButton(props: ButtonProps & { text: string }) {
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
