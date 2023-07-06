import useSWR from "swr";
import Button from "@/components/button";
import Input from "@/components/input";
import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import { useRouter } from "next/router";
import { usePost } from "@/hooks/apiHooks";
import { User } from "@/types/general";
import { object } from "yup";
import {
  EmailSchema,
  OAuthSchema,
  PasswordSchema,
  UuidSchema,
} from "@/util/schema";
import Cookies from "js-cookie";
import { Form, FormikProvider } from "formik";
import { useEffect, useState } from "react";
import { useAlert } from "@/contexts/alert-context";
import { setCookie, setCookieContext } from "@/lib";
import Link from "next/link";
import Fetched from "@/components/fetched";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Schema = object({
  email: EmailSchema,
  password: PasswordSchema,
  // enterpriseId: UuidSchema,
  oAuth: OAuthSchema,
});

export default function Login() {
  const router = useRouter();

  // const { data, isLoading, error } = useSWR<{ id: string; name: string }>(() =>
  //   router.query.id ? `/enterprise/check/${router.query.id}` : null
  // );

  const { email } = router.query;

  const [emailValid, setEmailValid] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState();

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
    {
      email: string;
      oAuth: string;
      password: string;
    }
  >({
    url: "/auth/login",
    enableReinitialize: true,
    initialValues: {
      email: (email as string | undefined) || "",
      password: "",
      oAuth: "",

      // enterpriseId: (router.query.id as string | undefined) || "",
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

  const response = (e: any) => {
    setUser(e);
    // pushAlert(e);
  };

  const errorResponse = (e: any) => {
    pushAlert(e?.message || e);
  };
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  // useEffect(() => {
  //   if (error && !data) {
  //     router.replace('/start');
  //   }
  // }, [error, data, router]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          //@ts-ignore
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              //@ts-ignore
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          const data: any = {
            //@ts-ignore
            email: res.data.email,
            password: "google",
            oAuth: "google",
          };

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login?auth=google`,
            data
          );

          setCookieContext(
            response.data.data.user.enterpriseId,
            response.data.data.token
          );
          router.replace(`/${response.data.data.user.enterpriseId}/dashboard`);

          // setProfile(res.data);
        })
        .catch((err) => {
          pushAlert(err?.response?.data?.message || err?.message);
        });
    }
  }, [user]);

  if (!show) return <Onboarding />;

  return (
    // <div className="min-h-screen w-screen">
    <FormikProvider value={formik}>
      <Onboarding>
        {/* {!error && !isLoading && data ? ( */}
        <>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">Bienvenue 👋</h1>
            <p className="mt-5 text-sm">
              Commencez votre période d’essai de 14 Jours
            </p>
          </div>

          <div className="mt-7">
            <OnboardingGlass>
              <h2 className="text-lg">Connectez-vous avec</h2>

              <Social success={response} authError={errorResponse} />

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
                  {/* <Link href={`/${data.id}/forgot-password`}>
                      Mot de passe oublié?
                    </Link> */}
                </p>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="mt-6 w-full shadow-btn"
                >
                  👉 Connexion
                </Button>
              </Form>
              <p className="mt-7 text-base">
                <span>Vous n’avez pas de compte?</span>
                <span className="text-icon ml-0.5">
                  <Link href="/register/1">Inscrivez-vous</Link>
                </span>
              </p>
              <p className="mt-7 text-base">
                <span>Vous avez oublié votre mot de passe ?</span>
                <p>
                  <span className="text-icon ml-0.5">
                    <Link href="/forgot-password-request">
                      Réinitialiser le mot de passe
                    </Link>
                  </span>
                </p>
              </p>
            </OnboardingGlass>
          </div>
        </>
        {/* ) : (
          <p className="text-lg">
            {error && "Échec de la récupération des données de l'organisation"}
            {isLoading && "Chargement..."}
          </p>
        )} */}
      </Onboarding>
    </FormikProvider>
    // </div>
  );
}
