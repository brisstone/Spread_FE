import { HeaderSubtitle } from "@/types/props";
import Button from "../button";

export function SettingsHeader(props: HeaderSubtitle) {
  return (
    <div className="">
      <p className="text-[30px] leading-[35px]">{props.header}</p>
      <p className="text-base text-obsec mt-2">{props.subtitle}</p>
    </div>
  );
}

export function SettingsTop(props: HeaderSubtitle) {
  return (
    <div className="w-full flex justify-between">
      <SettingsHeader header={props.header} subtitle={props.subtitle} />
      <div className="flex gap-4">
        <Button className="!text-base">Enregistrer</Button>

        <Button className="!text-base bg-white text-black">Annuler</Button>
      </div>
    </div>
  );
}