import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import Image from "next/image";
import Button from "@/components/button";
import Glass from "@/components/glass";
import OutlinedInput from "@/components/outlinedinput";
import Link from "next/link";
import OnboardingDetail from "@/components/onboardingdetail";

export default function PasswordChanged() {
  return (
    <OnboardingDetail
      imgSrc="/images/check-circle.svg"
      h1="Votre mot de passe à bien été changé !"
      text1="Votre mot de passe à bien été changé !"
      text2="Cliquez sur continuer pour vous connecter"
      btnText="👉 Continuer"
      btnHref="/login"
    />
  );
}
