import useSWR from "swr";
import Image from "next/image";
import Button from "../button";
import Card, { CardHeader } from "../card";
import Glass from "../glass";
import Input from "../input";
import Fetched from "../fetched";
import { Feedback } from "../feedback";
import { Stripe } from "@stripe/stripe-js";
import { StripeInvoice, StripeSubscription } from "@/types/general";
import Link from "next/link";
import { data } from "autoprefixer";
import axios from "axios";
import { usePost } from "@/hooks/apiHooks";
import { Form, FormikProvider } from "formik";
import { useAlert } from "@/contexts/alert-context";
import { AlertType } from "@/types/enum";

export function PlanInvoiceItem({ data }: { data: StripeInvoice }) {
  const {
    status_transitions: { paid_at },
  } = data;

  return (
    <li className="mt-6 first:mt-0 flex justify-between items-center">
      <div>
        <p className="text-base">
          {paid_at ? new Date(paid_at * 1000).toDateString() : "Impayé"}
        </p>
        <p className="text-subtitle text-xs">#{data.id}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-subtitle text-xs">
          {data.currency.toUpperCase()} {data.amount_paid}
        </p>
        <div className="flex items-center ml-6 cursor-pointer">
          <Image
            src="/images/pdf.svg"
            height={12}
            width={12}
            alt="document icon to generate pdf"
          />
          <a href={data.invoice_pdf} className="text-subtitle text-xs ml-2">
            PDF
          </a>
        </div>
      </div>
    </li>
  );
}

const cardBrands: { [b: string]: string } = {
  visa: "visa.png",
  mastercard: "mastercard.png",
  american_express: "american_express.png",
};

export default function Plan() {
  const { pushAlert } = useAlert();
  const changePlan = () => {
    const { data, error, isLoading } = useSWR<StripeInvoice[]>(
      "/cancel/subscription"
    );

    console.log(data, error, isLoading, "sjsjjd");
  };

  const {
    data: newClient,
    error: formError,
    formik,
  } = usePost<// QuestionWithCategory,
  {
    // name: string;
    // // type: QuestionType;
    // categoryId: string;
  }>({
    url: "payment/cancel/subscription",
    enableReinitialize: true,
    initialValues: {
      // name: "",
      // type: QuestionType.TEXT,
      // categoryId: "",
    },
    // schema: Schema,
    onComplete: (data) => {
      pushAlert("Cancelled", AlertType.SUCCESS);
      // mutate((existing) => {
      //   const copy = [...(existing || [])];
      //   const existingCategoryIndex = copy.findIndex(
      //     (c) => c.id === data.categoryId
      //   ); // category index in cache

      //   if (existingCategoryIndex < 0) { // if the question's category does not exist
      //     return [
      //       ...copy,
      //       { ...data.category, questions: [omit(data, ["category"])] }, // create an entry
      //     ];
      //   }

      //   // if it exists,
      //   copy[existingCategoryIndex] = {
      //     ...copy[existingCategoryIndex],
      //     questions: [
      //       ...copy[existingCategoryIndex].questions,
      //       omit(data, ["category"]), // add new data to the list of questions
      //     ],
      //   };

      //   return copy;
      // });
      // if (props.handleClose) props.handleClose();
    },
    onError: (e) => {
      pushAlert(e.message);
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  const {
    data: invoices,
    error: invError,
    isLoading: invLoading,
  } = useSWR<StripeInvoice[]>("/payment/invoices");

  const {
    data: sub,
    error: subError,
    isLoading: subLoading,
  } = useSWR<StripeSubscription>("/payment/subscriptions");

  return (
    <div className="w-full grow">
      <div className="w-full flex">
        <Card className="w-[75%] p-8">
          <CardHeader title="Méthode de paiement" subTitle="" />
          <div className="mt-10">
            <Fetched
              error={subError}
              isLoading={subLoading}
              data={sub}
              dataComp={(s) =>
                s ? (
                  <Glass className="px-5 py-9 max-w-[495px]">
                    <div className="flex">
                      <Image
                        src={`/images/payment/${
                          cardBrands[s?.default_payment_method?.card?.brand] ||
                          "card.png"
                        }`}
                        height={14}
                        width={30}
                        alt="card logo"
                        className=""
                      />
                      <p className="text-base ml-4">
                        XXXX XXXX XXXX {s?.default_payment_method?.card?.last4}
                      </p>
                    </div>
                  </Glass>
                ) : (
                  <Feedback
                    noAbsolute
                    msg="Impossible de récupérer l'abonnement"
                  />
                )
              }
            />
          </div>
        </Card>
      </div>
      <div className="flex mt-10 gap-7">
        <Card className="p-7 basis-1/2">
          <div className="flex justify-between items-center">
            <p className="text-[18px] leading-[140%]">Factures</p>
            {/* <Button>Voir +</Button> */}
          </div>
          <ul className="mt-7">
            <Fetched
              error={invError}
              isLoading={invLoading}
              data={invoices}
              dataComp={(invs) =>
                invs?.length > 0 ? (
                  invs?.map((inv) => (
                    <>
                      {console.log(inv, "datadata")}
                      <PlanInvoiceItem data={inv} key={inv.id} />
                      <FormikProvider value={formik}>
                        <Form className="w-full" onSubmit={handleSubmit}>
                          
                          {inv.isSubcriptionCancelled == false ? (
                            <>
                              <Button onClick={(e)=>{
                                e.preventDefault()
                                e.stopPropagation()
                                return
                              }} className="bg-[red] mt-6">Plan Cancelled</Button>
                            </>
                          ) : (
                            <>
                              {" "}
                              <Button
                                style={{ marginTop: "10px" }}
                                type="submit"
                                className="shadow-none !text-base font-semibold"
                              >
                                Annuler le plan
                              </Button>
                            </>
                          )}
                        </Form>
                      </FormikProvider>
                    </>
                  ))
                ) : (
                  <Feedback
                    noAbsolute
                    msg="Vous n'avez pas encore de facture"
                  />
                )
              }
            />
          </ul>
        </Card>
        {/* <FormikProvider value={formik}> 
          <Form className="w-full" onSubmit={handleSubmit}>
            <Button 
            
              type="submit" className="shadow-none !text-base font-semibold">
              Annuler le plan
            </Button>
          </Form>
        </FormikProvider> */}

        <Card className="p-7 basis-1/2">
          <div className="flex w-full gap-4 justify-between items-center">
            <p>Adresse de facturation</p>
            <Input
              id="dueDate"
              placeholder="100 rue du bonheur"
              className="grow"
              // {...getFieldProps("dueDate")}
              onChange={(e) => {}}
            />
          </div>
          <div className="mt-9 flex w-full gap-4 justify-between items-center">
            <p>Ville</p>
            <Input
              id="dueDate"
              placeholder="100 rue du bonheur"
              className="grow"
              // {...getFieldProps("dueDate")}
              onChange={(e) => {}}
            />
          </div>
          <div className="mt-9 flex w-full gap-4 justify-between items-center">
            <p>Région</p>
            <Input
              id="dueDate"
              placeholder="100 rue du bonheur"
              className="grow"
              // {...getFieldProps("dueDate")}
              onChange={(e) => {}}
            />
          </div>
          <div className="mt-9 flex w-full gap-4 justify-between items-center">
            <p>Pays</p>
            <Input
              id="dueDate"
              placeholder="100 rue du bonheur"
              className="grow"
              // {...getFieldProps("dueDate")}
              onChange={(e) => {}}
            />
          </div>
        </Card>
      </div>
      <div className="flex gap-4">
        {" "}
        <Link href={"/plans"}>
          <Button
            type="submit"
            className="shadow-none !text-base font-semibold"
          >
            Changer de plan
          </Button>
        </Link>
        {/* <Button 
        onClick={()=>changePlan()}
          type="submit" className="shadow-none !text-base font-semibold">
          Annuler le plan
        </Button> */}
      </div>
    </div>
  );
}
