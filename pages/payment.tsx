import Button from "@/components/button";
import Input from "@/components/input";
import Onboarding from "@/components/onboarding";
import { Props } from "@/types/props";
import Image from "next/image";

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
  }
) {
  return (
    <div className={`relative pt-[45px] ${props.className}`}>
      <div
        className={`relative transition ${
          props.selected
            ? "bg-blurryblue border-2 border-solid border-blueborder"
            : "bg-greycard"
        } p-10 rounded-[24px]`}
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
            className={`${
              props.selected
                ? "bg-btn shadow-btn2"
                : " bg-white !text-black shadow-blurrygrey"
            } w-full mt-[60px]`}
          >
            Passer au plan Freelance
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Payment() {
  return (
    <Onboarding className="relative h-full !justify-start">
      <div className="sticky z-10 top-0 left-0 right-0 w-full bg-btn py-5">
        <p className="text-[20px] leading-6 text-center">
          Offre Marketing Puissante 🚀
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
            <div className="flex justify-start gap-7">
              {/* <div className="flex gap-7"> */}
                <Plan
                  name="Freelancer"
                  svgUrl="/images/dart.svg"
                  price={49}
                  benefits={[
                    "3 utilisateurs",
                    "10 clients",
                    "CRM",
                    "Onboarding et facturation",
                    "Gestionnaire de tâches",
                    "Chat avec son équipe et ses clients",
                  ]}
                />

                <Plan
                  selected
                  svgUrl="/images/linechart.svg"
                  name="Agency"
                  price={69}
                  benefits={[
                    "3 utilisateurs",
                    "10 clients",
                    "CRM",
                    "Onboarding et facturation",
                    "Gestionnaire de tâches",
                    "Chat avec son équipe et ses clients",
                  ]}
                />
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
    </Onboarding>
  );
}
