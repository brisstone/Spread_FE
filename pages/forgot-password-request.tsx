import useSWR from "swr";
import { OutlinedInput } from "@/components/input";
import OnboardingDetail from "@/components/onboardingdetail";
import { usePost } from "@/hooks/apiHooks";
import { object } from "yup";
import { EmailSchema } from "@/util/schema";
import { useAlert } from "@/contexts/alert-context";
import { Form, FormikProvider } from "formik";
import { useRouter } from "next/router";
import Fetched from "@/components/fetched";

const Schema = object({
  email: EmailSchema,
});

export default function ForgotPassword() {
  const router = useRouter();
  const { pushAlert } = useAlert();

  const { data, isLoading, error } = useSWR<{ id: string; name: string }>(() =>
    router.query.id ? `/enterprise/check/${router.query.id}` : null
  );

  const initialValues = {
    email: "",
    enterpriseId: router.query.id,
  };

  const { formik } = usePost<null, typeof initialValues>({
    url: "/auth/password/forgot-request",
    enableReinitialize: true,
    initialValues,
    schema: Schema,
    onComplete: () => {
      router.push(`/${router.query.id}/check-email`);
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <OnboardingDetail
            imgSrc="/images/key.svg"
            h1="Mot de passe oublié ?"
            isSubmitting={isSubmitting}
            input={
              <OutlinedInput
                placeholder="Entrez votre adresse mail"
                className="mt-6 w-full"
                {...getFieldProps("email")}
                errorText={touched.email && errors.email}
              />
            }
            text1="Aucun problème."
            text2="Nous vous enverrons les instructions."
            btnText="🔒 Changer de mot de passe"
          />
        </Form>
      </FormikProvider>
    </>
  );
}
