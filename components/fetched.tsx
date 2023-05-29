import { ErrorFeedback, Feedback, LoadingFeedback } from "./feedback";

export default function Fetched<T>(props: {
  error: any;
  errorComp?: JSX.Element;
  isLoading: boolean;
  isLoadingComp?: JSX.Element;
  data: T;
  dataComp: (data: NonNullable<T>) => JSX.Element | JSX.Element[];
}) {
  return (
    <>
      {props.data ? (
        props.dataComp(props.data)
      ) : (
        <>
          {props.isLoading && (props.isLoadingComp || <LoadingFeedback />)}
          {props.error && (props.errorComp || <ErrorFeedback />)}
          {!props.error && !props.isLoading && (
            <Feedback msg="Quelque chose s'est mal passé" />
          )}
        </>
      )}
    </>
  );
}
