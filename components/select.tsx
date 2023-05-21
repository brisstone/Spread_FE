import { HTMLProps } from "react";
import utilStyles from "@/styles/utils.module.css";
import Glass from "./glass";
import { omit } from "lodash";

export default function Select(
  props: HTMLProps<HTMLSelectElement> & {
    header?: string;
    errorText?: string | false;
  }
) {
  return (
    <div className={`relative ${props.className}`}>
      {props.header && (
        <span className="text-base mb-[10px]">{props.header}</span>
      )}
      <Glass className="relative">
        <select
          {...omit(props, ["className"])}
          className={`bg-transparent w-full h-full rounded-2xl p-[10px] appearance-none outline-none`}
        >
          {props.children}
        </select>
      </Glass>
      {props.errorText && (
        <span className="text-xs text-red-400 break-words max-w-full">
          {props.errorText}
        </span>
      )}
    </div>
  );
}

export function SelectOption(props: HTMLProps<HTMLOptionElement>) {
  return (
    <option {...props} className="text-base appearance-none bg-btn rounded-lg">
      {props.children}
    </option>
  );
}
