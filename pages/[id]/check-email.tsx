import OnboardingDetail from "@/components/onboardingdetail";

export default function CheckEmail() {
  return (
    <OnboardingDetail
      imgSrc="/images/email.svg"
      h1="Regardez vos mails"
      text1="Nous avons envoyé un lien pour réinitialiser votre"
      text2="mot de passe à votre email"
      btnText="📩 Ouvrir votre boîte mail"
      bottomItem={
        <p className="text-base text-center">
          <span>Vous n’avez pas reçu de mail ? </span>
          <span>Cliquez ici pour réessayer</span>
        </p>
      }
    />
  );
}
