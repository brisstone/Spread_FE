import Image from "next/image";
import Checkbox from "./checkbox/index";
import Glass from "./glass";
import { ScrollableList } from "./list";
import IconButton from "./iconbutton";
import Card from "./card";

interface KanbanItemProps {
  title: string;
}

export function KanbanItem(props: KanbanItemProps) {
  return (
    <li className="mt-3 first:mt-0">
      <Glass className="flex flex-col px-3 py-5 min-h-[147px]">
        <div className="flex justify-between items-center">
          <p className="text-[16px] leading-[26px]">{props.title}</p>
          <Checkbox
            type="checkbox"
            id="design"
            name="design"
            // value={props.id}
            // className="translate-y-full"
            // {...props}
          />
        </div>

        {/* item body */}
        <div className="grow">{}</div>

        <div className="flex items-center gap-2">
          <Image
            src="/images/todocalendar.svg"
            height={20}
            width={20}
            alt="company profile image"
            className="rounded-full border border-solid border-white"
          />

          <Image
            src="/images/profilecompany.png"
            height={20}
            width={20}
            alt="company profile image"
            className="rounded-full border border-solid border-white"
          />
        </div>
      </Glass>
    </li>
  );
}

export function KanbanCard() {
  return (
    <Card className="flex grow flex-col p-5 !h-full basis-1/4">
    <div className="flex justify-between mb-10">
      <p className="text-[16px] leading-[26px]">Design</p>
      <div className="flex">
        <IconButton
          className="-mr-2"
          iconUrl="/images/plus.svg"
          width={15}
          height={15}
        />
        <IconButton
          iconUrl="/images/ellipse.svg"
          width={15}
          height={15}
        />
      </div>
    </div>

    <ScrollableList className="grow">
      <KanbanItem title="Ajouter Motion Design" />
      <KanbanItem title="Ajouter Motion Design" />
      <KanbanItem title="Ajouter Motion Design" />
      <KanbanItem title="Ajouter Motion Design" />
    </ScrollableList>
  </Card>
  );
}