import { FC, HTMLProps } from "react";
import utilStyles from "@/styles/utils.module.css";
import { Props } from "@/types/props";


type TextFieldProps = HTMLProps<HTMLInputElement>;

const OutlinedInput: FC<TextFieldProps> = (props) => {

  return (
    <div className="flex flex-col">
      <input {...props} className={`border-b-[0.5px] border-solid border-b-obsec filter bg-transparent outline-none px-2 py-4 placeholder:text-white ${props.className}`}/>
    </div>
  )
}

export default OutlinedInput;