import { HTMLProps } from "react";
import utilStyles from "@/styles/utils.module.css";
import Glass from "./glass";

export default function Select(props: HTMLProps<HTMLSelectElement>) {
  return (
    <Glass className="relative">
      <select {...props} className="bg-transparent w-full h-full rounded-2xl p-[10px] appearance-none outline-none">{props.children}</select>
    </Glass>
  );
}

export function SelectOption(props: HTMLProps<HTMLOptionElement>) {
  return <option {...props} className="text-base appearance-none bg-btn rounded-lg">{props.children}</option>;
}
