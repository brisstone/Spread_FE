import { number, object, string } from "yup";
import { KeyedMutator, useSWRConfig } from "swr";
import { Form, FormikProvider } from "formik";
import Modal, { ModalProps } from "../modal";
import Input, { TextArea } from "../input";
import { usePost } from "@/hooks/apiHooks";
import { EmailSchema, UuidSchema } from "@/util/schema";
import { CRMLead, KanbanCategory, KanbanItem } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Button from "../button";
import UsersDropdown from "../users-dropdown";
import { EnterpriseRole } from "@/types/enum";

const Schema = object({
  title: string().required("Titre est requis"),
  description: string().optional(),
  assigneeId: UuidSchema,
  categoryId: UuidSchema,
});

export default function CreateKanbanItemModal(
  props: ModalProps & {
    categoryId: string;
    mutate: KeyedMutator<KanbanItem[][]>;
  }
) {
  const { pushAlert } = useAlert();

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<
    KanbanItem,
    {
      title: string;
      description: string;
      assigneeId: string;
      categoryId: string;
    }
  >({
    url: "/kanban/items",
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      assigneeId: "",
      categoryId: props.categoryId,
    },
    schema: Schema,
    onComplete: (data) => {
      if (props.mutate) {
        props.mutate((m) => {
          if (!m) return m;
          const newData = [...m];

          newData[0] = [data, ...newData[0]];
          return newData;
        });
      }
      props.handleClose();
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
  } = formik;

  return (
    <Modal open={props.open} handleClose={props.handleClose}>
      <FormikProvider value={formik}>
        <Form className="w- full" onSubmit={handleSubmit}>
          <Input
            header="Nom"
            placeholder="Nom"
            className="mt-2"
            smallerYPadding
            {...getFieldProps("title")}
            errorText={touched.title && errors.title}
          />

          <TextArea
            header="Description"
            placeholder="Entrez la description"
            className="grow mt-2"
            inputClassName="placeholder:text-white"
            {...getFieldProps("description")}
            errorText={touched.description && errors.description}
          />

          <UsersDropdown
            header="Cessionnaire"
            className="mt-2"
            roles={Object.values(EnterpriseRole)}
            {...getFieldProps("assigneeId")}
            // className="mt-2"
            errorText={touched.assigneeId && errors.assigneeId}
          />

          <Button className="mt-4 w-full" type="submit" loading={isSubmitting}>
            Ajouter
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
