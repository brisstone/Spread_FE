import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { IconCover } from "./icon";

interface NavItemProps {
  name: string;
  href: string;
  active?: boolean;
  svg: string;
}

export function NavItem(props: NavItemProps) {
  return (
    <li>
      <Link href={props.href} className="flex gap-4 px-4 py-3 items-center">
        <IconCover
          className={`w-7 h-7 ${props.active ? "bg-btn" : "bg-icon-back"}`}
        >
          {/* <props.svg height={15} width={15} className={`${props.active ? 'stroke-white' : 'stroke-icon'}`} /> */}
          <Image
            priority
            src={props.svg}
            height={15}
            width={15}
            alt="key"
          />
        </IconCover>

        <span>{props.name}</span>
      </Link>
    </li>
  );
}
