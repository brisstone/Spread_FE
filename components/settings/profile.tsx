import Image from "next/image";
import Input from "../input";
import { SettingsTop } from "./util";
import Button from "../button";

export default function ProfileSettings() {
  return (
    <>
      <SettingsTop
        header="Informations Personnelles"
        subtitle="Actualiser vos informations du’personnelle."
      />
      <div className="flex mt-12 gap-14 lg:max-w-[75%]">
        <div className="relative h-fit">
          <Image
            src="/images/profilecompany2.png"
            height={108}
            width={108}
            alt="avatar"
            className="rounded-full"
          />
          <div className="absolute -bottom-4 -right-7 cursor-pointer bg-btn w-10 h-10 flex justify-center items-center rounded-full">
            <Image
              src="/images/edit.svg"
              height={12}
              width={12}
              alt="edit icon"
            />
          </div>
        </div>
        <div className="grow">
          <div className="grid grid-cols-2 gap-5">
            <Input
              header="Prénom"
              placeholder="Prénom"
              value="Prénom"
              className="grow"
              smallerYPadding
            />
            <Input
              header="Nom"
              placeholder="Nom"
              value="Nom"
              smallerYPadding
              // inputClassName="placeholder:text-white"
            />
            <Input
              header="Nom d’utilisateur"
              placeholder="Nom d’utilisateur"
              value="Nom d’utilisateur"
              smallerYPadding
              // inputClassName="placeholder:text-white"
            />

            <Input
              header="Email"
              placeholder="Emailr"
              value="Email"
              smallerYPadding
              // inputClassName="placeholder:text-white"
            />
          </div>

          <div className="grid mt-16 grid-cols-2 gap-5">
            <Input
              header="Prénom"
              placeholder="Prénom"
              value="Prénom"
              className="grow"
              smallerYPadding
            />
            <Input
              header="Prénom"
              placeholder="Prénom"
              value="Prénom"
              className="grow"
              smallerYPadding
            />
            <Input
              header="Prénom"
              placeholder="Prénom"
              value="Prénom"
              className="grow"
              smallerYPadding
            />
            <Input
              header="Prénom"
              placeholder="Prénom"
              value="Prénom"
              className="grow"
              smallerYPadding
            />
            <Input
              header="Prénom"
              placeholder="Prénom"
              value="Prénom"
              className="grow"
              smallerYPadding
            />
            <Input
              header="Prénom"
              placeholder="Prénom"
              value="Prénom"
              className="grow"
              smallerYPadding
            />
            <Input
              header="Prénom"
              placeholder="Prénom"
              value="Prénom"
              className="grow"
              smallerYPadding
            />
            <Input
              header="Prénom"
              placeholder="Prénom"
              value="Prénom"
              className="grow"
              smallerYPadding
            />
          </div>
        </div>
      </div>

      <Button className="bg-dim-white3 w-fit text-black mt-14">Déconnexion</Button>
    </>
  );
}
