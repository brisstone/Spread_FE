import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import Image from "next/image";
import Button from "@/components/button";
import Glass from "@/components/glass";
import OutlinedInput from "@/components/outlinedinput";
import Link from "next/link";
import OnboardingDetail from "@/components/onboardingdetail";

export default function CheckEmail() {
  return (
    <OnboardingDetail
      imgSrc="/images/email.svg"
      h1="Regardez vos mails"
      text1="Nous avons envoyé un lien pour réinitialiser votre"
      text2="mot de passe à alvyn@stread.io"
      btnText="📩 Ouvrir votre boîte mail"
      bottomItem={
        <p className="text-base text-center">
          <span>Vous n’avez pas reçu de mail ? </span><span>Cliquez ici pour réessayer</span>
        </p>
      }
      btnHref="/password-changed"
    />
  );
}
