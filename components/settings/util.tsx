import { HeaderSubtitle, Props } from "@/types/props";
import Button from "../button";

export function SettingsHeader(props: HeaderSubtitle) {
  return (
    <div className="">
      <p className="text-[30px] leading-[35px]">{props.header}</p>
      <p className="text-base text-obsec mt-2">{props.subtitle}</p>
    </div>
  );
}

export function SettingsTop(props: Props & HeaderSubtitle) {
  return (
    <div className="w-full flex justify-between">
      <SettingsHeader header={props.header} subtitle={props.subtitle} />
      <div className="flex gap-4">
        {props.children}
      </div>
    </div>
  );
}

export function GenericButtonGroup() {
  return (
    <>
      <Button className="!text-base">Enregistrer</Button>

      <Button className="!text-base bg-white text-black">Annuler</Button>
    </>
  );
}

export function Section(props: Props & { header: string; subtitle: string }) {
  return (
    <div className={`flex ${props.className}`}>
      <div className="w-1/5">
        <p className="text-base leading-5">{props.header}</p>
        <p className="text-base leading-5 text-obsec break-words">
          {props.subtitle}
        </p>
      </div>
      <div className="ml-10 grow lg:max-w-[50%]">{props.children}</div>
    </div>
  );
}
