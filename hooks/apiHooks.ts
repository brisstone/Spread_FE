import axios, { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { FormikValues, useFormik } from "formik";
import {
  SuccessDataResponse,
} from "@/types/responses";
import { Maybe, ObjectSchema, ObjectShape, AnySchema, AnyObject } from "yup";
// import { getAccessToken } from "helpers/authHelpers";
import { apiErrorParser, commonSuccessRespFilter } from "@/lib/responseHelpers";
import axiosHttp from "@/lib/axiosHttp";

// export function usePagination<DataType>(
//   serviceAction: (
//     page: number,
//     limit: number
//   ) => Promise<AxiosResponse<PaginatedResponse<DataType[]>>>,
//   page: number,
//   limit: number
// ) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [data, setData] = useState<DataType[]>([]);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     setError(false);

//     serviceAction(page, limit)
//       .then(({ data: resData }) => {
//         setData((prev) => [...new Set<DataType>([...prev, ...resData.data])]);
//         setHasMore(Boolean(resData.next));
//         setLoading(false);
//       })
//       .catch((e) => setError(true));
//   }, [page, limit]);

//   return { loading, error, data, hasMore };
// }

interface UsePostProps<
  TReturnType,
  TData extends FormikValues,
  T extends ObjectSchema<AnyObject> = any
> {
  url: string;
  initialValues: TData;
  modifyBefore?: (data: TData) => any;
  schema?: T;
  type?: "post" | "patch";
  notify?: boolean;
  onComplete?: (data: TReturnType) => any;
}

export function usePost<
  TReturnType,
  TData extends FormikValues = FormikValues,
  TShape extends ObjectSchema<AnyObject> = ObjectSchema<AnyObject>,
>(options: UsePostProps<TReturnType, TData, TShape>) {
  const [error, setError] = useState<string>();
  const [data, setData] = useState<TReturnType>();
  const [message, setMessage] = useState<string>();

  // const { notify } = useProvideNotification();

  const formik = useFormik<TData>({
    initialValues: options.initialValues,
    validationSchema: options.schema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const body = options.modifyBefore ? options.modifyBefore(values) : values;

      axiosHttp[options.type || "post"]<SuccessDataResponse<TReturnType>>(
        options.url,
        body
      )
        .then(commonSuccessRespFilter)
        .then(({ data: resData }) => {
          setData(resData.data);
          setMessage(resData.message);
          setSubmitting(false);
          resetForm();
          if (options.onComplete) options.onComplete(resData.data);
          // if (options.notify) notify(resData.message);
        })
        .catch(apiErrorParser)
        .catch((e: Error) => {
          setError(e.message);
          // notify(e);
          setSubmitting(false);
        });
    },
  });

  return {
    message,
    data,
    error,
    formik,
  };
}
