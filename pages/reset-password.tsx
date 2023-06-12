import useSWR from "swr";
import Button from "@/components/button";
import Input from "@/components/input";
import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import { useRouter } from "next/router";
import { usePost } from "@/hooks/apiHooks";
import { User } from "@/types/general";
import { object, ref } from "yup";
import { EmailSchema, PasswordSchema, UuidSchema } from "@/util/schema";
import Cookies from "js-cookie";
import { Form, FormikProvider } from "formik";
import { useEffect } from "react";
import { useAlert } from "@/contexts/alert-context";
import { setCookie, setCookieContext } from "@/lib";
import Link from "next/link";
import Fetched from "@/components/fetched";
import { omit } from "lodash";

const Schema = object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema.oneOf(
    [ref("password")],
    "Cela devrait correspondre à votre nouveau mot de passe"
  ),
});

export default function ResetPassword() {
  const router = useRouter();

  const { uid, e, t } = router.query;

  const { data, isLoading, error } = useSWR<{ id: string; name: string }>(() =>
    uid && e && t
      ? `/auth/password/reset/check?userId=${uid}&enterpriseId=${e}&verificationCode=${t}`
      : null
  );

  const { pushAlert } = useAlert();

  const initialValues = {
    password: "",
    confirmPassword: "",
    userId: uid,
    enterpriseId: e,
    verificationCode: t,
  };

  const { formik } = usePost<undefined, typeof initialValues>({
    url: "/auth/password/reset",
    enableReinitialize: true,
    initialValues,
    schema: Schema,
    modifyBefore: (data) => {
      return omit(data, ["confirmPassword"]);
    },
    onComplete: () => {
      router.push(`${e}/password-changed`);
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    // <div className="min-h-screen w-screen">
    <Onboarding>
      <Fetched
        error={error}
        isLoading={isLoading}
        data={data}
        dataComp={() => (
          <FormikProvider value={formik}>
            <div className="mt-7">
              <OnboardingGlass>
                <h2 className="text-lg">Réinitialisez votre mot de passe</h2>

                <Form
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  className="w-full"
                >
                  <div className="w-full flex flex-col mt-8 gap-5">
                    <Input
                      header="Mot de passe"
                      type="password"
                      placeholder="Votre mot de passe"
                      {...getFieldProps("password")}
                      errorText={touched.password && errors.password}
                    />

                    <Input
                      header="Confirmez le mot de passe"
                      type="password"
                      placeholder="Retaper le mot de passe"
                      {...getFieldProps("confirmPassword")}
                      errorText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                    {/* <Input name="Nom" placeholder="Prénom, Nom" /> */}
                  </div>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="mt-6 w-full shadow-btn"
                  >
                    Réinitialiser le mot de passe
                  </Button>
                </Form>
                {/* <p className="mt-7 text-base">
                <span>Vous n’avez pas de compte?</span>
                <span className="text-icon ml-0.5">
                  <Link href="/signup">Inscrivez-vous</Link>
                </span>
              </p> */}
              </OnboardingGlass>
            </div>
          </FormikProvider>
        )}
      />
    </Onboarding>
  );
}
