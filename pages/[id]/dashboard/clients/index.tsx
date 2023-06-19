import useSWR from "swr";
import Button from "@/components/button";
import Card from "@/components/card";
import ClientCard from "@/components/client-card";
import Layout from "@/components/layout";
import useUserAndEnterprise from "@/data/user-user-enterprise";
import Link from "next/link";
import { Client } from "@/types/general";
import Fetched from "@/components/fetched";

export default function Clients() {
  const { enterprise } = useUserAndEnterprise();

  const { data: clients, error, isLoading } = useSWR<Client[]>("/crm/clients");

  return (
    <Layout header="Clients ‍🧑‍💼">
      <Card className="flex flex-col p-8 grow">
        <Fetched
          error={error}
          errorComp={
            <p className="text-base text-subtitle text-center">
              Échec de la récupération des données
            </p>
          }
          isLoading={isLoading}
          isLoadingComp={
            <p className="text-base text-subtitle text-center">Chargement...</p>
          }
          data={clients}
          dataComp={(data) => (
            <div className="w-full h-full flex flex-wrap justify-center items-center px-10 py-10 gap-10">
              {data.length > 0 ? (
                data.map((d) => (
                  <ClientCard
                    id={d.id}
                    name={d.name}
                    brief={d.brief}
                    href={`/${enterprise?.id}/dashboard/clients/${d.id}`}
                    key={d.id}
                  />
                ))
              ) : (
                <p className={`text-base text-subtitle text-center`}>
                  Vous n&apos;avez pas encore créé de données client
                </p>
              )}
              <div className="w-full mt-12 flex justify-center">
                <Link href={`/${enterprise?.id}/dashboard/clients/new`}>
                  <Button
                    iconUrl="/images/plus.svg"
                    className="shadow-none !text-base"
                  >
                    Nouveau Client
                  </Button>
                </Link>
              </div>
            </div>
          )}
        />
      </Card>
    </Layout>
  );
}
