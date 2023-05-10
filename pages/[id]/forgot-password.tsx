import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import Image from "next/image";
import Button from "@/components/button";
import Glass from "@/components/glass";
import OutlinedInput from "@/components/outlinedinput";
import Link from "next/link";
import OnboardingDetail from "@/components/onboardingdetail";

export default function ForgotPassword() {
  return (
    <OnboardingDetail
      imgSrc="/images/key.svg"
      h1="Mot de passe oublié ?"
      input={
        <OutlinedInput
          placeholder="Entrez votre adresse mail"
          className="mt-6 w-full"
        />
      }
      text1="Aucun problème."
      text2="Nous vous enverrons les instructions."
      btnText="🔒 Changer de mot de passe"
      btnHref="/check-email"
    />
  );
}
