import { HTMLProps } from "react";
import { Radio } from "./checkbox";
import Glass from "./glass";
import { omit } from "lodash";

export default function GlassRadioInput(
  props: HTMLProps<HTMLInputElement> & {
    id: string;
    labelText: string;
    containerClassName?: string;
  }
) {
  return (
    <div className={props.containerClassName}>
      <label htmlFor={props.id} className="cursor-pointer">
        <Glass className="flex items-center py-3 px-6">
          <Radio {...omit(props, "labelText", "containerClassName")} />
          <p className="text-base ml-3">{props.labelText}</p>
        </Glass>
      </label>
    </div>
  );
}
