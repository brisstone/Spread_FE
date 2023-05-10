import { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { Props } from "@/types/props";
import Link from "next/link";
import { NavItem } from "./navigation";
import Background from "./background";
import axiosHttp from "@/lib/axiosHttp";
import { apiErrorParser, commonSuccessRespFilter } from "@/lib/responseHelpers";
import { User } from "@/types/general";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { authenticate } from "@/redux/slices/auth";
import Cookies from "js-cookie";
import useUser from "@/data/use-user";
import useUserAndEnterprise from "@/data/user-user-enterprise";

export interface LayoutProps extends Props {
  header?: string;
}

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const [id, setId] = useState(v4());

  const router = useRouter();

  const { user, enterprise, isLoading, error, loggedOut } =
    useUserAndEnterprise();

  console.log("user:", user);
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("loggedOut:", loggedOut);
  console.log("enterprise", enterprise);

  useEffect(() => {
    if (loggedOut) router.replace(`/${router.query.id}/login`);
  }, [loggedOut, router]);

  return (
    <Background>
      {/** TODO add container for large screens */}
      <div className="flex min-h-screen w-full overflow-y-auto">
        <nav className="fixed top-0 left-0 bottom-0 w-1/5 p-[10px]">
          <div className="bg-gradient-nav h-screen w-full rounded-2xl backdrop-blur-3xl">
            <div className="p-6">
              <ul>
                <NavItem
                  svg="/images/stat.svg"
                  active
                  name="Dashboard"
                  href={`/${enterprise?.id}/dashboard`}
                />
                <NavItem
                  svg="/images/chat.svg"
                  name="Chat"
                  href={`/${enterprise?.id}/dashboard/chat`}
                />
                <NavItem svg="/images/chat.svg" name="Login" href="/login" />
                <NavItem
                  svg="/images/chat.svg"
                  name="Forgot Password"
                  href="/forgot-password"
                />
                <NavItem
                  svg="/images/chat.svg"
                  name="CRM"
                  href={`/${enterprise?.id}/dashboard/crm`}
                />
                <NavItem
                  svg="/images/chat.svg"
                  name="Onboarding"
                  href={`/${enterprise?.id}/dashboard/onboarding`}
                />
                <NavItem
                  svg="/images/chat.svg"
                  name="Clients"
                  href={`/${enterprise?.id}/dashboard/clients`}
                />
                <NavItem
                  svg="/images/chat.svg"
                  name="To Do List"
                  href={`/${enterprise?.id}/dashboard/todo`}
                />
                <NavItem
                  svg="/images/chat.svg"
                  name="Kanban"
                  href={`/${enterprise?.id}/dashboard/kanban`}
                />
                <NavItem
                  svg="/images/chat.svg"
                  name="Parameters"
                  href={`/${enterprise?.id}/dashboard/settings`}
                />
              </ul>
            </div>
          </div>
        </nav>

        <main className="relative w-4/5 ml-[20%] flex flex-col main grow pl-4 py-10 pr-5">
          {props.header && <LayoutHeader>{props.header}</LayoutHeader>}
          {isLoading && (
            <p className="absolute text-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Loading...
            </p>
          )}
          {error && (
            <p className="absolute text-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Erreur lors du chargement des données de l&apos;organisation
            </p>
          )}
          {!isLoading && !error && user && enterprise && props.children}
        </main>
      </div>
    </Background>
  );
};

export function LayoutHeader(props: Props) {
  return (
    <header className="mb-5">
      <h1 className="text-xl">{props.children}</h1>
    </header>
  );
}

export default Layout;
