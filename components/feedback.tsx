import utilStyles from "@/styles/utils.module.css";
import { Props } from "@/types/props";
import { omit } from "lodash";

interface FeedbackProps extends Props {
  msg?: string;
  noAbsolute?: boolean;
}

export function Feedback(props: Omit<FeedbackProps, 'msg'> & {msg: string}) {
  console.log('NO ABSOLUTE', props.noAbsolute)
  return (
    <p
      className={`text-base text-subtitle text-center ${
        !props.noAbsolute ? utilStyles.absoluteCentered : ""
      } ${props.className}`}
    >
      {props.msg}
    </p>
  );
}

export function ErrorFeedback(props: FeedbackProps) {

  
  return <Feedback {...omit(props, ['msg'])} msg={props.msg || "Échec de la récupération des données"} />
}

export function LoadingFeedback(props: FeedbackProps) {
  return <Feedback {...omit(props, ['msg'])} msg={props.msg || "Chargement..."} />
}
