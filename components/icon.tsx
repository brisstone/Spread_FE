import { Props } from "@/types/props";

export function IconCover(props: Props) {
  return (
    <div
      className={`rounded-lg flex justify-center items-center ${props.className}`}
    >
      {props.children}
    </div>
  );
}
