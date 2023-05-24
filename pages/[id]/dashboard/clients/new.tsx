import useSWR from "swr";
import { useRouter } from "next/router";
import { array, object } from "yup";
import Button from "@/components/button";
import Card from "@/components/card";
import Input, { TextArea } from "@/components/input";
import Layout from "@/components/layout";
import { usePost } from "@/hooks/apiHooks";
import { CRMLead, Client, User } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import { Form, FormikProvider } from "formik";
import { EmailSchema, RequiredSchema, UuidSchema } from "@/util/schema";
import { EnterpriseRole } from "@/types/enum";
import Select, { SelectOption } from "@/components/select";
import Fetched from "@/components/fetched";
import { getUserName } from "@/lib/util";
import useUserAndEnterprise from "@/data/user-user-enterprise";
import utilStyles from "@/styles/utils.module.css";
import UsersDropdown from "@/components/users-dropdown";

const Schema = object({
  name: RequiredSchema(),
  email: EmailSchema,
  brief: RequiredSchema(),
  invitationMessage: RequiredSchema(),
  team: array().of(UuidSchema),
  leadId: UuidSchema.optional(),
});

export default function NewClient() {
  const { pushAlert } = useAlert();

  const { enterprise } = useUserAndEnterprise();

  const router = useRouter();

  const leadId = router.query.leadId;

  const {
    data: lead,
    error,
    isLoading,
  } = useSWR<CRMLead>(() => (leadId ? `/crm/leads/${leadId}` : null));

  console.log("leadId", leadId);
  console.log("---------\nDATA\n----------\n", lead, error, isLoading);

  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useSWR<Pick<User, "id" | "email" | "firstName" | "lastName">[]>(
    `/enterprise/users?role=${EnterpriseRole.OPERATOR}`
  );

  const {
    // data: newClient,
    // error: formError,
    formik,
  } = usePost<
    Client,
    Pick<Client, "name" | "brief" | "email" | "invitationMessage"> & {
      team: [];
      leadId: string | undefined;
    }
  >({
    url: "/crm/clients",
    enableReinitialize: true,
    initialValues: {
      name: lead ? lead.name : "",
      email: lead ? lead.email : "",
      brief: "",
      invitationMessage: "",
      team: [],
      leadId: lead ? lead.id : undefined,
    },
    schema: Schema,
    onComplete: (data) => {
      console.log("data", data);
      router.push(`/${enterprise?.id}/dashboard/clients/${data.id}`);
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
    <Layout header="Nouveau Client ℹ️">
      <FormikProvider value={formik}>
        {error && (
          <p
            className={`text-base text-subtitle text-center ${utilStyles.absoluteCentered}`}
          >
            Aucun membre de l&apos;équipe n&apos;a été attaché à ce client
          </p>
        )}
        {isLoading && (
          <p
            className={`text-base text-subtitle text-center ${utilStyles.absoluteCentered}`}
          >
            Chargement...
          </p>
        )}
        {!error && !isLoading && (
          <Card className="px-11 py-8">
            <p className="text-[30px] leading-[35px]">Informations 👋</p>
            <p className="text-base mt-1">À propos de votre client</p>

            <Form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-nowrap gap-7 mt-7">
                <Input
                  header="Nom"
                  placeholder="Entrez le nom de votre client..."
                  className="grow"
                  inputClassName="placeholder:text-white"
                  {...getFieldProps("name")}
                  errorText={touched.name && errors.name}
                />

                {/* <Input
                header="Nom"
                placeholder="Entrez le nom de votre client..."
                className="grow"
                inputClassName="placeholder:text-white"
              /> */}
              </div>

              <div className="flex flex-nowrap gap-7 mt-12">
                <Input
                  header="Brief"
                  placeholder="Votre brief..."
                  className="grow"
                  inputClassName="placeholder:text-white"
                  {...getFieldProps("brief")}
                  errorText={touched.brief && errors.brief}
                />
              </div>

              <div className="flex flex-nowrap gap-7 mt-12">
                <UsersDropdown
                  header="AJOUTER DES MEMBRES D’ÉQUIPE"
                  roles={[EnterpriseRole.OPERATOR]}
                  {...getFieldProps("team")}
                  onChange={(e) => {
                    setFieldValue("team", [(e.target as any).value]);
                  }}
                  // className="mt-2"
                  // errorText={touched.team && errors.team}
                />

                <Input
                  header="INVITEZ VOTRE CLIENT"
                  placeholder="Adresse email du client"
                  className="grow"
                  inputClassName="placeholder:text-white"
                  {...getFieldProps("email")}
                  disabled={!!leadId}
                  value={leadId ? lead?.email || "" : formik.values.email}
                  errorText={touched.email && errors.email}
                />
              </div>

              <div className="flex flex-nowrap gap-7 mt-12">
                <TextArea
                  header="MESSAGE D’INVITATION"
                  placeholder="Votre message d’invitation..."
                  className="grow"
                  inputClassName="placeholder:text-white"
                  {...getFieldProps("invitationMessage")}
                  errorText={
                    touched.invitationMessage && errors.invitationMessage
                  }
                />
              </div>

              <div className="mt-12 flex gap-6">
                <Button
                  loading={isSubmitting}
                  type="submit"
                  iconUrl="/images/plus.svg"
                  className="shadow-none !text-base"
                >
                  Créer
                </Button>
              </div>
            </Form>
          </Card>
        )}
      </FormikProvider>
    </Layout>
  );
}
