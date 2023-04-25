import Button from "@/components/button";
import Glass from "@/components/glass";
import Input from "@/components/input";
import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import Image from "next/image";

export default function Signup() {
  return (
    // <div className="min-h-screen w-screen">
    <Onboarding>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl">Bienvenue 👋</h1>
        <p className="mt-5 text-sm">
          Commencez votre période d’essai de 14 Jours
        </p>
      </div>

      <div className="mt-7">
        <OnboardingGlass>
          <h2 className="text-lg">S’inscrire avec</h2>

          <Social />

          <div className="flex flex-col mt-8 gap-5">
            <Input
              name="Nom"
              placeholder="Prénom, Nom"
              className="max-w-[350px]"
            />
            <Input name="Email" placeholder="Votre email" />
            <Input name="Mot de passe" placeholder="Votre mot de passe" />
            {/* <Input name="Nom" placeholder="Prénom, Nom" /> */}
          </div>

          <Button className="mt-6 w-full">👉 S’inscrire</Button>
        </OnboardingGlass>
      </div>
    </Onboarding>
    // </div>
  );
}
