import useSWR from "swr";
import Button from "@/components/button";
import Input from "@/components/input";
import Onboarding from "@/components/onboarding";
import { Props } from "@/types/props";
import Image from "next/image";
import { StripePrice } from "@/types/general";
import Fetched from "@/components/fetched";
import useBaseUser from "@/data/use-base-user";
import { createSubscription } from "@/services";
import { useAlert } from "@/contexts/alert-context";
import { useRouter } from "next/router";
import useUser from "@/data/use-user";
import { useEffect, useState } from "react";
import useUserAndEnterprise from "@/data/user-user-enterprise";
import { omit } from "lodash";

function FeatureItem({ text, className }: { text: string } & Props) {
  return (
    <li
      className={`flex mt-4 first:mt-0 gap-[14px] items-center justify-start ${className}`}
    >
      <div className="flex rounded-full bg-white w-5 h-5 justify-center items-center">
        <Image
          src="/images/bluecheck.svg"
          height={6.47}
          width={9.05}
          alt="avatar"
          className="rounded-full"
        />
      </div>
      <p className="text-lg break-words">{text}</p>
    </li>
  );
}

function Plan(
  props: Props & {
    name: string;
    price: number;
    benefits: string[];
    svgUrl: string;
    selected?: boolean;
    onSelected: () => any;
    isSubmitting: boolean
  }
) {
  return (
    <div
      className={`cursor-pointer relative pt-[45px] ${props.className} basis-1/2`}
    >
      <div
        className={`relative transition hover:bg-blurryblue hover:border-2 hover:border-solid hover:border-blueborder bg-greycard p-10 rounded-[24px] h-full`}
      >
        <div className="absolute flex items-center justify-center w-[90px] h-[90px] top-0 left-2/4 -translate-y-2/4 -translate-x-2/4 bg-gradient-blurrygrey shadow-blurrygrey opacity-[0.7] rounded-[24px]">
          <Image src={props.svgUrl} width={50} height={50} alt="avatar" />
        </div>

        <p className="text-[24px] leading-[30px] text-center mt-10 mb-6">
          {props.name}
        </p>

        <p>
          <span className="text-[54px] leading-[66px]">{props.price}€</span>
          <span className="text-base text-subtitle">/mois</span>
        </p>

        <p className="text-base text-subtitle3 mt-5">Sans Engagement</p>

        <ul className="mt-6">
          {props.benefits.map((benefit) => (
            <FeatureItem text={benefit} key={benefit} />
          ))}
        </ul>

        <div className="flex w-full justify-center items-center py-4 px-8">
          <Button
            loading={props.isSubmitting}
            onClick={props.onSelected}
            variant="secondary"
            className="transition shadow-blurrygrey w-full mt-[60px] hover:bg-btn hover:shadow-btn2 hover:text-white"
          >
            Passer au plan Freelance
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Payment() {
  const { enterprise } = useUserAndEnterprise();

  const { pushAlert } = useAlert();
  const router = useRouter();

  const { data, isLoading, error } = useSWR<{
    prices: StripePrice[];
    publishableKey: string;
  }>("/payment/plans");

  console.log(data,'datadatadatadata');
  

  useEffect(() => {
    if (enterprise && enterprise.subscriptionActive) {
      router.replace(`/${enterprise.id}/dashboard`);
    }
  }, [enterprise, router]);

  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
  return (
    <Onboarding className="relative h-full !justify-start">
      <Fetched
        error={error}
        isLoading={isLoading}
        data={data}
        dataComp={(d) => (
          <>
            <div className="sticky z-10 top-0 left-0 right-0 w-full bg-btn py-5">
              <p className="text-[20px] leading-6 text-center">
              Application tout-en-un pour votre agence ou votre activité de Freelance 👨‍💻  
              </p>
            </div>
            <div className="w-full grow mt-11 py-11 container mx-auto flex items-center">
              <div className="w-full flex flex-col items-center">
                <h1 className="text-xl text-center">
                  Scalez votre entreprise ! Essayez Stread pendant 14 jours 🏆
                </h1>
                <div className="flex mt-8 gap-1 text-base">
                  <p>Vous avez déjà un compte?</p>
                  <p className="text-icon">Se connecter</p>
                </div>
                <div className="flex w-full justify-center items-center mt-10">
                  <div className="flex justify-center gap-7 items-stretch">
                    {/* <div className="flex gap-7"> */}
                    {d.prices
                      .sort(
                        (a, b) =>
                          +a.product.metadata.rank - +b.product.metadata.rank
                      )
                      .map((p) => (
                        <Plan
                          isSubmitting={isSubmitting === p.id}
                          onSelected={() => {
                            setIsSubmitting(p.id)
                            createSubscription(p.id)
                              .then((data) => {
                                console.log("data", data);
                                router.push({
                                  pathname: "/checkout",
                                  query: {
                                    ...omit(data, ['enterpriseId']),
                                    id: data.enterpriseId,
                                  },
                                });
                                setIsSubmitting(null);
                              })
                              .catch((e) => {
                                console.log(e);
                                setIsSubmitting(null);
                                pushAlert(e.message);
                              });
                          }}
                          key={p.id}
                          name={p.product.name}
                          svgUrl="/images/dart.svg"
                          price={p.unit_amount / 100}
                          benefits={
                            p.product.name.toLowerCase().includes("freelance")
                              ? [
                                  "3 utilisateurs",
                                  "10 clients",
                                  "CRM",
                                  "Onboarding et facturation",
                                  "Gestionnaire de tâches",
                                  "Chat avec son équipe et ses clients",
                                ]
                              : [
                                  "Toutes les fonctionnalités de la tarification Freelance",
                                  "Nombres d’utilisateurs illimités",
                                  "Nombres de clients illimités",
                                  "Mesurez les chiffres de l’agence",
                                  "Support prioritaire pour une aide rapide en cas de besoin",
                                ]
                          }
                        />
                      ))}
                    {/* </div> */}
                  </div>
                  {/* <div className="grow">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <Input
                          name="Adresse de facturation"
                          placeholder="Votre adresse de facturation..."
                        />
                        <Input name="Pays" placeholder="France" />
                        <Input name="Région" placeholder="Ile de France" />
                        <Input name="Ville" placeholder="Paris" />
                        <Input name="Code Postal" placeholder="00000" />
                        <Input name="Code Promotionnel" placeholder="Lorem" />
                        <Input
                          name="Numéro de Carte"
                          placeholder="1234 5678 9123 4567"
                        />
                        <Input
                          name="Titulaire du Compte"
                          placeholder="Titulaire du Compte"
                        />
                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          </>
        )}
      />
    </Onboarding>
  );
}
