import Background from "@/components/background";
import Button from "@/components/button";
import { usePost } from "@/hooks/apiHooks";
import axiosHttp from "@/lib/axiosHttp";
import { User } from "@/types/general";
import axios from "axios";
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

  const [e, setE] = useState(false);

  // const { data, error, formik } = usePost<{
  //   user: User;
  //   token: string;
  // }>({
  //   url: "/auth/email/verify",
  //   initialValues: {
  //     verificationCode: router.query.verification_code,
  //   },
  //   schema: Schema,
  //   onComplete: (data) => {
  //     console.log("data", data);
  //     Cookies.set("accessToken", data.token, {
  //       secure: true,
  //       sameSite: "strict",
  //     });
  //   },
  // });

  useEffect(() => {
    console.log(Cookies.get("verifyEmailToken"));
    axiosHttp
      .post<{
        data: {
          user: User;
          token: string;
        };
      }>("/auth/email/verify", {
        verificationCode: router.query.verification_code,
      })
      .then((resp) => {
        Cookies.set("accessToken", resp.data.data.token, {
          secure: true,
          sameSite: "strict",
        });
        router.push("/");
      })
      .catch(() => {
        setE(true);
      });
  }, [router]);

  return (
    <Background>
      <h1 className="text-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {!e
          ? "Verifying Email..."
          : "Something went wrong. Could not verify email"}
      </h1>
    </Background>
  );
}
