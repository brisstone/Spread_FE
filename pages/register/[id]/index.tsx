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
import {
  EmailSchema,
  PasswordSchema,
  PersonnelSchema,
  ReferralSchema,
  RequiredSchema,
} from "@/util/schema";
import { setCookie, setCookieContext } from "@/lib";
import { useAlert } from "@/contexts/alert-context";
import useUserAndEnterprise from "@/data/user-user-enterprise";
import { useEffect, useState } from "react";
import useBaseUser from "@/data/use-base-user";
import { baseUserTokenId } from "@/types/enum";
import "react-notifications/lib/notifications.css";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  NotificationContainer,
  NotificationManager,
  //@ts-ignore
} from "react-notifications";
import { ref } from "yup";
import Link from "next/link";

const Schema = object({
  email: EmailSchema,
  password: PasswordSchema,
  referralCode: string().optional(),
  name: PersonnelSchema,
  confirmPassword: PasswordSchema.oneOf(
    [ref("password")],
    "Cela devrait correspondre à votre nouveau mot de passe"
  ),
});

// toast.info(`Vérifiez votre boîte de réception pour que l'OTP continue, et vérifiez également votre spam s'il n'est pas trouvé..`, {
//   position: "top-right",
//   autoClose: 2000000000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   draggable: false,
// });

export default function Signup() {
  const { user, enterprise, loggedOut } = useUserAndEnterprise();
  const { user: baseUser, loggedOut: baseLoggedOut } = useBaseUser();

  const router = useRouter();
  const { pushAlert } = useAlert();
  const { id } = router.query;

  const [referralCode, setreferralCode] = useState(id);


  useEffect(() => {}, [id, referralCode]);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    referralCode: referralCode || id,
  };

  const { data, error, formik } = usePost<
    {
      user: User;
      token: string;
      status: boolean;
      message: string;
    },
    typeof initialValues
  >({
    url: "/auth/register",
    initialValues,
    schema: Schema,
    modifyBefore: (values) => {
  
      values["referralCode"] = id
      

      return omit(values, ["confirmPassword"]);
    },
    onComplete: (data) => {
   

      if (data.status == false) {
        pushAlert(`${data.message}`);
        return;
      }

      // pushAlert("Vérifiez votre boîte de réception pour que l'OTP continue, et vérifiez également votre spam s'il n'est pas trouvé..");
      toast.info(`Vérifiez votre boîte de réception pour que l'OTP continue, et vérifiez également votre spam s'il n'est pas trouvé.`, {
        position: "top-right",
        autoClose: 2000000000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
      });

      setTimeout(() => {
        pushAlert("Vérifiez votre boîte de réception pour que l'OTP continue, et vérifiez également votre spam s'il n'est pas trouvé..",);

        router.push("/verify-email");
      }, 1000);
      setCookieContext(baseUserTokenId, data.token);
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
        <ToastContainer />
        <NotificationContainer />
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Bienvenue 👋</h1>
          {/* <p className="mt-5 text-sm">Entrez votre email pour continuer </p> */}
        </div>

        <div className="mt-7">
          <OnboardingGlass>
            {/* <h2 className="text-lg">Bienvenue</h2> */}

            {/* <Social /> */}

            <Form autoComplete="off" onSubmit={handleSubmit} className="w-full">
              <div className="w-[300px] flex flex-col gap-5">
                <Input
                  header="Prénom"
                  type="text"
                  placeholder="Prénom"
                  {...getFieldProps("name")}
                  errorText={touched.name && errors.name}
                />
                <Input
                  header="Email"
                  type="email"
                  // className="w-full"
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
                  errorText={touched.password && errors.password}
                />

                <Input
                  header="Confirmez le mot de passe"
                  type="password"
                  placeholder="Confirmez le mot de passe"
                  {...getFieldProps("confirmPassword")}
                  errorText={touched.confirmPassword && errors.confirmPassword}
                />
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                className="mt-6 w-full shadow-btn"
              >
                👉 Continuer
              </Button>
              <p className="mt-7 text-base">
                <span>Vous avez déjà un compte?</span>
                <span className="text-icon ml-0.5">
                  <Link href="/login">Connexion</Link>
                </span>
              </p>
            </Form>
          </OnboardingGlass>
        </div>
      </Onboarding>
    </FormikProvider>
    // </div>
  );
}
