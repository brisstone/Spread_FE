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
                    <PlanInvoiceItem data={inv} key={inv.id} />
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
        <Button type="submit" className="shadow-none !text-base font-semibold">
          Annuler l'abonnement
        </Button>
      </div>
    </div>
  );
}
