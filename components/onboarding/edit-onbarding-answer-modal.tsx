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
import PhoneInput from "react-phone-input-2";
import utilStyles from "@/styles/utils.module.css";
import "react-phone-input-2/lib/style.css";

const LeadSchema = object({
  // email: EmailSchema,
  // phoneNumber: string()
  //   .matches(/\d+/)
  //   .required("Le numéro de téléphone est requis"),
  answer: string().required("Nom est requis"),
  // amount: number().required("Le montant est requis"),
  onboardingId: string(),
  answerId: string(),
});

export default function EditOnBoardingAnswer(
  props: ModalProps & { onboardingId: string, answer: string, answerId: string, leadId: string }
) {

  console.log(props,'propsprops');
  
  const { pushAlert } = useAlert();
  const { mutate } = useSWRConfig();

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<
    CRMLead,
    {
      answer: string,
      onboardingId: string;
      answerId: string;
    }
  >({
    url: "/crm/onboarding/onboard/editAnswer",
    enableReinitialize: true,
    initialValues: {
      answer: props.answer,
      onboardingId: props.onboardingId,
      answerId: props.answerId,
    },
    schema: LeadSchema,
    onComplete: (data) => {

      console.log('kskkdkdk', data, props.onboardingId, props.leadId);
      
      mutate(
        `/crm/leads/${props.leadId}/onboard`,
        (existing: CRMLead[] | undefined): CRMLead[] => {
          if (!existing) return [data];
          console.log(data,'datadata', existing);
          return [{...data}];

        
          
        }
      );
      if (props.handleClose) props.handleClose();
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

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
          {/* <Input
            placeholder="E-mail"
            smallerYPadding
            {...getFieldProps(`email`)}
            errorText={touched.email && errors.email}
          /> */}
          <Input
            placeholder="Nom"
            className="mt-2"
            smallerYPadding
            {...getFieldProps(`answer`)}
            errorText={touched.answer && errors.answer}
          />
          {/* <Input
            placeholder="Numéro de téléphoner"
            type="tel"
            className="mt-2"
            smallerYPadding
            {...getFieldProps(`phoneNumber`)}
            errorText={touched.phoneNumber && errors.phoneNumber}
          /> */}
          {/* <div className="mt-[5px]">
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
          </div> */}

          {/* <Input
            placeholder="Montant"
            className="mt-2"
            smallerYPadding
            type="number"
            {...getFieldProps(`amount`)}
            errorText={touched.amount && errors.amount}
          /> */}
          {/* <CurrenciesDropdown
            className="mt-2"
            errorText={touched.currencyId && errors.currencyId}
            {...getFieldProps("currencyId")}
          /> */}
          <Button className="mt-4 w-full" type="submit" loading={isSubmitting}>
            Modifier
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
