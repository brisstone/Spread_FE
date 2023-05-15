import { EnterpriseRole } from "@/types/enum";
import Input from "../input";
import Select, { SelectOption } from "../select";
import { Section, SettingsTop } from "./util";
import { array, object, string } from "yup";
import { usePost } from "@/hooks/apiHooks";
import { FieldArray, Form, FormikProvider } from "formik";

const Schema = array().of(
  object({
    email: string()
      .required("Email est requis")
      .email("L'e-mail doit être dans un format valide"),
  })
);
export default function Team() {
  const { data, error, formik } = usePost({
    url: "/auth/register",
    initialValues: {
      invites: [
        {
          email: "",
          role: "",
        },
      ],
    },
    schema: Schema,
    onComplete: (data) => {},
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

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
                    {/* {values.invites && values.invites.map((invite, index) => ( */}
                      
                    {/* ))} */}
                  </>
                )}
              />
              <div className="flex gap-6 grow mt-6 first:mt-0">
                <Input
                  name="Brief"
                  placeholder="Nom de l’entreprise"
                  value="judgegodwins@gmail.com"
                  className="grow"
                  smallerYPadding
                />
                <Select>
                  <SelectOption value="">Select</SelectOption>
                  <SelectOption value={EnterpriseRole.READER}>
                    Reader
                  </SelectOption>
                  <SelectOption value={EnterpriseRole.OPERATOR}>
                    Operator
                  </SelectOption>
                  <SelectOption value={EnterpriseRole.LEAD}>Lead</SelectOption>
                  <SelectOption value={EnterpriseRole.ADMIN}>
                    Admin
                  </SelectOption>
                </Select>
              </div>
            </Form>
          </Section>
        </div>
      </FormikProvider>
    </>
  );
}
