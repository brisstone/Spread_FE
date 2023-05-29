import utilStyles from "@/styles/utils.module.css";
import { omit } from "lodash";

interface FeedbackProps {
  msg?: string;
  noAbsolute?: boolean;
}

export function Feedback(props: Omit<FeedbackProps, 'msg'> & {msg: string}) {
  return (
    <p
      className={`text-base text-subtitle text-center ${
        !props.noAbsolute ? utilStyles.absoluteCentered : ""
      }`}
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
