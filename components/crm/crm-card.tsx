import useSWR, { useSWRConfig } from "swr";
import { useDrag, useDrop } from "react-dnd";
import { useState } from "react";

import { Props } from "@/types/props";
import { CRMCategoryWithCount, CRMLead } from "@/types/general";
import { useAlert } from "@/contexts/alert-context";
import { AlertType, DragTypes } from "@/types/enum";
import { moveLead, onboardLead } from "@/services";

import Button from "../button";
import Card from "../card";
import IconButton from "../iconbutton";
import CRMLeadModal from "./lead-modal";
import Fetched from "../fetched";
import useLeads from "@/data/use-leads";
import { ScrollableList } from "../list";
import { Popover } from "react-tiny-popover";
import EditCRMCategoryModal from "./edit-crm-category";
// import useUserAndEnterprise from "@/data/user-user-enterprise";
// import Link from "next/link";

interface CRMCardProps extends Props {
  data: CRMCategoryWithCount;
}

function CRMLeadItem({ lead }: { lead: CRMLead }) {
  const { pushAlert } = useAlert();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.CRMLEAD,
    item: lead,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [loading, setLoading] = useState(false);

  const { mutate } = useLeads(lead.categoryId);

  // const { enterprise } = useUserAndEnterprise();

  return (
    <li
      ref={drag}
      className={`flex justify-between py-3 ${
        isDragging ? "opacity-50" : "opacity-100"
      } cursor-move items-center`}
    >
      <p className="text-[16px] leading-[20px]">{lead.name}</p>
      <p className="text-[16px] leading-[20px]">
        <span>Amount:</span> {lead.amount}
      </p>
      {!lead.onboarding ? (
        <Button
          loading={loading}
          className="shadow-none text-xs leading-[14px] py-[10px] px-6"
          onClick={() => {
            setLoading(true);
            onboardLead(lead.id)
              .then((data) => {
                mutate((prev) => {
                  if (!prev) return prev;
                  const index = prev.findIndex((p) => p.id === lead.id);
                  if (!index || index < 0) return prev;

                  const copy = [...prev];
                  copy[index] = data.lead;
                  return copy;
                });
                setLoading(false);
                pushAlert(
                  "Un e-mail d'intégration a été envoyé",
                  AlertType.SUCCESS
                );
              })
              .catch((e) => {
                setLoading(false);
                pushAlert(e.message);
              });
          }}
        >
          👉 Onboard
        </Button>
      ) : (
        <span className="text-subtitle text-xs">
          {lead.onboarding.completedAt ? "Intégré" : "Email envoyé"}
        </span>
      )}
    </li>
  );
}

export default function CRMCard(props: CRMCardProps) {
  const { data, error, isLoading, mutate } = useLeads(props.data.id);

  const { mutate: mutateGlobal } = useSWRConfig();

  const { pushAlert } = useAlert();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.CRMLEAD,
    drop: (item: CRMLead) => {
      moveLead(item.id, props.data.id)
        .then((data) => {
          // remove item from old category
          mutateGlobal(
            `/crm/leads?categoryId=${item.categoryId}`,
            (existing: CRMLead[] | undefined): CRMLead[] => {
              if (!existing) return [];
              return existing.filter((l) => l.id !== item.id);
            }
          );

          // place in new category
          mutate((existing: CRMLead[] | undefined): CRMLead[] => {
            if (!existing) return [data];
            return [...existing, data];
          });
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
      <EditCRMCategoryModal
        open={modalCOpen}
        handleClose={() => setModalCOpen(false)}
        name={props.data?.name}
        id={props.data?.id}
      />
      {console.log(props.data, "dmmdmdmdd")}
      <Card className={`!h-full basis-1/4 min-w-[25%] flex flex-col`}>
        <div className="p-5 h-full flex flex-col">
          <div className="flex w-full items-center gap-4 justify-between">
            <p className="text-[16px] leading-[20px]">{props.data.name}</p>
            <p className="text-base leading-[20px]">
              {props.data.leadCount} Lead{props.data.leadCount === 1 ? "" : "s"}
            </p>

            <Popover
              isOpen={isPopoverOpen}
              positions={["bottom", "bottom", "top", "left"]} // preferred positions by priority
              content={
                <div style={{ color: "", background: "white", padding: "5px" }}>
                  <div
                    onClick={() => {
                      setModalCOpen(true);
                    }}
                  >
                    Edit
                  </div>
                </div>
              }
            >
              <div
                style={{ color: "white" }}
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                <IconButton
                  iconUrl="/images/ellipse.svg"
                  width={15}
                  height={15}
                />
              </div>
            </Popover>
          </div>

          <div className="mt-8 w-full relative grow">
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
                <ScrollableList
                  className={`grow relative w-full h-full ${
                    isOver ? "bg-red" : ""
                  }`}
                  ref={drop}
                >
                  {leads.length > 0 ? (
                    leads.map((l) => <CRMLeadItem lead={l} key={l.id} />)
                  ) : (
                    <p className="text-base text-subtitle text-center">
                      Aucun prospect dans cette catégorie
                    </p>
                  )}
                </ScrollableList>
              )}
            />
          </div>

          <Button
            onClick={() => setModalOpen(true)}
            className="w-full bg-white !text-black shadow-none mt-[18px]"
          >
            ✔️ Ajouter
          </Button>
        </div>
      </Card>
    </>
  );
}
