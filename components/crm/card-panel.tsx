import useSWR from "swr";
import { DndProvider } from "react-dnd";
// import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CRMCategory, CRMCategoryWithCount } from "@/types/general";
import CRMCard from "./crm-card";
import KPI from "../kpi";
import Fetched from "../fetched";

export default function CardPanel() {
  const { data, error, isLoading } = useSWR<CRMCategoryWithCount[]>("/crm/categories");
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex w-full gap-6 ">
        <KPI className="grow" />
        <KPI className="grow" />
        <KPI className="grow" />
        <KPI className="grow" />
      </div>
        <div className="flex overflow-x-auto w-full mt-7 gap-6 justify-evenly items-stretch">
          <Fetched
            error={error}
            errorComp={
              <p className="text-base text-subtitle text-center">
                Échec de la récupération des données
              </p>
            }
            isLoading={isLoading}
            isLoadingComp={
              <p className="text-base text-subtitle text-center">
                Chargement...
              </p>
            }
            data={data}
            dataComp={(categories) =>
              categories.map((c) => <CRMCard data={c} key={c.id} />)
            }
          />
        </div>
    </DndProvider>
  );
}
