import useSWR from "swr";
import Button from "@/components/button";
import Input from "@/components/input";
import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import { useRouter } from "next/router";
import { usePost } from "@/hooks/apiHooks";
import { User } from "@/types/general";
import { object } from "yup";
import { EmailSchema, PasswordSchema, UuidSchema } from "@/util/schema";
import Cookies from "js-cookie";
import { Form, FormikProvider } from "formik";
import { useEffect } from "react";
import { useAlert } from "@/contexts/alert-context";
import { setCookie, setCookieContext } from "@/lib";
import Link from "next/link";
import Fetched from "@/components/fetched";

const Schema = object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
});

export default function Login() {
  const router = useRouter();

  const { data, isLoading, error } = useSWR<{ id: string; name: string }>(() =>
    router.query.id ? `/enterprise/check/${router.query.id}` : null
  );

  const { pushAlert } = useAlert();

  const { formik } = usePost<
    {
      user: User;
      token: string;
    },
    { email: string; enterpriseId: string; password: string }
  >({
    url: "/auth/login",
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
      enterpriseId: (router.query.id as string | undefined) || "",
    },
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
    // <div className="min-h-screen w-screen">
    <FormikProvider value={formik}>
      <Onboarding>
        {!error && !isLoading && data ? (
          <div className="mt-7">
            <OnboardingGlass>
              <h2 className="text-lg">S’inscrire avec</h2>

              <Social />

              <Form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="w-full"
              >
                <div className="w-full flex flex-col mt-8 gap-5">
                  <Input
                    header="Email"
                    placeholder="Votre email"
                    {...getFieldProps("email")}
                    errorText={touched.email && errors.email}
                    className="w-full"
                  />
                  <Input
                    header="Mot de passe"
                    type="password"
                    placeholder="Votre mot de passe"
                    {...getFieldProps("password")}
                    errorText={touched.password && errors.password}
                  />
                  {/* <Input name="Nom" placeholder="Prénom, Nom" /> */}
                </div>

                <p className="text-icon text-base mt-4">
                  <Link href={`/${data.id}/forgot-password`}>
                    Mot de passe oublié?
                  </Link>
                </p>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="mt-6 w-full shadow-btn"
                >
                  👉 S’inscrire
                </Button>
              </Form>
              <p className="mt-7 text-base">
                <span>Vous n’avez pas de compte?</span>
                <span className="text-icon ml-0.5">
                  <Link href="/signup">Inscrivez-vous</Link>
                </span>
              </p>
            </OnboardingGlass>
          </div>
        ) : (
          <p className="text-lg">
            {error &&
              "Échec de la récupération des données de l&apos;organisation"}
            {isLoading && "Chargement..."}
          </p>
        )}
      </Onboarding>
    </FormikProvider>
    // </div>
  );
}
