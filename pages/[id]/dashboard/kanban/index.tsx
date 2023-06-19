import useSWR from "swr";
import Button from "@/components/button";
import CreateKanbanCatModal from "@/components/kanban/create-kanban-category";
import { KanbanCard } from "@/components/kanban/kanban";
import Layout from "@/components/layout";
import { useState } from "react";
import { KanbanCategory } from "@/types/general";
import Fetched from "@/components/fetched";
import { ErrorFeedback, LoadingFeedback } from "@/components/feedback";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter } from "next/router";
import ClientsDropdown from "@/components/client-dropdown";

export default function Kanban() {
  const [cOpen, setCOpen] = useState(false);
  const router = useRouter();

  const [clientId, setClientId] = useState<string | null>(null);

  const { data, error, isLoading } = useSWR<KanbanCategory[]>(
    `/kanban/categories${clientId ? `?clientId=${clientId}` : ""}`
  );

  return (
    <Layout header="Kanban 📄">
      <DndProvider backend={HTML5Backend}>
        <CreateKanbanCatModal
          open={cOpen}
          handleClose={() => setCOpen(false)}
        />
        <div className="flex w-full items-center justify-between mb-5">
          <ClientsDropdown
            defaultLabel="À l'échelle de l'organisation"
            value={clientId || ""}
            onChange={(e) => setClientId((e.target as any).value)}
          />
          <Button
            iconUrl="/images/plus.svg"
            className="shadow-none !text-base"
            onClick={() => setCOpen(true)}
          >
            Ajouter une Liste
          </Button>
        </div>
        <div className="flex flex-col grow">
          <div className="flex grow items-stretch gap-5 overflow-x-auto">
            <Fetched
              error={error}
              errorComp={<ErrorFeedback />}
              isLoading={isLoading}
              isLoadingComp={<LoadingFeedback />}
              data={data}
              dataComp={(categories) =>
                categories.map((c) => <KanbanCard category={c} key={c.id} />)
              }
            />
          </div>
        </div>
      </DndProvider>
    </Layout>
  );
}

Kanban.Layout = Layout;
