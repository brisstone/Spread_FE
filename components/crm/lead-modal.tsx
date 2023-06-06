import { number, object, string } from "yup";
import { useSWRConfig } from "swr";
import { Form, FormikProvider } from "formik";
import Modal, { ModalProps } from "../modal";
import Input from "../input";
import { usePost } from "@/hooks/apiHooks";
import { EmailSchema, UuidSchema } from "@/util/schema";
import { CRMLead } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Button from "../button";

const LeadSchema = object({
  email: EmailSchema,
  phoneNumber: string()
    .matches(/\d+/)
    .required("Le numéro de téléphone est requis"),
  name: string().required("Nom est requis"),
  amount: number().required("Le montant est requis"),
  categoryId: UuidSchema,
});

export default function CRMLeadModal(
  props: ModalProps & { categoryId: string }
) {
  const { pushAlert } = useAlert();
  const { mutate } = useSWRConfig();

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<
    CRMLead,
    {
      email: string;
      phoneNumber: string;
      name: string;
      amount: string;
      categoryId: string;
    }
  >({
    url: "/crm/leads",
    enableReinitialize: true,
    initialValues: {
      email: "",
      phoneNumber: "",
      name: "",
      amount: "",
      categoryId: props.categoryId,
    },
    schema: LeadSchema,
    onComplete: (data) => {
      mutate(
        `/crm/categories/${props.categoryId}/leads`,
        (existing: CRMLead[] | undefined): CRMLead[] => {
          if (!existing) return [data];
          return [...existing, data];
        }
      );
      props.handleClose();
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Modal open={props.open} handleClose={props.handleClose}>
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
          <Button className="mt-4 w-full" type="submit" loading={isSubmitting}>
            Ajouter
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
}