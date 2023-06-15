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
import { useEffect, useState } from "react";
import { useAlert } from "@/contexts/alert-context";
import { setCookie, setCookieContext } from "@/lib";
import Link from "next/link";
import Fetched from "@/components/fetched";

const Schema = object({
  email: EmailSchema,
  password: PasswordSchema,
  enterpriseId: UuidSchema,
});

export default function Login() {
  const router = useRouter();

  const { data, isLoading, error } = useSWR<{ id: string; name: string }>(() =>
    router.query.id ? `/enterprise/check/${router.query.id}` : null
  );

  const { email } = router.query;

  const [emailValid, setEmailValid] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    EmailSchema.validate(email)
      .then(() => {
        setEmailValid(true);
        setShow(true);
      })
      .catch(() => {
        setEmailValid(false);
        setShow(true);
      });
  }, [email]);

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
      email: (email as string | undefined) || "",
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

  if (!show) return <Onboarding />;

  return (
    // <div className="min-h-screen w-screen">
    <FormikProvider value={formik}>
      <Onboarding>
        {!error && !isLoading && data ? (
          <>
            <div className="flex flex-col items-center">
              <h1 className="text-3xl">Bienvenue 👋</h1>
              <p className="mt-5 text-sm">
                Commencez votre période d’essai de 14 Jours
              </p>
            </div>

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
                    {!emailValid && (
                      <Input
                        header="Email"
                        placeholder="Votre email"
                        {...getFieldProps("email")}
                        errorText={touched.email && errors.email}
                        className="w-full"
                      />
                    )}
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
          </>
        ) : (
          <p className="text-lg">
            {error && "Échec de la récupération des données de l'organisation"}
            {isLoading && "Chargement..."}
          </p>
        )}
      </Onboarding>
    </FormikProvider>
    // </div>
  );
}
