import { date, number, object, string } from "yup";
import { KeyedMutator, mutate, useSWRConfig } from "swr";
import { Form, FormikProvider } from "formik";
import Modal, { ModalProps } from "../modal";
import Input from "../input";
import { usePost } from "@/hooks/apiHooks";
import { RequiredSchema, UuidSchema } from "@/util/schema";
import { CRMLead, Task } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import Button from "../button";
import UsersDropdown from "../users-dropdown";
import { EnterpriseRole } from "@/types/enum";
import { swrInfiniteMutate } from "@/lib/util";

const Schema = object({
  title: RequiredSchema(),
  description: RequiredSchema(),
  assigneeId: RequiredSchema(),
  dueDate: string().optional(),
});

export default function CreateTodoModal(
  props: ModalProps & {
    mutate: KeyedMutator<Task[][]>;
  }
) {
  const { pushAlert } = useAlert();

  const { formik } = usePost<
    Task,
    {
      title: string;
      description: string;
      assigneeId: string;
      dueDate: string | undefined;
    }
  >({
    url: "/tasks",
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      assigneeId: "",
      dueDate: undefined,
    },
    schema: Schema,
    onComplete: (data) => {
      if (props.mutate)
        props.mutate((m) => {
          if (!m) return m;
          const newData = [...m];

          newData[0] = [data, ...newData[0]];
          return newData;
        });
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
        <Form className="w-full" onSubmit={handleSubmit}>
          <Input
            header="Title"
            placeholder="Title"
            smallerYPadding
            {...getFieldProps("title")}
            errorText={touched.title && errors.title}
          />
          <Input
            header="Description"
            placeholder="Description"
            className="mt-2"
            smallerYPadding
            {...getFieldProps("description")}
            errorText={touched.description && errors.description}
          />

          <Input
            header="Date limite"
            placeholder="Date limite"
            className="mt-2"
            smallerYPadding
            type="datetime-local"
            // {...getFieldProps("dueDate")}
            onChange={(e) => {
              setFieldValue(
                "dueDate",
                new Date((e.target as any).value).toISOString()
              );
            }}
          />

          <UsersDropdown
            header="Cessionnaire"
            className="mt-2"
            roles={[
              EnterpriseRole.OPERATOR,
              EnterpriseRole.LEAD,
              EnterpriseRole.ADMIN,
              EnterpriseRole.READER,
            ]}
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
