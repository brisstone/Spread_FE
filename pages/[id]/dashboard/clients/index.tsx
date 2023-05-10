import Button from "@/components/button";
import Card from "@/components/card";
import ClientCard from "@/components/client-card";
import Glass from "@/components/glass";
import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";

export default function Clients() {
  return (
    <Layout header="Clients ‍🧑‍💼">
      <Card className="">
        <div className="w-full h-full flex flex-wrap justify-center items-center px-10 py-10 gap-10">
          <ClientCard />
          <ClientCard />
          <ClientCard />
          <ClientCard />
          <ClientCard />
          <ClientCard />

          <div className="w-full mt-12 flex justify-center">
            <Link href="/dashboard/clients/new">
              <Button
                iconUrl="/images/plus.svg"
                className="shadow-none !text-base"
              >
                Nouveau Client
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </Layout>
  );
}
