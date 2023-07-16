import { number, object, string } from "yup";
import { useSWRConfig } from "swr";
import { Form, FormikProvider } from "formik";
import Modal, { ModalProps } from "../modal";
import Input from "../input";
import { usePost } from "@/hooks/apiHooks";
import { EmailSchema, UuidSchema } from "@/util/schema";
import { CRMLead, KanbanCategory } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Button from "../button";

const Schema = object({
  name: string().required("Nom est requis"),
  id: string().optional(),
});

export default function EditCRMCategoryModal(
  props: ModalProps & {
    name: string;
    id: string;
  }
) {
  const { pushAlert } = useAlert();
  const { mutate } = useSWRConfig();

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<
    KanbanCategory,
    {
      name: string;
      id: string;
    } 
  >({
    // `${props.isEdit? "/kanban/categories/edit": "/kanban/categories"}`
    url: "/crm/categories/edit",
    enableReinitialize: true,
    initialValues: {
      name: props?.name,
      id: props.id,
    },
    schema: Schema,
    onComplete: (data) => {
      mutate("/crm/categories");

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
        <Form className="w- full" onSubmit={handleSubmit}>
          <Input
            placeholder="Nom"
            className="mt-2"
            smallerYPadding
            {...getFieldProps(`name`)}
            errorText={touched.name && errors.name}
          />
          <Button className="mt-4 w-full" type="submit" loading={isSubmitting}>
            Modifier
          </Button>
        </Form>
      </FormikProvider>
    </Modal>
  );
}
