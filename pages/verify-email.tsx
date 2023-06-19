import Background from "@/components/background";
import Button from "@/components/button";
import Input from "@/components/input";
import { useAlert } from "@/contexts/alert-context";
import { usePost } from "@/hooks/apiHooks";
import { setCookie, setCookieContext } from "@/lib";
import axiosHttp from "@/lib/axiosHttp";
import { StorageEnum, baseUserTokenId } from "@/types/enum";
import { User } from "@/types/general";
import axios from "axios";
import { Form, FormikProvider } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { config } from "process";
import { useEffect, useState } from "react";
import { object, string } from "yup";

const Schema = object({
  verificationCode: string().matches(/^\d+$/),
});

export default function VerifyEmail() {
  const router = useRouter();

  const { pushAlert } = useAlert();

  const { formik } = usePost<
    {
      user: User;
      token: string;
    },
    { verificationCode: string }
  >({
    url: "/auth/email/verify",
    initialValues: {
      verificationCode: "",
    },
    schema: Schema,
    onComplete: (data) => {
      const { user, token } = data;
      console.log(data)
      console.log('user', user);

      console.log('TOKEN from VERIFY', token);
      setCookieContext(baseUserTokenId, token);
      router.replace('/enterprises');
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  return (
    <Background>
      <FormikProvider value={formik}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Form onSubmit={formik.handleSubmit}>
            <Input
              header="OTP"
              placeholder="Entrez OTP"
              {...formik.getFieldProps("verificationCode")}
              errorText={formik.touched.verificationCode && formik.errors.verificationCode}
              className="w-full"
            />

            <Button
              type="submit"
              loading={formik.isSubmitting}
              className="mt-6 w-full shadow-btn"
            >
              Vérifier
            </Button>
          </Form>
        </div>
      </FormikProvider>
    </Background>
  );
}
