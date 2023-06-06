import { FC, HTMLProps } from "react";
import { omit } from "lodash";
import utilStyles from "@/styles/utils.module.css";
import { Props } from "@/types/props";
import Glass from "./glass";

export interface TextFieldBaseProps {
  header?: string | JSX.Element;
  containerClassName?: string;
  smallerYPadding?: boolean;
  inputClassName?: string;
  errorText?: string | false;
}

type TextFieldProps = TextFieldBaseProps & HTMLProps<HTMLInputElement>;

const Input: FC<TextFieldProps> = (props) => {
  return (
    <div className={`flex flex-col ${props.className}`}>
      {props.header && (
        <span className="text-base mb-[10px]">{props.header}</span>
      )}
      <Glass className={props.containerClassName}>
        <input
          {...omit(props, ["inputClassName", "errorText", "smallerYPadding"])}
          className={`w-full bg-transparent text-base px-5 py-4 placeholder:text-subtitle placeholder:text-base outline-none ${
            props.smallerYPadding ? "py-[10px]" : ""
          } ${props.inputClassName}`}
        />
      </Glass>
      {props.errorText && (
        <span className="text-xs text-red-400 break-words max-w-full">
          {props.errorText}
        </span>
      )}
    </div>
  );
};

type TextAreaProps = TextFieldBaseProps & HTMLProps<HTMLTextAreaElement>;

export function TextArea(props: TextAreaProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      {props.header && (
        <span className="text-base mb-[10px]">{props.header}</span>
      )}
      <Glass className={props.containerClassName}>
        <textarea
          {...omit(props, ["inputClassName", "errorText"])}
          className={`w-full bg-transparent text-base px-5 py-4 placeholder:text-subtitle placeholder:text-base outline-none ${props.inputClassName}`}
        />
      </Glass>
      {props.errorText && (
        <span className="text-xs text-red-400 break-words max-w-full">
          {props.errorText}
        </span>
      )}
    </div>
  );
}

export const OutlinedInput: FC<TextFieldProps> = (props) => {
  return (
    <div className="flex flex-col">
      <input
        {...omit(props, ["inputClassName", "errorText"])}
        className={`border-b-[0.5px] border-solid border-b-obsec filter bg-transparent outline-none px-2 py-4 placeholder:text-white ${props.className}`}
      />
      {props.errorText && (
        <span className="text-xs text-red-400 break-words max-w-full mt-2">
          {props.errorText}
        </span>
      )}
    </div>
  );
};

export default Input;
