import Button from "@/components/button";
import utilStyles from "@/styles/utils.module.css";
import Fetched from "@/components/fetched";
import Glass from "@/components/glass";
import Input from "@/components/input";
import Onboarding from "@/components/onboarding";
import useBaseUser from "@/data/use-base-user";
import { RequiredSchema } from "@/util/schema";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Form, FormikProvider, useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { object } from "yup";
import useUser from "@/data/use-user";
import useUserAndEnterprise from "@/data/user-user-enterprise";
import { markSubscriptionAsActive } from "@/services";
import { ClipLoader } from "react-spinners";
import { Feedback } from "@/components/feedback";
import { getCookieContext } from "@/lib";

const Schema = object({
  name: RequiredSchema(),
});

export default function Checkout() {
  const { enterprise, error, isLoading } = useUserAndEnterprise();

  const [paymentError, setPaymentError] = useState<string | undefined>(
    undefined
  );

  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const { clientSecret, subscriptionId } = router.query;

  const [marking, setMarking] = useState<
    "pending" | "in-progress" | "failed" | "successful"
  >("pending");
  const [markingError, setMarkingError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Schema,
    onSubmit: async (values) => {
      if (!stripe || !elements || !enterprise || !subscriptionId) return;
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);
      // Use card Element to tokenize payment details

      let { error, setupIntent } = await stripe.confirmCardSetup(
        clientSecret as string,
        {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: values.name,
            },
          },
          // return_url: `${window.location.protocol}//${window.location.host}/checkout/confirm`,
        }
      );

      if (error) {
        console.log("payment error", error);
        // show error and collect new card details.
        setPaymentError(error.message);
        return;
      }

      if (setupIntent) {
        if (setupIntent.payment_method) {
          router.replace(`/${enterprise.id}/dashboard`);
        }
        // setMarking("in-progress");
        // markSubscriptionAsActive({
        //   subscriptionId: subscriptionId as string,
        //   enterpriseId: enterprise.id,
        // })
        //   .then((data) => {
        //     setMarking("successful");
        //     router.push(`/${enterprise.id}/dashboard`);
        //   })
        //   .catch((e) => {
        //     setMarking("failed");
        //     setMarkingError("");
        //   });
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  if (!stripe || !elements) {
    // Stripe.js has not loaded yet. Make sure to disable
    // form submission until Stripe.js has loaded.
    return "";
  }

  if (!clientSecret || !subscriptionId) {
    return "";
  }

  // const handleSubmit = async (e: any) => {

  // }

  return (
    <Onboarding>
      <Fetched
        error={error}
        isLoading={isLoading}
        data={enterprise}
        dataComp={(d) => (
          <FormikProvider value={formik}>
            {marking === "pending" ? (
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
                        Détails du paiement de l&apos;abonnement
                      </h1>
                      {/* <p className="mt-6 text-[16px] text-obsec text-center">
                <span className="leading-6">djodjsdj j</span>
                <br />
                <span>sids id0i0did</span>
              </p> */}
                    </div>

                    <div className="w-full"></div>

                    <div className="w-full">
                      <div className="w-full mt-6">
                        <Form onSubmit={handleSubmit}>
                          <Input
                            header="Nom"
                            className="w-full"
                            placeholder="Votre nom"
                            {...getFieldProps("name")}
                            errorText={touched.name && errors.name}
                          />

                          <div className="mt-5">
                            <CardElement
                              options={{
                                style: {
                                  base: {
                                    color: "#ffffff",
                                  },
                                },
                              }}
                              className={`${utilStyles.glass} px-5 py-4 !text-white`}
                            />
                            {paymentError && (
                              <div className="mt-5 w-full text-base bg-red-400 text-white p-5 rounded-lg">
                                <p className="text-center">{paymentError}</p>
                              </div>
                            )}
                            <Button
                              className="w-full shadow-btn2 mt-5"
                              type="submit"
                              loading={isSubmitting}
                              // onClick={props.onButtonClick}
                              // loading={props.isSubmitting}
                            >
                              👉 Commencer mes 14 jours gratuits
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </Glass>
            ) : (
              <>
                {marking === "in-progress" && (
                  <ClipLoader
                    color="#fff"
                    loading={true}
                    cssOverride={{
                      display: "block",
                    }}
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
                {marking === "failed" && (
                  <Feedback noAbsolute msg={markingError || ""} />
                )}
              </>
            )}
          </FormikProvider>
        )}
      />
    </Onboarding>
  );
}
