import { Props } from "@/types/props";
import Image from "next/image";

interface IconButtonProps extends Props {
  iconUrl: string;
  width: number;
  height: number;
  edge?: 'left' | 'right';
}

export default function IconButton(props: IconButtonProps) {
  return (
    <button className={`flex justify-center items-center bg-transparent active:bg-active-icon p-2 rounded-full ${(props.edge === 'left' && '-ml-[50%]') || (props.edge === 'right' && '-mr-[50%]')} ${props.className}`}>
      <Image
        src={props.iconUrl}
        height={props.height}
        width={props.width}
        alt={props.iconUrl}
      />
    </button>
  );
}
