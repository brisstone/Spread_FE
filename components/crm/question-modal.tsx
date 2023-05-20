import { number, object, string } from "yup";
import useSWR, { useSWRConfig } from "swr";
import { Form, FormikProvider } from "formik";
import Modal, { ModalProps } from "../modal";
import Input from "../input";
import { usePost } from "@/hooks/apiHooks";
import { EmailSchema, UuidSchema } from "@/util/schema";
import { CRMLead, QuestionCategory } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Button from "../button";
import { QuestionType } from "@/types/enum";
import Select, { SelectOption } from "../select";
import { capitalize } from "lodash";

const Schema = object({
  name: string().required("Nom est requis"),
  type: string().oneOf(Object.values(QuestionType)),
  categoryId: UuidSchema,
});

export default function QuestionModal(
  props: ModalProps
) {
  const { pushAlert } = useAlert();
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR<QuestionCategory[]>('/crm/onboarding/question-categories');

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<
    CRMLead,
    {
      name: string;
      type: QuestionType;
      categoryId: string;
    }
  >({
    url: "/crm/onboarding/questions",
    enableReinitialize: true,
    initialValues: {
      name: "",
      type: QuestionType.TEXT,
      // categoryId: props.categoryId,
    },
    schema: Schema,
    onComplete: (data) => {
      // mutate(
      //   `/crm/categories/${props.categoryId}/leads`,
      //   (existing: CRMLead[] | undefined): CRMLead[] => {
      //     if (!existing) return [data];
      //     return [...existing, data];
      //   }
      // );
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
            placeholder="Nom"
            className="mt-2"
            smallerYPadding
            {...getFieldProps(`name`)}
            errorText={touched.name && errors.name}
          />
          <Select {...getFieldProps("type")}>
            <SelectOption value="">Select</SelectOption>
            {Object.values(QuestionType).map((qt) => (
              <SelectOption key={qt} value={qt}>
                {capitalize(qt)}
              </SelectOption>
            ))}
          </Select>
          <Select {...getFieldProps("categoryId")}>
            <SelectOption value="">Select</SelectOption>
            {Object.values(QuestionType).map((qt) => (
              <SelectOption key={qt} value={qt}>
                {capitalize(qt)}
              </SelectOption>
            ))}
          </Select>
          <Button className="mt-4 w-full" type="submit">
            Ajouter
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
