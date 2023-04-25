import { FC, HTMLProps } from "react";
import { Props } from "@/types/props";

const Button: FC<Props> = (props) => {

  return (
    <button className={`bg-btn rounded-lg outline-none py-4 px-5 shadow-btn ${props.className}`}>
      {props.children}
    </button>
  )
}

export default Button;