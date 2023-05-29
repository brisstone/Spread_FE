import useSWR from "swr";
import Background from "@/components/background";
import { EnterpriseInvitation, User } from "@/types/general";
import Onboarding, { OnboardingGlass } from "@/components/onboarding";
import Fetched from "@/components/fetched";
import { Form, FormikProvider } from "formik";
import Input from "@/components/input";
import { usePost } from "@/hooks/apiHooks";
import {
  EmailSchema,
  PasswordSchema,
  RequiredSchema,
  UuidSchema,
} from "@/util/schema";
import { useAlert } from "@/contexts/alert-context";
import { object } from "yup";
import { useRouter } from "next/router";
import Button from "@/components/button";
import { setCookieContext } from "@/lib";

const Schema = object({
  id: UuidSchema,
  token: UuidSchema,
  firstName: RequiredSchema("Votre prénom est requis"),
  lastName: RequiredSchema("Votre nom de famille est requis"),
  password: PasswordSchema,
});

export default function Invitation() {
  const router = useRouter();
  const id = router.query.id;
  const token = router.query.token;
  const {
    data: inv,
    isLoading: invLoading,
    error: invError,
  } = useSWR<EnterpriseInvitation>(() =>
    id && token ? `/auth/invitation/check?id=${id}&token=${token}` : null
  );

  const { pushAlert } = useAlert();

  const initialValues = {
    id,
    token,
    firstName: "",
    lastName: "",
    password: "",
  };

  const {
    // data,
    // error: formError,
    formik,
  } = usePost<
    {
      user: User;
      token: string;
    },
    typeof initialValues
  >({
    url: "/auth/invitation/accept",
    enableReinitialize: true,
    initialValues,
    schema: Schema,
    onComplete: (data) => {
      setCookieContext(data.user.enterpriseId, data.token);
      router.replace(`/${data.user.enterpriseId}/dashboard`);
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Onboarding>
        <Fetched
          error={invError}
          isLoading={invLoading}
          data={inv}
          dataComp={(i) => (
            <>
              <div className="flex flex-col items-center mb-8">
                <h1 className="text-3xl">Bienvenue 👋</h1>
                <p className="mt-5 text-sm">
                  {`Vous avez été invité à rejoindre ${i.enterprise.name} sur Stread`}
                </p>
                <p className="mt-5 text-sm">
                  Veuillez entrer votre nom et votre mot de passe pour continuer
                  sur {i.enterprise.name}
                </p>
              </div>
              <OnboardingGlass>
                <Form
                  autoComplete="off"
                  // onSubmit={handleSubmit}
                  className="w-full"
                >
                  <Input
                    header="Prénom"
                    placeholder="Ton prénom"
                    {...getFieldProps("firstName")}
                    errorText={touched.firstName && errors.firstName}
                  />

                  <Input
                    header="Nom de famille"
                    className="mt-5"
                    placeholder="Votre nom de famille"
                    {...getFieldProps("lastName")}
                    errorText={touched.lastName && errors.lastName}
                  />

                  <Input
                    header="Mot de passe"
                    className="mt-5"
                    type="password"
                    placeholder="Votre mot de passe"
                    {...getFieldProps("password")}
                    errorText={touched.password && errors.password}
                  />

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="mt-6 w-full shadow-btn"
                  >
                    Continuer
                  </Button>
                </Form>
              </OnboardingGlass>
            </>
          )}
        />
      </Onboarding>
    </FormikProvider>
  );
}
