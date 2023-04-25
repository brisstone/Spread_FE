import { FC, HTMLProps } from "react";
import { omit } from 'lodash';
import utilStyles from "@/styles/utils.module.css";
import { Props } from "@/types/props";
import Glass from "./glass";

export interface TextFieldBaseProps {
  name?: string;
  containerClassName?: string;
  inputClassName?: string;
  helperText?: string | false;
  error?: boolean;
}

type TextFieldProps = TextFieldBaseProps & HTMLProps<HTMLInputElement>;

const Input: FC<TextFieldProps> = (props) => {
  return (
    <div className={`flex flex-col ${props.className}`}>
      {props.name && <span className="text-base mb-[10px]">{props.name}</span>}
      <Glass className={props.containerClassName}>
        <input
          {...(omit(props, ['inputClassName']))}
          className={`w-full bg-transparent text-base px-5 py-4 placeholder:text-subtitle placeholder:text-base outline-none ${props.inputClassName}`}
        />
      </Glass>
    </div>
  );
};

export default Input;
