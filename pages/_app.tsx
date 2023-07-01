import Alert from "@/components/alert";
import { LayoutProps } from "@/components/layout";
import { AlertContextProvider } from "@/contexts/alert-context";
import fetcher from "@/lib/fetcher";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { authenticate } from "@/redux/slices/auth";
import store from "@/redux/store";
import "@/styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { FunctionComponent, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GoogleOAuthProvider } from "@react-oauth/google";

type ComponentType = NextComponentType<NextPageContext, any, any> & {
  Layout?: FunctionComponent<LayoutProps>;
  header?: string;
};

// const GetLayout = function ({ Layout, header }: ComponentType) {
//   return (children: any) => {
//     if (Layout) {
//       return <Layout header={header}>{children}</Layout>;
//     } else {
//       return <>{children}</>
//     }
//   };
// };

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    Layout?: FunctionComponent<LayoutProps>;
    header?: string;
  };
}) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!);

  // 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
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_KEY}`}>
      <Provider store={store}>
        <SWRConfig
          value={{
            fetcher,
          }}
        >
          <Elements
            stripe={stripePromise}
            options={{
              locale: "fr",
              appearance: {
                theme: "none",
                variables: {
                  colorPrimary: "#ffffff",
                  colorText: "#ffffff",
                  colorTextPlaceholder: "#ffffff",
                },
              },
            }}
          >
            <AlertContextProvider>
              <Alert />
              <Component {...pageProps} />
            </AlertContextProvider>
          </Elements>
        </SWRConfig>
      </Provider>
    </GoogleOAuthProvider>
  );
}
