import useSWR from "swr";
import { Props } from "@/types/props";
import Button from "./button";
import Card from "./card";
import IconButton from "./iconbutton";
import { CRMCategory, CRMLead } from "@/types/general";
import Fetched from "./fetched";
import { useState } from "react";
import Modal from "./modal";
import UsersList from "./users-list";
import Input from "./input";
import { usePost } from "@/hooks/apiHooks";
import { EmailSchema, UuidSchema } from "@/util/schema";
import { number, object, string } from "yup";
import { Form, FormikProvider } from "formik";
import { useAlert } from "@/contexts/alert-context";

interface CRMCardProps extends Props {
  data: CRMCategory;
}

const LeadSchema = object({
  email: EmailSchema,
  phoneNumber: string()
    .matches(/\d+/)
    .required("Le numéro de téléphone est requis"),
  name: string().required("Nom est requis"),
  amount: number().required("Le montant est requis"),
  categoryId: UuidSchema,
});

export default function CRMCard(props: CRMCardProps) {
  const { data, error, isLoading, mutate } = useSWR<CRMLead[]>(() =>
    props.data.id ? `/crm/categories/${props.data.id}/leads` : null
  );

  const { pushAlert } = useAlert();

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<CRMLead, {
    email: string,
    phoneNumber: string,
    name: string,
    amount: string,
    categoryId: string,
  }>({
    url: "/crm/leads",
    enableReinitialize: true,
    initialValues: {
      email: "",
      phoneNumber: "",
      name: "",
      amount: "",
      categoryId: props.data.id,
    },
    schema: LeadSchema,
    onComplete: () => {
      setModalOpen(false);
      mutate();
    },
    onError: (e) => {
      pushAlert(e.message);
    }
  });

  const [modalOpen, setModalOpen] = useState(false);

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  console.log(formik.values)

  return (
    <>
      <Modal open={modalOpen} handleClose={() => setModalOpen(false)}>
        <FormikProvider value={formik}>
          <Form className="w-full" onSubmit={handleSubmit}>
            <Input
              placeholder="E-mail"
              smallerYPadding
              {...getFieldProps(`email`)}
              errorText={touched.email && errors.email}
            />
            <Input
              placeholder="Nom"
              className="mt-2"
              smallerYPadding
              {...getFieldProps(`name`)}
              errorText={touched.name && errors.name}
            />
            <Input
              placeholder="Numéro de téléphoner"
              type="tel"
              className="mt-2"
              smallerYPadding
              {...getFieldProps(`phoneNumber`)}
              errorText={touched.phoneNumber && errors.phoneNumber}

            />
            <Input
              placeholder="Montant"
              className="mt-2"
              smallerYPadding
              type="number"
              {...getFieldProps(`amount`)}
              errorText={touched.amount && errors.amount}
            />
            <Button className="mt-4 w-full" type="submit">
              Ajouter
            </Button>
          </Form>
        </FormikProvider>
      </Modal>
      <Card className={`grow ${props.className}`}>
        <div className="p-5">
          <div className="flex w-full items-center gap-4 justify-between">
            <p className="text-[16px] leading-[20px]">{props.data.name}</p>
            <p className="text-base leading-[20px]">$10k (3 Leads)</p>
            <IconButton
              width={22}
              height={22}
              iconUrl="/images/threedots.svg"
            />
          </div>

          <div className="mt-8 w-full">
            <Fetched
              error={error}
              errorComp={
                <p className="text-base text-subtitle text-center">
                  Échec de la récupération des données
                </p>
              }
              isLoading={isLoading}
              isLoadingComp={
                <p className="text-base text-subtitle text-center">
                  Chargement...
                </p>
              }
              data={data}
              dataComp={(leads) => (
                <ul className="w-full">
                  {leads.length > 0 ? (
                    leads.map((l) => (
                      <li key={l.id} className="flex justify-between py-3">
                        <p className="text-[16px] leading-[20px]">{l.name}</p>
                        <Button className="shadow-none text-xs leading-[14px] py-[10px] px-6">
                          👉 Onboard
                        </Button>
                      </li>
                    ))
                  ) : (
                    <p className="text-base text-subtitle text-center">
                      Aucun prospect dans cette catégorie{" "}
                    </p>
                  )}
                </ul>
              )}
            />
          </div>

          <Button
            onClick={() => setModalOpen(true)}
            className="w-full bg-white text-black shadow-none mt-[18px]"
          >
            ✔️ Ajouter
          </Button>
        </div>
      </Card>
    </>
  );
}
