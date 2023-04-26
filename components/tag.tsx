import { Props } from "@/types/props";

export default function Tag(props: Props) {
  return (
    <div className="py-0.5 px-2 rounded-[16px] bg-tag">
      <p className="text-[12px] leading-[18px] text-center">{props.children}</p>
    </div>
  );
}