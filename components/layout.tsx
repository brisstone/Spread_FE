import { Props } from "@/types/props";
import Link from "next/link";
import { NavItem } from "./navigation";
import Background from "./background";

interface LayoutProps extends Props {
  header: string;
}

export default function Layout(props: LayoutProps) {
  return (
    <Background>
      {/** TODO add container for large screens */}
      <div className="flex min-h-screen w-full overflow-y-auto">
        <nav className="sticky top-0 left-0 bottom-0 w-1/5 p-[10px]">
          <div className="bg-gradient-nav h-screen w-full rounded-2xl backdrop-blur-3xl">
            <div className="p-6">
              <ul>
                <NavItem svg="/images/stat.svg" active name="Dashboard" href="/" />
                <NavItem svg="/images/chat.svg" name="Chat" href="/chat" />
                <NavItem svg="/images/chat.svg" name="Login" href="/login" />
                <NavItem svg="/images/chat.svg" name="Forgot Password" href="/forgot-password" />
                <NavItem svg="/images/chat.svg" name="CRM" href="/crm" />
                <NavItem svg="/images/chat.svg" name="Clients" href="/clients" />
              </ul>
            </div>
          </div>
        </nav>

        <main className="flex flex-col main grow pl-4 py-10 pr-5">
          <header className="mb-5">
            <h1 className="text-xl">{props.header}</h1>
          </header>
          {props.children}
        </main>
      </div>
    </Background>
  );
}
