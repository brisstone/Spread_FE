import useSWR from "swr";
import { Props } from "@/types/props";
import { useAlert } from "@/contexts/alert-context";
import { QuestionCategoryWithQuestions } from "@/types/general";
import Card from "../card";
import Input from "../input";
import Button, { ButtonProps } from "../button";
import { omit } from "lodash";
import { usePost } from "@/hooks/apiHooks";
import QuestionModal from "./question-modal";
import { useState } from "react";
import QuestionCategoryModal from "./questioncategory-modal";
import Fetched from "../fetched";

import utilStyles from "@/styles/utils.module.css";

/**
 *
 * @param props Props & { data: QuestionCategoryWithQuestions }
 * @returns Group of questions under a question category
 */
function QuestionSection({
  data,
  className,
}: Props & { data: QuestionCategoryWithQuestions }) {
  return (
    <div className="w-full mt-6">
      <p className="mb-3 text-base">{data.name}</p>
      <div className={`w-full grid grid-cols-2 gap-x-10 gap-y-4 ${className}`}>
        {/** Note to me: The children were put here just to shorten the static code */}
        {data.questions.length > 0 ? (
          data.questions.map((q) => (
            <Input
              key={q.id}
              name=""
              placeholder={q.name}
              disabled
              className="grow"
              inputClassName="!py-2 placeholder:text-white"
            />
          ))
        ) : (
          <p className="text-xs text-subtitle">
            Vous n&apos;avez créé aucune question d&apos;intégration dans cette
            catégorie
          </p>
        )}
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
  const [qCOpen, setQCOpen] = useState(false);

  const { data, error, isLoading } = useSWR<QuestionCategoryWithQuestions[]>(
    "/crm/onboarding/questions"
  );

  return (
    <>
      <QuestionModal open={qOpen} handleClose={() => setQOpen(false)} />
      <QuestionCategoryModal
        open={qCOpen}
        handleClose={() => setQCOpen(false)}
      />
      <Card className="w-full py-12 px-16">
        <Fetched
          error={error}
          errorComp={
            <p
              className={`text-base text-subtitle text-center ${utilStyles.absoluteCentered}`}
            >
              Échec de la récupération des données
            </p>
          }
          isLoading={isLoading}
          isLoadingComp={
            <p
              className={`text-base text-subtitle text-center ${utilStyles.absoluteCentered}`}
            >
              Chargement...
            </p>
          }
          data={data}
          dataComp={(qcs) =>
            qcs.length > 0 ? (
              qcs.map((q) => <QuestionSection data={q} key={q.id} />)
            ) : (
              <p
                className={`text-base text-subtitle text-center ${utilStyles.absoluteCentered}`}
              >
                Vous n&apos;avez pas encore créé de questions d&apos;intégration
              </p>
            )
          }
        />
        {/* <QuestionSection className="!flex flex-col" /> */}

        <div className="flex mt-8 gap-4">
          <AddButton
            onClick={() => setQOpen(true)}
            text="Ajouter une question"
          />
          <AddButton
            onClick={() => setQCOpen(true)}
            text="Ajouter une catégorie"
          />
        </div>
      </Card>
    </>
  );
}
