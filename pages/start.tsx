import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Button from "@/components/button";
import Input from "@/components/input";
import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import { usePost } from "@/hooks/apiHooks";
import { object, string } from "yup";
import { User } from "@/types/general";
import { Form, FormikProvider } from "formik";
import { omit } from "lodash";
import { EmailSchema, PasswordSchema } from "@/util/schema";
import { setCookie, setCookieContext } from "@/lib";
import { useAlert } from "@/contexts/alert-context";
import useUserAndEnterprise from "@/data/user-user-enterprise";
import { useEffect } from "react";
import useBaseUser from "@/data/use-base-user";
import { baseUserTokenId } from "@/types/enum";
import 'react-notifications/lib/notifications.css';

// import {NotificationContainer, NotificationManager} from 'react-notifications';




const Schema = object({
  email: EmailSchema,
});

const initialValues = {
  email: "",
  password : "",
  confirmpassword : "",
  personname : "",

};

export default function Signup() {
  const { user, enterprise, loggedOut } = useUserAndEnterprise();
  const { user: baseUser, loggedOut: baseLoggedOut } = useBaseUser();

  const router = useRouter();
  const { pushAlert } = useAlert();

  const { data, error, formik } = usePost<
    {
      user: User;
      token: string;
    },
    typeof initialValues
  >({
    url: "/auth/register",
    initialValues,
    schema: Schema,
    onComplete: (data) => {
      pushAlert("");
      
      setCookieContext(baseUserTokenId, data.token);
      router.replace("/verify-email");
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  useEffect(() => {
    if (!loggedOut && enterprise) {
      //   if (!baseLoggedOut) {
      //     router.replace('/enterprises');
      //   }
      // } else {
      if (enterprise) router.replace(`/${enterprise.id}/dashboard`);
    }
  }, [user, enterprise, router, loggedOut, baseLoggedOut, baseUser]);

  return (
    // <div className="min-h-screen w-screen">
    <FormikProvider value={formik}>
      <Onboarding>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Bienvenue 👋</h1>
          <p className="mt-5 text-sm">Entrez votre email pour continuer </p>
        </div>

        <div className="mt-7">
          <OnboardingGlass>
            {/* <h2 className="text-lg">Bienvenue</h2> */}

            {/* <Social /> */}

            <Form autoComplete="off" onSubmit={handleSubmit} className="w-full">
              <div className="w-[300px] flex flex-col gap-5">
              <Input
                  header="Mot de passe"
                  type="text"
                  placeholder="Nom" 
                  {...getFieldProps("personname")}
                />
                <Input
                  header="Email"
                  type="email"
                  className="w-full"
                  placeholder="Votre email"
                  {...getFieldProps("email")}
                  errorText={touched.email && errors.email}
                />
                {/* <Input name="Nom" placeholder="Prénom, Nom" /> */}

                <Input
                  header="Mot de passe"
                  type="password"
                  placeholder="Votre mot de passe"
                  {...getFieldProps("password")}
                />

                <Input
                  header="Mot de passe"
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  {...getFieldProps("confirmpassword")}
                />
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                className="mt-6 w-full shadow-btn"
              >
                👉 Continuer
              </Button>
            </Form>
          </OnboardingGlass>
        </div>
      </Onboarding>
    </FormikProvider>
    // </div>
  );
}
