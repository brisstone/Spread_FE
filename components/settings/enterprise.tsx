import Image from "next/image";
import { Props } from "@/types/props";
import Input, { TextArea } from "../input";
import { SettingsTop } from "./util";

function Section(props: Props & { header: string; subtitle: string }) {
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

export default function EnterpriseSettings() {
  return (
    <>
      <SettingsTop
        header="Informations d’entreprise"
        subtitle="Actualisez vos informations d’entreprise."
      />

      <div className="mt-11">
        <Section
          header="Profile Public"
          subtitle="Informations visibles par tous."
        >
          <Input
            name="Brief"
            placeholder="Nom de l’entreprise"
            value="Nom de l’entreprise"
            className="grow"
            smallerYPadding
            // inputClassName="placeholder:text-white"
          />
          <Input
            name="Brief"
            placeholder="URL"
            value="stread.io/enterprise"
            className="grow mt-4"
            smallerYPadding
          />
        </Section>
        <Section
          header="Description"
          subtitle="Description rapide de votre entreprise."
          className="mt-7"
        >
          <TextArea
            placeholder="URL"
            value="Détails (Optionnel)"
            className="grow"
          />
        </Section>
        <Section
          header="Logo"
          subtitle="Téléchargez votre Logo."
          className="mt-7"
        >
          <Image src="/images/logo.png" height={111} width={111} alt="Logo" />
        </Section>

        <Section
          header="Image de Marque"
          subtitle="Ajoutez votre logo dans vos factures et emails."
          className="mt-7"
        >
          <div className="flex items-center h-full">
            <label htmlFor="facture" className="flex items-start gap-2">
              <input type="checkbox" id="facture" className="mt-[3px]" />
              <div className="">
                <p className="text-base leading-5">Facture</p>
                <p className="text-base leading-5 text-dim-white2">
                  Inclure le logo dans les factures.
                </p>
              </div>
            </label>
            <label htmlFor="facture" className="flex items-start gap-2 ml-8">
              <input type="checkbox" id="facture" className="mt-[3px]" />
              <div className="">
                <p className="text-base leading-5">Facture</p>
                <p className="text-base leading-5 text-dim-white2">
                  Inclure le logo dans les factures.
                </p>
              </div>
            </label>
          </div>
        </Section>

        <Section
          header="Réseaux Sociaux"
          subtitle="Réseaux Sociaux"
          className="mt-7"
        >
          <div className="grid grid-cols-2 gap-x-7 gap-y-7">
            <Input
              name="Brief"
              placeholder="URL"
              value="stread.io/enterprise"
              smallerYPadding
            />
            <Input
              name="Brief"
              placeholder="URL"
              value="stread.io/enterprise"
              smallerYPadding
            />{" "}
            <Input
              name="Brief"
              placeholder="URL"
              value="stread.io/enterprise"
              smallerYPadding
            />
            <Input
              name="Brief"
              placeholder="URL"
              value="stread.io/enterprise"
              smallerYPadding
            />
          </div>
        </Section>
      </div>
    </>
  );
}
