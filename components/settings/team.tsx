import { AlertType, EnterpriseRole } from "@/types/enum";
import Input from "../input";
import Select, { SelectOption } from "../select";
import { Section, SettingsTop } from "./util";
import { array, object, string } from "yup";
import { usePost } from "@/hooks/apiHooks";
import { FieldArray, Form, FormikProvider } from "formik";
import IconButton from "../iconbutton";
import Button from "../button";
import { useAlert } from "@/contexts/alert-context";

const Schema = object({
  invites: array().of(
    object({
      email: string()
        .required("Email est requis")
        .email("L'e-mail doit être dans un format valide"),
      role: string().required("Rôle est requis"),
    })
  ),
});

const initialValues = {
  email: "",
  role: "",
};

export default function Team() {
  const { pushAlert } = useAlert();
  const { data, error, formik } = usePost<
    any,
    { invites: (typeof initialValues)[] }
  >({
    url: "/enterprise/users/invite",
    initialValues: {
      invites: [initialValues],
    },
    schema: Schema,
    onComplete: (data) => {
      pushAlert('Votre invitation a été envoyée', AlertType.SUCCESS);
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  console.log("touched", touched, errors);

  return (
    <>
      <FormikProvider value={formik}>
        <SettingsTop
          header="Gestion d’équipe"
          subtitle="Actualisez vos informations d’entreprise."
        />

        <div className="mt-11">
          <Section
            header="Inviter des membres"
            subtitle="Accélérez vos projets en invitant votre équipe à collaborer."
          >
            <Form onSubmit={handleSubmit}>
              <FieldArray
                name="invites"
                render={(arrayHelpers) => (
                  <>
                    {values.invites &&
                      values.invites.map((invite, index) => (
                        <div className="flex grow mt-6 first:mt-0" key={index}>
                          <div className="flex gap-6 grow">
                            <Input
                              placeholder="E-mail"
                              className="grow"
                              smallerYPadding
                              {...getFieldProps(`invites[${index}].email`)}
                              // errorText={
                              //   touched.invites &&
                              //   touched.invites[index].email &&
                              //   errors.invites &&
                              //   (errors.invites[index] as any).email
                              // }
                            />
                            <Select
                              {...getFieldProps(`invites[${index}].role`)}
                            >
                              <SelectOption value="">Select</SelectOption>
                              <SelectOption value={EnterpriseRole.READER}>
                                Reader
                              </SelectOption>
                              <SelectOption value={EnterpriseRole.OPERATOR}>
                                Operator
                              </SelectOption>
                              <SelectOption value={EnterpriseRole.LEAD}>
                                Lead
                              </SelectOption>
                              <SelectOption value={EnterpriseRole.ADMIN}>
                                Admin
                              </SelectOption>
                            </Select>
                          </div>

                          <div className="flex gap-1">
                            <div
                              className="p-3 cursor-pointer"
                              onClick={() => {
                                if (index !== 0) arrayHelpers.remove(index);
                              }}
                            >
                              <span>x</span>
                            </div>
                            <IconButton
                              width={11}
                              height={11}
                              iconUrl="/images/plus.svg"
                              onClick={() => {
                                arrayHelpers.push(initialValues);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    <Button loading={isSubmitting} type="submit" className="!text-base mt-4">
                      + Inviter
                    </Button>
                  </>
                )}
              />
            </Form>
          </Section>
        </div>
      </FormikProvider>
    </>
  );
}
