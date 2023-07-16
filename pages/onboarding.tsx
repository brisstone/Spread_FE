import useSWR from "swr";
import Glass from "@/components/glass";
import Onboarding from "@/components/onboarding";
import {
  OnboardingDetail,
  LeadOnboarding,
  Question,
  User,
} from "@/types/general";
import Fetched from "@/components/fetched";
import { useRouter } from "next/router";
import Input from "@/components/input";
import Button from "@/components/button";
import { useState } from "react";
import { usePost } from "@/hooks/apiHooks";
import { array, object, ref } from "yup";
import { PasswordSchema, RequiredSchema } from "@/util/schema";
import { useAlert } from "@/contexts/alert-context";
import { Form, FormikErrors, FormikProvider } from "formik";
import { arrayError, setCookieContext } from "@/lib";
import { v4 as uuidv4 } from 'uuid';

const Schema = object({
  data: array()
    .of(
      array().of(
        object({
          question: RequiredSchema(),
          category: RequiredSchema(),
          answer: RequiredSchema(),
        })
      )
    )
    .required(),
  password: PasswordSchema,
  confirmPassword: PasswordSchema.oneOf(
    [ref("password")],
    "Cela devrait correspondre à votre nouveau mot de passe"
  ),
});

export default function ClientOnboarding() {
  const router = useRouter();

  const { pushAlert } = useAlert();

  const { onboardingId, e, token } = router.query;

  const { data, isLoading, error } = useSWR<OnboardingDetail>(() =>
    onboardingId && e && token
      ? `/crm/onboarding/details?id=${onboardingId}&enterpriseId=${e}&token=${token}`
      : null
  );

  console.log(data,'datadatadatadatadata');
  

  const [currentIndex, setCurrentIndex] = useState(0);

  const { formik } = usePost<
    { user: User; token: string },
    { data: LeadOnboarding["data"][]; password: ""; confirmPassword: "" }
  >({
    url: `/crm/onboarding/onboard?id=${onboardingId}&enterpriseId=${e}&token=${token}`,
    enableReinitialize: true,
    initialValues: {
      data: data
        ? data.questionCategories.reduce((a, b) => {
            return [
              ...a,
              b.questions.map((q, index) => ({
                category: b.name,
                question: q.name,
                answer: "",
                id: `AA_${index}_${b.name}`
              })),
            ];
          }, [] as LeadOnboarding["data"][])
        : [],
      password: "",
      confirmPassword: "",
    },
    schema: Schema,
    modifyBefore: (data) => {
      return {
        data: data.data.flat(),
        password: data.password,
      };
    },
    onComplete: (data) => {
      setCookieContext(data.user.enterpriseId, data.token);
      setTimeout(() => {
        router.replace(`/${data.user.enterpriseId}/dashboard`);
      }, 500);
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    validateForm,
  } = formik;

  return (
    <Onboarding>
      <Fetched
        error={error}
        isLoading={isLoading}
        data={data}
        dataComp={(d) => (
          <>
            <h2 className="text-xl text-center mb-10 max-w-[452.5px]">
              Bonjour, veuillez répondre à ces questions d&apos;intégration
            </h2>

            <Glass>
              <FormikProvider value={formik}>
                <Form className="w-full" onSubmit={handleSubmit}>
                  <div className="py-20 px-12 min-w-[452.5px] max-w-[452.5px]">
                    <h3 className="text-lg text-center">
                      {currentIndex < d.questionCategories.length
                        ? d.questionCategories[currentIndex].name
                        : "Détails de votre compte"}
                    </h3>
                    {currentIndex < d.questionCategories.length ? (
                      values.data[currentIndex] &&
                      values.data[currentIndex].map((q, i) => (
                        <Input
                          key={
                            d.questionCategories[currentIndex].questions[i].id
                          }
                          smallerYPadding
                          header={q.question}
                          placeholder="Veuillez entrer votre réponse"
                          className="mt-5"
                          {...getFieldProps(
                            `data[${currentIndex}][${i}].answer`
                          )}
                          errorText={(() => {
                            return (
                              errors.data &&
                              errors.data[currentIndex] &&
                              arrayError(
                                errors.data[currentIndex] as
                                  | string
                                  | string[]
                                  | FormikErrors<{
                                      category: string;
                                      question: string;
                                      answer: string;
                                    }>[],
                                i,
                                "answer"
                              )
                            );
                          })()}
                        />
                      ))
                    ) : (
                      <>
                        <Input
                          smallerYPadding
                          header="Mot de passe"
                          type="password"
                          placeholder="Entrer un mot de passe"
                          className="mt-5"
                          {...getFieldProps("password")}
                          errorText={touched.password && errors.password}
                        />

                        <Input
                          smallerYPadding
                          type="password"
                          header="Confirmez le mot de passe"
                          placeholder="Entrez à nouveau votre mot de passe"
                          className="mt-5"
                          {...getFieldProps("confirmPassword")}
                          errorText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                        />
                      </>
                    )}
                    <div className="w-full flex justify-between gap-4 items-center mt-10">
                      <Button
                        className="grow basis-1/2 bg-white !text-black"
                        onClick={() => {
                          if (currentIndex === 0) return;
                          setCurrentIndex((prev) => prev - 1);
                        }}
                      >
                        Précédent
                      </Button>
                      <Button
                        className="grow basis-1/2"
                        type={
                          currentIndex >= d.questionCategories.length
                            ? "submit"
                            : "button"
                        }
                        onClick={async () => {
                          console.log("clicked");
                          const e = await validateForm(values);

                          if (e.data && e.data[currentIndex]) {
                            console.log("ERRORS", e.data[currentIndex]);
                            return;
                          }
                          if (currentIndex >= d.questionCategories.length) {
                            console.log("submitting");
                            return;
                          }
                          setCurrentIndex((prev) => prev + 1);
                        }}
                      >
                        Suivant
                      </Button>
                    </div>
                  </div>
                </Form>
              </FormikProvider>
            </Glass>
          </>
        )}
      />
    </Onboarding>
  );
}
