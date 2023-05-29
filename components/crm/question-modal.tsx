import { object, string } from "yup";
import useSWR from "swr";
import { Form, FormikProvider } from "formik";
import Modal, { ModalProps } from "../modal";
import Input from "../input";
import { usePost } from "@/hooks/apiHooks";
import { UuidSchemaFunc } from "@/util/schema";
import {
  QuestionCategoryWithQuestions,
  QuestionWithCategory,
} from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Button from "../button";
import { QuestionType } from "@/types/enum";
import Select, { SelectOption } from "../select";
import { capitalize, omit } from "lodash";
import Fetched from "../fetched";

const Schema = object({
  name: string().required("Nom est requis"),
  type: string().oneOf(Object.values(QuestionType)),
  categoryId: UuidSchemaFunc("Une catégorie de question est requise"),
});

export default function QuestionModal(props: ModalProps) {
  const { pushAlert } = useAlert();

  const { data, error, isLoading, mutate } = useSWR<
    QuestionCategoryWithQuestions[]
  >("/crm/onboarding/questions");

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<
    QuestionWithCategory,
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
      categoryId: "",
    },
    schema: Schema,
    onComplete: (data) => {
      mutate((existing) => {
        const copy = [...(existing || [])];
        const existingCategoryIndex = copy.findIndex(
          (c) => c.id === data.categoryId
        ); // category index in cache

        if (existingCategoryIndex < 0) { // if the question's category does not exist
          return [
            ...copy,
            { ...data.category, questions: [omit(data, ["category"])] }, // create an entry
          ];
        }

        // if it exists,
        copy[existingCategoryIndex] = {
          ...copy[existingCategoryIndex],
          questions: [
            ...copy[existingCategoryIndex].questions,
            omit(data, ["category"]), // add new data to the list of questions
          ],
        };

        return copy;
      });
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
            header="Question"
            placeholder="Saisir la question"
            className="mt-2"
            smallerYPadding
            {...getFieldProps(`name`)}
            errorText={touched.name && errors.name}
          />

          <Select
            header="Type d'entrée"
            {...getFieldProps("type")}
            className="mt-2"
            errorText={touched.type && errors.type}
          >
            <SelectOption value="">Select</SelectOption>
            {Object.values(QuestionType).map((qt) => (
              <SelectOption key={qt} value={qt}>
                {capitalize(qt)}
              </SelectOption>
            ))}
          </Select>

          <Select
            header="Catégorie"
            {...getFieldProps("categoryId")}
            className="mt-2"
            errorText={touched.categoryId && errors.categoryId}
          >
            <SelectOption value="">Select Category</SelectOption>
            <Fetched
              error={error}
              errorComp={
                <SelectOption value="">
                  Échec de la récupération des données
                </SelectOption>
              }
              isLoading={isLoading}
              isLoadingComp={
                <SelectOption value="">Chargement...</SelectOption>
              }
              data={data}
              dataComp={(categories) =>
                categories.length > 0 ? (
                  categories.map((c) => (
                    <SelectOption key={c.id} value={c.id}>
                      {capitalize(c.name)}
                    </SelectOption>
                  ))
                ) : (
                  <SelectOption value="">
                    Vous n&apos;avez pas encore créé de catégories de questions.
                  </SelectOption>
                )
              }
            />
          </Select>
          <Button className="mt-4 w-full" type="submit" loading={isSubmitting}>
            Ajouter
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
