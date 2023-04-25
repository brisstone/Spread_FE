import utilStyles from "@/styles/utils.module.css";
import { Props } from "@/types/props";

export default function Background(props: Props) {
  return (
    <>
      <div className={utilStyles.backgroundBase}>
        <div className={utilStyles.backgroundBlur}>
        </div>
      </div>
      {props.children}
    </>
  );
}