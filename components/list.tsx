import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import { PropWithActive } from "@/types/props";

interface ListItemProps extends PropWithActive {
  primaryText: string;
  secondaryText: string;
}

export function ListItem(props: ListItemProps) {
  return (
    <div className={`flex gap-3 items-center px-5 py-4 ${props.active ? utilStyles.glass : ''}`}>
      <div className="flex relative after:content-normal after:z-10 after:bottom-0 after:absolute after:w-3 after:h-3 after:rounded-full after:bg-icon after:right-0 after:border-[1.5px] after:border-white after:border-solid">
        <Image src="/images/avatar.png" height={48} width={48} alt="avatar" className="rounded-full" />
      </div>
      <div className="grow">
        <p className="text-base">{props.primaryText}</p>
        <p className="text-base text-subtitle2">{props.secondaryText}</p>
      </div>
    </div>
  );
}
