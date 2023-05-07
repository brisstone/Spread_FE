import { LayoutProps } from "@/components/layout";
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

  const Layout = Component.Layout || React.Fragment;

  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </Provider>
  );
}
