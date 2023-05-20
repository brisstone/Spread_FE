import Image from "next/image";
import Card from "../card";
import Input from "../input";
import { Props } from "@/types/props";
import Button, { ButtonProps } from "../button";
import { omit } from "lodash";
import { useAlert } from "@/contexts/alert-context";
import { usePost } from "@/hooks/apiHooks";
import QuestionModal from "./question-modal";
import { useState } from "react";

function QuestionSection(props: Props) {
  return (
    <div className="w-full mt-6">
      <p className="mb-3 text-base">Questions Simples</p>
      <div
        className={`w-full grid grid-cols-2 gap-x-10 gap-y-4 ${props.className}`}
      >
        {props.children}

        {/** Note to me: The children were put here just to shorten the static code */}
        <Input
          name=""
          placeholder="Prénom"
          className="grow"
          inputClassName="!py-2 placeholder:text-white"
        />
        <Input
          name=""
          placeholder="Nom"
          className="grow"
          inputClassName="!py-2 placeholder:text-white"
        />
        <Input
          name=""
          placeholder="Numéro de Télephone"
          className="grow"
          inputClassName="!py-2 placeholder:text-white"
        />
        <Input
          name=""
          placeholder="Email"
          className="grow"
          inputClassName="!py-2 placeholder:text-white"
        />
      </div>
    </div>
  );
}

function AddButton(props: ButtonProps & { text: string }) {
  return (
    <Button
      {...omit(props, ["text", "className"])}
      className="!flex !p-0 flex-nowrap gap-2 !bg-transparent"
      iconUrl="/images/squareplus.svg"
    >
      <span className="text-base">{props.text}</span>
    </Button>
  );
}

export default function OnboardingQuestions() {
  const { pushAlert } = useAlert();
  const [qOpen, setQOpen] = useState(false);

  return (
    <>
    <QuestionModal open={qOpen} handleClose={() => setQOpen(false)} />
    <Card className="w-full py-12 px-16">
      <QuestionSection />
      <QuestionSection />
      <QuestionSection className="!flex flex-col" />

      <div className="flex mt-4 gap-4">
        <AddButton text="Ajouter une question" />
        <AddButton text="Ajouter une catégorie" />
      </div>
    </Card>
    </>
  );
}
