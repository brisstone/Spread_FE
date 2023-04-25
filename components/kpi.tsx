import Image from "next/image";
import { IconCover } from "./icon";
import { Props } from "@/types/props";

export default function KPI(props: Props) {
  return (
    <div className={`p-5 min-w-[15rem] bg-gradient-kpi backdrop-blur-3xl border-none border-0 rounded-2xl border-transparent ${props.className}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-base text-subtitle">Aujourd’hui | C.A</p>
          <div className="flex gap-3">
            <p className="text-lg">$ 34,743</p>
            <p className="text-icon">+55%</p>
          </div>
        </div>

        <IconCover className="w-11 h-11 bg-btn">
          <Image
            src="/images/wallet.svg"
            height={22.5}
            width={22.5}
            alt="wallet icon"
          />
        </IconCover>
      </div>
    </div>
  );
}
