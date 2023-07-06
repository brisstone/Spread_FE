import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import Image from "next/image";
import Button from "@/components/button";
import Glass from "@/components/glass";
import { OutlinedInput } from "@/components/input";
import Link from "next/link";
import OnboardingDetail from "@/components/onboardingdetail";
import { useRouter } from "next/router";

export default function PasswordChanged() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <OnboardingDetail
      imgSrc="/images/check-circle.svg"
      h1="Votre mot de passe à bien été changé !"
      text1="Votre mot de passe à bien été changé !"
      text2="Cliquez sur continuer pour vous connecter"
      btnText="👉 Continuer"
      onButtonClick={() => router.replace(`/login`)}
    />
  );
}
