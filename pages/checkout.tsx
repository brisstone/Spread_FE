import React, { useState } from "react";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useUserAndEnterprise from "@/data/user-user-enterprise";
import Image from "next/image";
import Onboarding from "@/components/onboarding";
import Glass from "@/components/glass";
import Input from "@/components/input";
import Button from "@/components/button";
import { useRouter } from "next/router";
import { markSubscriptionAsActive } from "@/services";
import { useAlert } from "@/contexts/alert-context";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(null);
  const [issubmitting, setissubmitting] = useState(false);
  const { enterprise, error: errorEnt, isLoading } = useUserAndEnterprise();
  const [name, setName] = useState("");
  const [errorName, seterrorName] = useState("");
  const { pushAlert } = useAlert();

  const router = useRouter();

  const { clientSecret, subscriptionId, referralId, email } = router.query;


  const calculateAmountToCredit = () => {
    // Calculate and return the amount to be credited to the other customer
    // For example, if the payment is $100, the amount to be credited would be $10 (10% of $100)
    const paymentAmount = 100;
    const percentageToCredit = 0.1;
    const amountToCredit = paymentAmount * percentageToCredit;
    return amountToCredit;
  };

    //@ts-ignore
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.length == 0) {
      seterrorName("Le nom est requis!");
    }
    setissubmitting(true);
    console.log("ERRTTTS");
    if (!stripe || !elements) {
      setissubmitting(false);
      // Stripe.js has not loaded yet, handle error or show loading state
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    try {
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   type: "card",
      //   card: cardElement,

      //   billing_details: {
      //     name: name,
      //     postal_code: postalCode,
      //   },
      // });

      // if (error) {
      //   // Handle payment method creation error
      //   setissubmitting(false);
      //   setError(error.message);
      // } else {
      //   setissubmitting(false);
      //   // Payment method created successfully, proceed with further actions
      //   console.log(paymentMethod, "sdjjdjdjd");
      // }

      // const { setupIntent, error } = await stripe.confirmCardSetup(clientSecret as string, {
      //   payment_method: {
      //     card: cardElement,
      //     billing_details: {
      //       name: name,
      //       postal_code: postalCode,
      //     },
      //   },
      //   subscription_data: {
      //     // Apply coupon code
      //     coupon: 'REFERRAL_DISCOUNT',
      //   },
      // });

      // const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret as string, {
      //   payment_method: {
      //     card: cardElement,
      //     billing_details: {
      //       name: name,
      //       postal_code: postalCode,

      //     },
      //   },
      // payment_intent_data: {
      //   receipt_email: email,
      //   // Apply coupon code
      //   coupon: 'REFERRAL_DISCOUNT',
      // },
      // });

      // const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: cardElement,
      // });

      // if (paymentMethodError) {
      //   setError(paymentMethodError.message);
      //   return;
      // }

      // Confirm the setup of the payment method on the subscription
      // const { error: confirmError, setupIntent } = await stripe.confirmCardSetup(clientSecret as string, {
      //   payment_method: {
      //     card: cardElement,
      //     billing_details: {
      //       name: name,
      //       postal_code: postalCode,
      //       email: email
      //     },
      //   },
      //   // update: {
      //   //   coupon: 'REFERRAL_DISCOUNT',
      //   // },
      // });

      let { error, setupIntent } = await stripe.confirmCardSetup(
        clientSecret as string,
        {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: name,
            },
          },
        }
      );
      if (error) {
        setissubmitting(false);
        console.log("payment error", error);
        // show error and collect new card details.
        // setPaymentError(error.message);
        pushAlert(error.message);
        return;
      }

      console.log(setupIntent, "setupIntentsetupIntent");

      if (setupIntent) {
        setissubmitting(false);
        // setMarking("in-progress");
        router.push(`/${enterprise!.id}/dashboard`);

        // markSubscriptionAsActive({
        //   subscriptionId: subscriptionId as string,
        //   enterpriseId: enterprise!.id,
        // })
        //   .then(async(data) => {
        //     if (referralId !== "") {
        //       // Proceed with additional logic (e.g., create subscription, charge customer, etc.)

        //       // Calculate the amount to be credited to the other customer (10% of the payment)
        //       const amountToCredit = calculateAmountToCredit();

        //       // Create a transfer to credit the other customer
        //       //@ts-ignore
        //       const transfer = await stripe.transfers.create({
        //         amount: amountToCredit,
        //         currency: "usd",
        //         destination: referralId, // Replace with the Stripe account ID of the recipient
        //         description: 'Transfer from your Stripe account',
        //       });

        //       // Handle the transfer success
        //       console.log("Transfer successful!", transfer);
        //     }
        //     setissubmitting(false);
        //     // setMarking("successful");
        //     // router.push(`/${enterprise!.id}/dashboard`);
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //     pushAlert("failed");

        //     // setMarking("failed");
        //     // setMarkingError("");
        //   });
      }
    } catch (error) {
      setissubmitting(false);

      console.log(error, "jjjjj");

      // Handle any other errors during payment method creation
      pushAlert("An error occurred. Please try again later.");
      // setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Onboarding>
      <Glass>
        <div className="py-20 px-12 w-[452.5px]">
          <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="">
              <div className="flex justify-center items-center">
                {" "}
                <div className="flex justify-center items-center rounded-full w-14 h-14 bg-btn">
                  <Image
                    priority
                    src="/images/key.svg"
                    height={21}
                    width={21}
                    alt="key"
                  />
                </div>
              </div>

              <div className="w-full">
                <h1 className="text-3xl mt-6 text-center">
                  Détails du paiement de l&apos;abonnement
                </h1>
              </div>

              <Input
                style={{ height: "48px" }}
                header="Nom"
                className="w-full"
                placeholder="Votre nom"
                onChange={(e) => {
                  //@ts-ignore
                  setName(e.target.value);
                  seterrorName("");
                }}
                // inputClassName="h-[2px]"
                // {...getFieldProps("name")}
                // errorText={touched.name && errors.name}
              />
              <span className="text-[red]"> {errorName}</span>

              <div className="mt-[10px]">
                <label className="text-[white]">
                  Card Number
                  <Glass
                    className={`text-[white] w-full bg-transparent text-base px-5 py-4 placeholder:text-subtitle placeholder:text-base outline-none `}
                  >
                    {" "}
                    <CardNumberElement
                      className="text-[white]"
                      options={{
                        style: {
                          base: {
                            color: "#FFF",
                            // "::placeholder": {
                            //   color: "#FFF",
                            // },
                            ":-webkit-autofill": {
                              color: "#FFF",
                            },
                          },
                          invalid: {
                            color: "#FF0000",
                          },
                        },
                      }}
                        //@ts-ignore
                      onChange={(e) => setCardNumber(e.complete ? e.value : "")}
                    />{" "}
                  </Glass>
                </label>
              </div>
              <div className="flex gap-4 mt-[10px]">
                <div className="w-[50%]">
                  <label className="text-[white]">
                    Expiry Date
                    <Glass
                      className={`text-[white] w-full bg-transparent text-base px-5 py-4 placeholder:text-subtitle placeholder:text-base outline-none `}
                    >
                      {" "}
                      <CardExpiryElement
                        options={{
                          style: {
                            base: {
                              color: "#FFF",
                              // "::placeholder": {
                              //   color: "#FFF",
                              // },
                              ":-webkit-autofill": {
                                color: "#FFF",
                              },
                            },
                            invalid: {
                              color: "#FF0000",
                            },
                          },
                        }}
                          //@ts-ignore
                        onChange={(e) => setExpiry(e.complete ? e.value : "")}
                      />
                    </Glass>
                  </label>
                </div>

                <div className="w-[50%]">
                  <label className="text-[white]">
                    CVV
                    <Glass
                      className={`text-[white] w-full bg-transparent text-base px-5 py-4 placeholder:text-subtitle placeholder:text-base outline-none `}
                    >
                      <CardCvcElement
                        options={{
                          style: {
                            base: {
                              color: "#FFF",
                              // "::placeholder": {
                              //   color: "#FFF",
                              // },
                              ":-webkit-autofill": {
                                color: "#FFF",
                              },
                            },
                            invalid: {
                              color: "#FF0000",
                            },
                          },
                        }}
                          //@ts-ignore
                        onChange={(e) => setCvv(e.complete ? e.value : "")}
                      />
                    </Glass>
                  </label>
                </div>
              </div>
              <div className="mt-[10px]">
                <label className="text-[white]">
                  Postal Code{" "}
                  <Input
                    style={{ height: "48px" }}
                    // options={
                    //   {
                    //     /* Customize CardExpiryElement styling */
                    //   }
                    // }
                      //@ts-ignore
                    onChange={(e) => setpostalCode(e.complete ? e.value : "")}
                  />
                </label>
              </div>
              {error && <p>{error}</p>}
              {/* <button type="submit">Submit</button> */}
              <Button
                className="w-full shadow-btn2 mt-5"
                type="submit"
                loading={issubmitting}
                // onClick={props.onButtonClick}
                // loading={props.isSubmitting}
              >
                👉 Commencer mes 14 jours gratuits
              </Button>
            </form>
          </div>
        </div>
      </Glass>
    </Onboarding>
  );
};

const StripeCheckout = () => {
  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUB_KEY}`);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckout;
