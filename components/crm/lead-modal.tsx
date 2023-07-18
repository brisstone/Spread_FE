import { number, object, string } from "yup";
import { useSWRConfig } from "swr";
import { Form, FormikProvider } from "formik";
import Modal, { ModalProps } from "../modal";
import Input from "../input";
import { usePost } from "@/hooks/apiHooks";
import { EmailSchema, UuidSchema } from "@/util/schema";
import { CRMLead, LeadOnboarding } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Button from "../button";
import PhoneInput from "react-phone-input-2";
import utilStyles from "@/styles/utils.module.css";
import "react-phone-input-2/lib/style.css";
import Select, { SelectOption } from "../select";

const LeadSchema = object({
  email: EmailSchema,
  phoneNumber: string()
    .matches(/\d+/)
    .required("Le numéro de téléphone est requis"),
  name: string().required("Nom est requis"),
  amount: number().required("Le montant est requis"),
  categoryId: UuidSchema,
  status: string().optional(),
  // currencyId: UuidSchema,
});

export default function CRMLeadModal(
  props: ModalProps & { categoryId: string; lead: any }
) {
  const { pushAlert } = useAlert();
  const { mutate } = useSWRConfig();

  console.log(props.lead, "ddkfkkfk");

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
      status: string;
    }
  >({
    url: `${
      props?.lead?.status ? `/crm/leads/edit/${props.lead.id}` : "/crm/leads"
    }`,
    enableReinitialize: true,
    initialValues: {
      email: props?.lead?.email,
      phoneNumber: props?.lead?.phoneNumber,
      name: props.lead?.name,
      amount: props.lead?.amount,
      categoryId: props?.categoryId,
      status: props?.lead?.status,
      // currencyId: "",
    },
    schema: LeadSchema,
    onComplete: (data) => {
      mutate(
        `/crm/leads?categoryId=${props.categoryId}`,
        (existing: CRMLead[] | undefined): CRMLead[] => {
          if (!existing) return [data];
          return [...existing, data];
        }
      );
      if (props.handleClose) props.handleClose();
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  console.log(formError, "formErrorformError");

  const {
    errors,
    values,
    setFieldValue,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <Modal open={props.open} handleClose={props.handleClose}>
      <FormikProvider value={formik}>
        <Form className="w-full" onSubmit={handleSubmit}>
          <Input
            placeholder="Nom"
            className="mt-2"
            smallerYPadding
            {...getFieldProps(`name`)}
            errorText={touched.name && errors.name}
          />

          {!props?.lead?.status && (
            <Input
              placeholder="E-mail"
              smallerYPadding
              {...getFieldProps(`email`)}
              errorText={touched.email && errors.email}
            />
          )}

          {/* <Input
            placeholder="Numéro de téléphoner"
            type="tel"
            className="mt-2"
            smallerYPadding
            {...getFieldProps(`phoneNumber`)}
            errorText={touched.phoneNumber && errors.phoneNumber}
          /> */}
          <div className="mt-[5px]">
            {" "}
            <PhoneInput
              // disabled={disabled}

              country="fr"
              containerClass={`${utilStyles.glass} grow !z-[1] h-[47px]`}
              inputClass="!w-full py-[10px] !h-full !bg-transparent text-base px-5 py-4 placeholder:text-subtitle placeholder:text-base !outline-none !border-none"
              dropdownClass="!bg-[#1c1025] !z-50"
              buttonClass="!bg-transparent !border-none hover:bg-btn"
              // className="bg-transparent text-base px-5 py-[10px] placeholder:text-subtitle placeholder:text-base outline-none"
              placeholder="Enter phone number"
              value={values.phoneNumber}
              onChange={(v) => setFieldValue("phoneNumber", `+${v}`)}
            />
          </div>

          <Input
            placeholder="Montant"
            className="mt-2"
            smallerYPadding
            type="number"
            {...getFieldProps(`amount`)}
            errorText={touched.amount && errors.amount}
          />

          {props?.lead?.status && (
            <Select
              header="Status"
              {...getFieldProps(`status`)}
              errorText={touched.status && errors.status}
            >
              <SelectOption value="ongoing">ONGOING</SelectOption>
              <SelectOption value="lost">LOST</SelectOption>
              <SelectOption value="pending">PENDING</SelectOption>
            </Select>
          )}

          {/* <CurrenciesDropdown
            className="mt-2"
            errorText={touched.currencyId && errors.currencyId}
            {...getFieldProps("currencyId")}
          /> */}
          <Button className="mt-4 w-full" type="submit" loading={isSubmitting}>
            Ajouter
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
