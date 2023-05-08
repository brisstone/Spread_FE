import Button from "@/components/button";
import Card from "@/components/card";
import Input, { TextArea } from "@/components/input";
import Layout from "@/components/layout";

export default function Clients() {
  return (
    <Layout header="Nouveau Client ℹ️">
      <Card className="px-11 py-8">
        <p className="text-[30px] leading-[35px]">Informations 👋</p>
        <p className="text-base mt-1">À propos de votre client</p>

        <div className="flex flex-nowrap gap-7 mt-7">
          <Input
            name="Nom"
            placeholder="Entrez le nom de votre client..."
            className="grow"
            inputClassName="placeholder:text-white"
          />

          <Input
            name="Nom"
            placeholder="Entrez le nom de votre client..."
            className="grow"
            inputClassName="placeholder:text-white"
          />
        </div>

        <div className="flex flex-nowrap gap-7 mt-12">
          <Input
            name="Brief"
            placeholder="Votre brief..."
            className="grow"
            inputClassName="placeholder:text-white"
          />
        </div>

        <div className="flex flex-nowrap gap-7 mt-12">
          <Input
            name="AJOUTER DES MEMBRES D’ÉQUIPE"
            placeholder="Séléctionner un membre"
            className="grow"
            inputClassName="placeholder:text-white"
          />

          <Input
            name="INVITEZ VOTRE CLIENT"
            placeholder="Adresse email du client"
            className="grow"
            inputClassName="placeholder:text-white"
          />
        </div>

        <div className="flex flex-nowrap gap-7 mt-12">
          <TextArea
            name="MESSAGE D’INVITATION"
            placeholder="Votre message d’invitation..."
            className="grow"
            inputClassName="placeholder:text-white"
          />
        </div>

        <div className="mt-12 flex gap-6">
          <Button iconUrl="/images/plus.svg" className="shadow-none !text-base">
            Créer
          </Button>

          <Button className="shadow-none !text-base bg-white text-black">
          Annuler
          </Button>
        </div>
      </Card>
    </Layout>
  );
}
