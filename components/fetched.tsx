import { ErrorFeedback, Feedback, LoadingFeedback } from "./feedback";

export default function Fetched<T>(props: {
  error: any;
  errorComp?: JSX.Element;
  isLoading: boolean;
  isLoadingComp?: JSX.Element;
  data: T;
  dataComp: (data: NonNullable<T>) => JSX.Element | JSX.Element[];
  noData?: boolean;
  feedbackNoAbsolute?: boolean;
  feedbackClassName?: string;
}) {
  console.log("ERR", props.error?.message, "mpppm");
  return (
    <>
      {props.data ? (
        props.dataComp(props.data)
      ) : (
        <>
          {props.isLoading &&
            (props.isLoadingComp || (
              <LoadingFeedback
                noAbsolute={props.feedbackNoAbsolute}
                className={props.feedbackClassName}
              />
            ))}
          {props.error &&
            (props.errorComp || (
              <ErrorFeedback
                noAbsolute={props.feedbackNoAbsolute}
                className={props.feedbackClassName}
                msg={
                  `${props?.error}` ||
                  props?.error?.message?.response?.data?.message
                }
              />
            ))}

          {!props.error && !props.isLoading && (
            <Feedback
              noAbsolute={props.feedbackNoAbsolute}
              msg={props?.error?.message?.response?.data?.message}
              className={props.feedbackClassName}
            />
          )}
          {!props.error && !props.isLoading && (
            <Feedback
              noAbsolute={props.feedbackNoAbsolute}
              msg="Pas de données disponibles"
              className={props.feedbackClassName}
            />
          )}
        </>
      )}
    </>
  );
}
