import useSWR from "swr";
import { object } from "yup";
import Button from "@/components/button";
import Card from "@/components/card";
import Input, { TextArea } from "@/components/input";
import Layout from "@/components/layout";
import { usePost } from "@/hooks/apiHooks";
import { Client } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";

const Schema = object({

})

  export default function NewClient() {
  const { pushAlert } = useAlert();

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<
    Client,
    Pick<Client, 'name'| 'brief'|'email'|'invitationMessage' >
  >({
    url: "/crm/clients",
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: '',
      brief: '',
      invitationMessage: '',
    },
    schema: Schema,
    onComplete: (data) => {

    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });
  return (
    <Layout header="Nouveau Client ℹ️">
      <Card className="px-11 py-8">
        <p className="text-[30px] leading-[35px]">Informations 👋</p>
            <p className="text-base mt-1">À propos de votre client</p>

        <div className="flex flex-nowrap gap-7 mt-7">
          <Input
            header="Nom"
            placeholder="Entrez le nom de votre client..."
            className="grow"
            inputClassName="placeholder:text-white"
          />

          <Input
            header="Nom"
            placeholder="Entrez le nom de votre client..."
            className="grow"
            inputClassName="placeholder:text-white"
          />
        </div>

        <div className="flex flex-nowrap gap-7 mt-12">
          <Input
            header="Brief"
            placeholder="Votre brief..."
            className="grow"
            inputClassName="placeholder:text-white"
          />
        </div>

        <div className="flex flex-nowrap gap-7 mt-12">
          <Input
            header="AJOUTER DES MEMBRES D’ÉQUIPE"
            placeholder="Séléctionner un membre"
            className="grow"
            inputClassName="placeholder:text-white"
          />

          <Input
            header="INVITEZ VOTRE CLIENT"
            placeholder="Adresse email du client"
            className="grow"
            inputClassName="placeholder:text-white"
          />
        </div>

        <div className="flex flex-nowrap gap-7 mt-12">
          <TextArea
            header="MESSAGE D’INVITATION"
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
