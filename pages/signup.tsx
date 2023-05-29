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

const Schema = object({
  name: string()
    .required("Votre nom est requis")
    .matches(/\w+\s+\w+/, "Veuillez inclure votre nom et prénom"),
  email: EmailSchema,
  password: PasswordSchema,
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function Signup() {
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
    modifyBefore: (data) => {
      const [firstName, lastName] = data.name.split(/\s+/);
      return {
        ...omit(data, ["name"]),
        firstName,
        lastName,
      };
    },
    schema: Schema,
    onComplete: (data) => {
      setCookieContext('noent', data.token);
      router.replace("/verify-email");
    },
    onError: (e) => {
      pushAlert(e.message)
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    // <div className="min-h-screen w-screen">
    <FormikProvider value={formik}>
      <Onboarding>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Bienvenue 👋</h1>
          <p className="mt-5 text-sm">
            Commencez votre période d’essai de 14 Jours
          </p>
        </div>

        <div className="mt-7">
          <OnboardingGlass className="">
            <h2 className="text-lg">S’inscrire avec</h2>

            <Social />

            <Form autoComplete="off" onSubmit={handleSubmit}>
              <div className="flex flex-col mt-8 gap-5">
                <Input
                  header="Name"
                  placeholder="Prénom Nom"
                  className="w-full"
                  {...getFieldProps("name")}
                  errorText={touched.name && errors.name}
                />
                <Input
                  header="Email"
                  type="email"
                  className="w-full"
                  placeholder="Votre email"
                  {...getFieldProps("email")}
                  errorText={touched.email && errors.email}
                />
                <Input
                  header="Password"
                  type="password"
                  className="w-full"
                  placeholder="Votre mot de passe"
                  {...getFieldProps("password")}
                  errorText={touched.password && errors.password}
                />
                {/* <Input name="Nom" placeholder="Prénom, Nom" /> */}
              </div>

              <Button
                type="submit"
                className="mt-6 w-full"
                loading={isSubmitting}
              >
                👉 S’inscrire
              </Button>
            </Form>
          </OnboardingGlass>
        </div>
      </Onboarding>
    </FormikProvider>
    // </div>
  );
}
