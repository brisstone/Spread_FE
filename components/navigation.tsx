import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { IconCover } from "./icon";

import CRMSvg from "@/public/images/nav/crm.svg";
import { useRouter } from "next/router";

interface NavItemProps {
  name: string;
  href: string;
  active?: boolean;
  exact?: boolean;
  svg: string;
  noActiveSvg?: boolean;
}

export function NavItem(props: NavItemProps) {
  const { asPath } = useRouter();

  const active =
    props.active ||
    (props.exact ? asPath === props.href : asPath.includes(props.href));

  return (
    <li className="truncate">
      <Link href={props.href} className="block px-4 py-3">
        <div className={`flex gap-4 items-center ${active ? 'px-4 py-3 bg-icon-back rounded-[15px]' : ''}`}>
          <IconCover
            className={`w-7 h-7 ${active ? "bg-btn" : "bg-icon-back"}`}
          >
            {/* <props.svg height={15} width={15} className={`${props.active ? 'stroke-white' : 'stroke-icon'}`} /> */}
            <Image
              priority
              src={`/images/nav/${
                active && !props.noActiveSvg ? `${props.svg}-active` : props.svg
              }.svg`}
              height={15}
              width={15}
              alt="key"
            />
          </IconCover>

          <span className="text-base">{props.name}</span>
        </div>
      </Link>
    </li>
  );
}
