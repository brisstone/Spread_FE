import { Props } from "@/types/props";
import { BaseHDivider } from "./divider";
import Glass from "./glass";
import Image from "next/image";
import Tag from "./tag";

interface ClientDetailGlassProps extends Props {
  title: string;
}

interface NoteGlassProps extends ClientDetailGlassProps {
  note: string;
}

function ClientDetailGlass(props: ClientDetailGlassProps) {
  return (
    <Glass className="p-5 mt-10 grow">
      <p className="text-[30px] leading-[35px]">{props.title}</p>
      <BaseHDivider className="mt-5" />
      {props.children}
    </Glass>
  );
}

export function NoteGlass(props: NoteGlassProps) {
  return (
    <ClientDetailGlass title={props.title}>
      <p className="text-base mt-5">{props.note}</p>
    </ClientDetailGlass>
  );
}

export function Team(props: Props) {
  return (
    <ClientDetailGlass title="Equipe - Client X">
      <div className="w-fit flex flex-col items-stretch">
        <div className="flex justify-between gap-[200px] mt-5">
          <p className="text-base">Profile</p>
          <p className="text-base">Statut</p>
        </div>

        {/* Team list */}
        <div className="flex items-center mt-5">
          <Image
            src="/images/profilecompany2.png"
            height={50}
            width={50}
            alt="avatar"
            className="rounded-full"
          />
          <div className="grow ml-5">
            <p className="text-base">Dylan Williams</p>
            <p className="text-[13px] leading-[19px]">@Mazal</p>
          </div>
          <Tag>Actif</Tag>
        </div>

        <div className="flex items-center py-5">
          <Image
            src="/images/profilecompany2.png"
            height={50}
            width={50}
            alt="avatar"
            className="rounded-full"
          />
          <div className="grow ml-5">
            <p className="text-base">Dylan Williams</p>
            <p className="text-[13px] leading-[19px]">@Mazal</p>
          </div>
          <Tag>Actif</Tag>
        </div>
      </div>
    </ClientDetailGlass>
  );
}
