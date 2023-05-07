import { Props } from "@/types/props";
import Glass from "./glass";
import Image from "next/image";
import Background from "./background";

export default function Onboarding({ children, className }: Props) {
  return (
    <Background>
      <div
        className={`min-h-screen w-full min-w-full box-border flex justify-center items-center p-4 flex-col ${className}`}
      >
        {children}
      </div>
    </Background>
  );
}

export function OnboardingGlass({ children }: Props) {
  return (
    <Glass>
      <div className="px-12 py-9 flex flex-col items-center">{children}</div>
    </Glass>
  );
}

export function Social() {
  return (
    <div className="flex justify-evenly items-center gap-4 mt-8">
      {["facebook", "apple", "google"].map((m) => (
        <Glass key={m} className="rounded-2xl">
          <div className="flex justify-center items-center p-6">
            <Image
              priority
              src={`/images/${m}.svg`}
              height={25}
              width={25}
              alt={`${m} logo`}
            />
          </div>
        </Glass>
      ))}
    </div>
  );
}
