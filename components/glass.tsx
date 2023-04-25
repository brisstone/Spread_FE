import { FC, ReactElement } from "react";
import utilStyles from "../styles/utils.module.css";
import { Props } from "@/types/props";

const Glass: FC<Props & { className?: string }> = (props) => {
  return (
    // <div className="p-0.5 bg-red-50">
      <div className={`${utilStyles.glass} ${props.className}`}>
        {props.children}
      </div>
    // </div>
  );
};

export default Glass;
