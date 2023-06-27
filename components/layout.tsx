import { FC, useEffect, useState } from "react";
import { Props } from "@/types/props";
import { NavItem } from "./navigation";
import Background from "./background";
import { useRouter } from "next/router";
import useUserAndEnterprise from "@/data/user-user-enterprise";
import { User } from "@/types/general";
import Image from "next/image";

export interface LayoutProps extends Props {
  header?: string;
}

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  // const [id, setId] = useState(v4());

  // const { data: user, error, isLoading, mutate } = useSWR<User>("/auth/user");

  const router = useRouter();

  const { user, enterprise, isLoading, error, loggedOut } =
    useUserAndEnterprise();

  console.log("enterprffffise:", enterprise);
  // console.log("isLoading:", isLoading);
  // console.log("error:", error);
  // console.log("loggedOut:", loggedOut);
  // console.log("enterprise", enterprise);

  useEffect(() => {
    if (loggedOut) router.replace(`/login`);
  }, [loggedOut, router]);

  return (
    <Background>
      {/** TODO add container for large screens */}
      <div className="flex min-h-screen w-full overflow-y-auto">
        <nav className="fixed top-0 left-0 bottom-0 w-1/5 p-[10px]">
          <div className="bg-gradient-nav h-screen w-full rounded-2xl backdrop-blur-3xl overflow-auto">
            <div className="w-[100%] flex justify-center items-center mt-[5px]">
              <Image
                src={enterprise?.logo ?? "/logo.png"}
                height={80}
                width={80}
                alt="avatar"
                className="rounded-full w-[70px] h-[70px] object-cover"
              />
            </div>

            {/* <div className="relative h-1">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </div>
            <div className="relative h-1">
              <div className="absolute inset-0 bg-white"></div>
              <div className="absolute left-0 right-0 mx-auto w-2/3 bg-gray-300"></div>
            </div> */}
            {/* <div className="relative h-1">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="absolute left-0 right-0 mx-auto w-2/3 bg-gray-300"></div>
            </div> */}

            {/* <div className="relative h-1 mt-[15px]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
              <div className="absolute left-1/6 right-1/6 mx-auto w-2/3 bg-gray-300"></div>
            </div> */}

<div className="relative h-1 mt-[20px]">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
  <div className="absolute left-1/4 right-1/4 mx-auto w-1/2 bg-gray-300"></div>
</div>


{/* <div className="relative h-1">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
  <div className="absolute left-1/6 right-1/6 mx-auto w-2/3 bg-gray-300"></div>
</div> */}


            <div className="p-6">
              <ul>
                <NavItem
                  exact
                  svg="dashboard"
                  name="Dashboard"
                  href={`/${enterprise?.id}/dashboard`}
                />
                <NavItem
                  svg="chat"
                  name="Chat"
                  href={`/${enterprise?.id}/dashboard/chat`}
                />
                <NavItem
                  svg="crm"
                  name="CRM"
                  href={`/${enterprise?.id}/dashboard/crm`}
                />
                {/* <NavItem
                  svg="onboarding"
                  name="Onboarding"
                  noActiveSvg
                  href={`/${enterprise?.id}/dashboard/onboarding`}
                /> */}
                <NavItem
                  svg="clients"
                  name="Clients"
                  href={`/${enterprise?.id}/dashboard/clients`}
                />
                <NavItem
                  svg="todo"
                  name="To Do List"
                  href={`/${enterprise?.id}/dashboard/todo`}
                />
                <NavItem
                  svg="kanban"
                  name="Kanban"
                  href={`/${enterprise?.id}/dashboard/kanban`}
                />
                <NavItem
                  svg="documents"
                  name="Documents"
                  href={`/${enterprise?.id}/dashboard/documents`}
                />
                <NavItem
                  svg="expenses"
                  noActiveSvg
                  name="Dépenses"
                  href={`/${enterprise?.id}/dashboard/expenses`}
                />
                <NavItem
                  svg="invoicing"
                  name="Facturation"
                  href={`/${enterprise?.id}/dashboard/invoicing`}
                />
                <NavItem
                  svg="settings"
                  name="Affiliation"
                  href={`/${enterprise?.id}/dashboard/affiliation`}
                />
                <NavItem
                  svg="settings"
                  name="Paramètres"
                  href={`/${enterprise?.id}/dashboard/settings`}
                />
              </ul>
            </div>
            <div
              // style={{ border: "2px solid red" }}
              className="flex flex-col w-[100%] justify-center items-center text-[white]"
            >
              <img className="mr-8 pt-6" src="/become_aff.svg" alt="refer" />{" "}
              <div className="flex gap-[6px] pb-12">
                <div>
                  <Image
                    src={user?.profileImageUrl ?? "/avart.png"}
                    height={40}
                    width={40}
                    alt="avatar"
                    className="rounded-full w-[40px] h-[40px] object-cover mt-6"
                  />
                </div>
                <div className="flex flex-col text-[12px]">
                  <div className="flex mt-6">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div>{user?.baseUser?.email}</div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative w-4/5 ml-[20%] flex flex-col main grow pl-4 py-10 pr-5">
          {props.header && <LayoutHeader>{props.header}</LayoutHeader>}
          {isLoading && (
            <p className="absolute text-base text-subtitle top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Chargement...
            </p>
          )}
          {error && (
            <p className="absolute text-base text-subtitle top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
