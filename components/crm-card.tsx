import { Props } from "@/types/props";
import Button from "./button";
import Card from "./card";
import IconButton from "./iconbutton";

export default function CRMCard(props: Props) {
  return (
    <Card className={`grow ${props.className}`}>
      <div className="p-5">
        <div className="flex w-full items-center gap-4 justify-between">
          <p className="text-[16px] leading-[20px]">Prospects</p>
          <p className="text-base leading-[20px]">$10k (3 Leads)</p>
          <IconButton width={22} height={22} iconUrl="/images/threedots.svg" />
        </div>

        <div className="mt-8 w-full">
          <ul className="w-full">
          <li className="flex justify-between py-3">
              <p className="text-[16px] leading-[20px]">Lorenzo</p>
              <Button className="shadow-none text-xs leading-[14px] py-[10px] px-6">👉 Onboard</Button>
            </li>

            <li className="flex justify-between py-3">
              <p className="text-[16px] leading-[20px]">Lorenzo</p>
              <Button className="shadow-none text-xs leading-[14px] py-[10px] px-6">👉 Onboard</Button>
            </li>
          </ul>
        </div>

        <Button className="w-full bg-white text-black shadow-none mt-[18px]">✔️ Ajouter</Button>
      </div>
    </Card>
  );
}
