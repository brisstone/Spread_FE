import { Props } from "@/types/props";

export default function Tag(props: Props) {
  return (
    <div className={`py-0.5 px-2 rounded-[16px] bg-tag w-fit text-[12px] leading-[18px] ${props.className}`}>
      <p className="text-center">{props.children}</p>
    </div>
  );
}