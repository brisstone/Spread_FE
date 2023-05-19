import useSWR, { useSWRConfig } from "swr";
import { useDrag, useDrop } from "react-dnd";
import { Props } from "@/types/props";
import Button from "../button";
import Card from "../card";
import IconButton from "../iconbutton";
import { CRMCategory, CRMLead } from "@/types/general";
import Fetched from "../fetched";
import { useState } from "react";

import { useAlert } from "@/contexts/alert-context";
import { DragTypes } from "@/types/enum";
import CRMLeadModal from "./lead-modal";
import { moveLead } from "@/services";

interface CRMCardProps extends Props {
  data: CRMCategory;
}

function CRMLeadItem({ lead }: { lead: CRMLead }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.CRMLEAD,
    item: lead,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li
      ref={drag}
      className={`flex justify-between py-3 ${
        isDragging ? "opacity-50" : "opacity-100"
      } cursor-move items-center`}
    >
      <p className="text-[16px] leading-[20px]">{lead.name}</p>
      <Button className="shadow-none text-xs leading-[14px] py-[10px] px-6">
        👉 Onboard
      </Button>
    </li>
  );
}

export default function CRMCard(props: CRMCardProps) {
  const { data, error, isLoading } = useSWR<CRMLead[]>(() =>
    props.data.id ? `/crm/categories/${props.data.id}/leads` : null
  );

  const { mutate } = useSWRConfig();

  const { pushAlert } = useAlert();

  const [modalOpen, setModalOpen] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.CRMLEAD,
    drop: (item: CRMLead) => {
      console.log("dropped", item);
      moveLead(item.id, props.data.id)
        .then((data) => {
          // remove item from old category
          mutate(
            `/crm/categories/${item.categoryId}/leads`,
            (existing: CRMLead[] | undefined): CRMLead[] => {
              if (!existing) return [];
              return existing.filter((l) => l.id !== item.id);
            }
          );

          // place in new category
          mutate(
            `/crm/categories/${props.data.id}/leads`,
            (existing: CRMLead[] | undefined): CRMLead[] => {
              if (!existing) return [data];
              return [...existing, data];
            }
          );
        })
        .catch((e) => {
          pushAlert(e?.message || "Quelque chose s'est mal passé");
        });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      <CRMLeadModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        categoryId={props.data.id}
      />
      <Card className={`grow ${props.className}`}>
        <div className="p-5">
          <div className="flex w-full items-center gap-4 justify-between">
            <p className="text-[16px] leading-[20px]">{props.data.name}</p>
            <p className="text-base leading-[20px]">$10k (3 Leads)</p>
            <IconButton
              width={22}
              height={22}
              iconUrl="/images/threedots.svg"
            />
          </div>

          <div className="mt-8 w-full">
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
              dataComp={(leads) => (
                <ul className={`w-full ${isOver ? "bg-red" : ""}`} ref={drop}>
                  {leads.length > 0 ? (
                    leads.map((l) => <CRMLeadItem lead={l} key={l.id} />)
                  ) : (
                    <p className="text-base text-subtitle text-center">
                      Aucun prospect dans cette catégorie{" "}
                    </p>
                  )}
                </ul>
              )}
            />
          </div>

          <Button
            onClick={() => setModalOpen(true)}
            className="w-full bg-white text-black shadow-none mt-[18px]"
          >
            ✔️ Ajouter
          </Button>
        </div>
      </Card>
    </>
  );
}
