import { number, object, string } from "yup";
import { useSWRConfig } from "swr";
import { Form, FormikProvider } from "formik";
import Modal, { ModalProps } from "../modal";
import Input from "../input";
import { usePost } from "@/hooks/apiHooks";
import { EmailSchema, UuidSchema } from "@/util/schema";
import { QuestionCategory, QuestionCategoryWithQuestions } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Button from "../button";

const Schema = object({
  name: string().required("Nom est requis"),
});

export default function QuestionCategoryModal(
  props: ModalProps
) {
  const { pushAlert } = useAlert();
  const { mutate } = useSWRConfig();

  const {
    // data: newClient,
    // error: formError,
    formik,
  } = usePost<
    QuestionCategory,
    {
      name: string;
    }
  >({
    url: "/crm/onboarding/question-categories",
    enableReinitialize: true,
    initialValues: {
      name: "",
    },
    schema: Schema,
    onComplete: (data) => {
      mutate("/crm/onboarding/questions", (existing: QuestionCategoryWithQuestions[] | undefined): QuestionCategoryWithQuestions[] => {
        if (!existing) return [{ ...data, questions: [] }];
        return [...existing, { ...data, questions: [] }];
      });
      if (props.handleClose) props.handleClose();
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
            header="Nom de la catégorie"
            placeholder="Entrez le nom"
            smallerYPadding
            {...getFieldProps(`name`)}
            errorText={touched.name && errors.name}
          />
          <Button className="mt-4 w-full" type="submit" loading={isSubmitting}>
            Ajouter
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
