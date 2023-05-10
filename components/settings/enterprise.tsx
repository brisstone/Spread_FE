import Image from "next/image";
import { Props } from "@/types/props";
import Input, { TextArea } from "../input";
import { Section, SettingsTop } from "./util";
import useSWR from "swr";
import Cookies from "js-cookie";
import { Enterprise } from "@/types/general";

export default function EnterpriseSettings() {
  const { data, isLoading, error } = useSWR<Enterprise>("/enterprise");

  return (
    <>
      <SettingsTop
        header="Informations d’entreprise"
        subtitle="Actualisez vos informations d’entreprise."
      />

      <div className="relative mt-11">
        {(isLoading || error) && (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {isLoading && "Chargement..."}
            {error && "Erreur lors du chargement des données !"}
          </p>
        )}
        {data && (
          <>
            <Section
              header="Profile Public"
              subtitle="Informations visibles par tous."
            >
              <Input
                name="Brief"
                placeholder="Nom de l’entreprise"
                value={data.name}
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
                placeholder="Details (Optionnel)"
                value={data.description || ""}
                className="grow"
              />
            </Section>
            <Section
              header="Logo"
              subtitle="Téléchargez votre Logo."
              className="mt-7"
            >
              <Image
                src="/images/logo.png"
                height={111}
                width={111}
                alt="Logo"
              />
            </Section>

            <Section
              header="Image de Marque"
              subtitle="Ajoutez votre logo dans vos factures et emails."
              className="mt-7"
            >
              <div className="flex items-center h-full">
                <label htmlFor="facture" className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="facture"
                    className="mt-[3px]"
                    checked={data.includeLogoInInvoice}
                  />
                  <div className="">
                    <p className="text-base leading-5">Facture</p>
                    <p className="text-base leading-5 text-dim-white2">
                      Inclure le logo dans les factures.
                    </p>
                  </div>
                </label>
                <label
                  htmlFor="facture"
                  className="flex items-start gap-2 ml-8"
                >
                  <input
                    type="checkbox"
                    id="logo-email"
                    className="mt-[3px]"
                    checked={data.includeLogoInEmail}
                  />
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
                {data.socials.map((social) => (
                  <Input
                    key={social}
                    name="Brief"
                    placeholder="URL"
                    value="stread.io/enterprise"
                    smallerYPadding
                  />
                ))}
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
          </>
        )}
      </div>
    </>
  );
}
