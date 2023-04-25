import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Onboarding, { OnboardingGlass, Social } from "@/components/onboarding";
import Button from "@/components/button";
import Glass from "@/components/glass";
import OutlinedInput from "@/components/outlinedinput";

interface DetailProps {
  imgSrc: string;
  h1: string;
  text1: string;
  text2: string;
  input?: ReactNode;
  btnText: string;
  btnHref: string;
  bottomItem?: ReactNode;
}

export default function OnboardingDetail(props: DetailProps) {
  return (
    <Onboarding>
      <Glass>
        <div className="py-20 px-12 max-w-[452.5px]">
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center rounded-full w-14 h-14 bg-btn">
              <Image
                priority
                src={props.imgSrc}
                height={21}
                width={21}
                alt="key"
              />
            </div>

            <div className="w-full">
              <h1 className="text-3xl mt-6 text-center">{props.h1}</h1>
              <p className="mt-6 text-[16px] text-obsec text-center">
                <span className="leading-6">{props.text1}</span>
                <br />
                <span>{props.text2}</span>
              </p>
            </div>

            <div className="w-full">{props.input}</div>

            <div className="w-full">
              <div className="w-full mt-6">
                <Link href={props.btnHref}>
                  <Button className="w-full">{props.btnText}</Button>
                </Link>
              </div>

              {props.bottomItem && (
                <div className="w-full mt-6">{props.bottomItem}</div>
              )}

              <Link
                href="/login"
                className="flex mt-6 justify-center items-center gap-3"
              >
                <Image
                  priority
                  src="/images/back.svg"
                  height={11.67}
                  width={11.67}
                  alt="back"
                />
                <span className="text-base text-center">
                  Retour à la page de connexion
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Glass>
    </Onboarding>
  );
}
