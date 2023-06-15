import Button from "@/components/button";
import utilStyles from "@/styles/utils.module.css";
import Fetched from "@/components/fetched";
import Glass from "@/components/glass";
import Input from "@/components/input";
import Onboarding from "@/components/onboarding";
import useBaseUser from "@/data/use-base-user";
import { PasswordSchema, RequiredSchema } from "@/util/schema";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Form, FormikProvider, useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { object, ref } from "yup";
import { usePost } from "@/hooks/apiHooks";
import { useAlert } from "@/contexts/alert-context";
import { omit } from "lodash";
import { Enterprise, User } from "@/types/general";
import { setCookieContext } from "@/lib";
import useUser from "@/data/use-user";

const Schema = object({
  firstName: RequiredSchema(),
  lastName: RequiredSchema(),
  password: PasswordSchema,
  confirmPassword: PasswordSchema.oneOf(
    [ref("password")],
    "Cela devrait correspondre à votre nouveau mot de passe"
  ),
  enterpriseName: RequiredSchema(),
});

export default function CreateEnterprise() {
  const { user, error, isLoading } = useBaseUser();
  const router = useRouter();

  const { pushAlert } = useAlert();

  const initialValues = {
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    enterpriseName: "",
  };

  const { formik } = usePost<{
    enterprise: Enterprise,
    user: User,
    token: string,
  }, typeof initialValues>({
    url: "/enterprise",
    enableReinitialize: true,
    initialValues,
    schema: Schema,
    modifyBefore: (values) => {
      return omit(values, ["confirmPassword"]);
    },
    onComplete: (data) => {
      console.log("DATA", data);
      setCookieContext(data.enterprise.id, data.token);
      router.replace(`/plans`);
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Onboarding>
      <Fetched
        error={error}
        isLoading={isLoading}
        data={user}
        dataComp={(d) => (
          <FormikProvider value={formik}>
            <Glass>
              <div className="py-20 px-12 w-[452.5px]">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center items-center rounded-full w-14 h-14 bg-btn">
                    <Image
                      priority
                      src="/images/key.svg"
                      height={21}
                      width={21}
                      alt="key"
                    />
                  </div>

                  <div className="w-full">
                    <h1 className="text-3xl mt-6 text-center">
                      Créer une entreprise
                    </h1>
                  </div>

                  <div className="w-full"></div>

                  <div className="w-full">
                    <div className="w-full mt-6">
                      <Form onSubmit={handleSubmit}>
                        <Input
                          header="Nom de l'organisation"
                          className="w-full mt-5"
                          placeholder="Nom de l'organisation"
                          {...getFieldProps("enterpriseName")}
                          errorText={
                            touched.enterpriseName && errors.enterpriseName
                          }
                        />
                        <Input
                          header="Nom"
                          className="w-full mt-5"
                          placeholder="Votre nom"
                          {...getFieldProps("firstName")}
                          errorText={touched.firstName && errors.firstName}
                        />

                        <Input
                          header="Nom de famille"
                          className="w-full mt-5"
                          placeholder="Votre nom"
                          {...getFieldProps("lastName")}
                          errorText={touched.lastName && errors.lastName}
                        />

                        <Input
                          className="w-full mt-5"
                          header="Mot de passe"
                          type="password"
                          placeholder="Votre mot de passe"
                          {...getFieldProps("password")}
                          errorText={touched.password && errors.password}
                        />

                        <Input
                          className="w-full mt-5"
                          header="Confirmer le mot de passe"
                          type="password"
                          placeholder="Confirmer le mot de passe"
                          {...getFieldProps("confirmPassword")}
                          errorText={
                            touched.confirmPassword && errors.confirmPassword
                          }
                        />

                        <Button
                          loading={isSubmitting}
                          type="submit"
                          className="w-full mt-5"
                        >
                          Continue
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </Glass>
          </FormikProvider>
        )}
      />
    </Onboarding>
  );
}
