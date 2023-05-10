import Input from "../input";
import { SettingsTop } from "./util";

export default function ChangePassword() {
  return (
    <>
      <SettingsTop
        header="Mot de Passe"
        subtitle="Modifiez votre mot de passe"
      />
      <div className="mt-11 lg:max-w-[75%]">
        <div className="flex w-full items-center gap-11">
          <p className="text-base">Mot de passe actuel</p>
          <Input
            header=""
            placeholder="Mot de passe actuel"
            smallerYPadding
            className="grow"
            // inputClassName="placeholder:text-white"
          />
        </div>
        <div className="flex mt-6 w-full items-center gap-11">
          <p className="text-base">Mot de passe actuel</p>
          <Input
            header=""
            placeholder="Mot de passe actuel"
            smallerYPadding
            className="grow"
            // inputClassName="placeholder:text-white"
          />
        </div>
        <div className="flex mt-6 w-full items-center gap-11">
          <p className="text-base">Mot de passe actuel</p>
          <Input
            header=""
            placeholder="Mot de passe actuel"
            smallerYPadding
            className="grow"
            // inputClassName="placeholder:text-white"
          />
        </div>
      </div>
    </>
  );
}
