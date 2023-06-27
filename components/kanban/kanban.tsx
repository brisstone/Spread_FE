import useSWRInfinite from "swr/infinite";
import Image from "next/image";
import Checkbox from "../checkbox/index";
import Glass from "../glass";
import { ScrollableList } from "../list";
import IconButton from "../iconbutton";
import Card from "../card";
import { KanbanCategory, KanbanItem } from "@/types/general";
import { getPgKey, swrInfiniteMutate } from "@/lib/util";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Fetched from "../fetched";
import CreateKanbanItemModal from "./create-kanban-item";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragTypes, KanbanDefault } from "@/types/enum";
import { closeKanbanItem, moveKanbanItem, moveLead } from "@/services";
import { useAlert } from "@/contexts/alert-context";
import { KeyedMutator, unstable_serialize, useSWRConfig } from "swr";

interface KanbanItemProps {
  data: KanbanItem;
  categoryName: string;
  mutate: KeyedMutator<KanbanItem[][]>;
}

export function KanbanItemCard(props: KanbanItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.KANBANITEM,
    item: {
      data: props.data,
      mutate: props.mutate,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const { pushAlert } = useAlert();

  return (
    <li className="mt-3 first:mt-0" ref={drag}>
      <Glass className="flex flex-col px-3 py-5 min-h-[147px]">
        <div className="flex justify-between items-center">
          <p className="text-[16px] leading-[26px]">{props.data.title}</p>
          {props.categoryName !== KanbanDefault.CLOSED && (
            <Checkbox
              type="checkbox"
              id={props.data.id}
              name={props.data.id}
              onChange={() => {
                closeKanbanItem(props.data.id)
                  .then(() => {
                    props.mutate();
                  })
                  .catch((e) => pushAlert(e.message));
              }}
              // value={props.id}
              // className="translate-y-full"
              // {...props}
            />
          )}
        </div>

        {/* item body */}
        <div className="grow">
          <p className="text-sm">{props.data.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src="/images/todocalendar.svg"
            height={20}
            width={20}
            alt="company profile image"
            className="rounded-full border border-solid border-white"
          />

          <Image
            src="/images/profilecompany.png"
            height={20}
            width={20}
            alt="company profile image"
            className="rounded-full border border-solid border-white"
          />
        </div>
      </Glass>
    </li>
  );
}

export function KanbanCard({ category }: { category: KanbanCategory }) {
  const {
    data: items,
    error,
    isLoading: itemsLoading,
    size,
    mutate,
    setSize,
  } = useSWRInfinite<KanbanItem[]>(
    getPgKey<KanbanItem>(() =>
      category.id ? `/kanban/items?categoryId=${category.id}` : null
    )
  );


  const { pushAlert } = useAlert();

  const [modalOpen, setModalOpen] = useState(false);

  const { observerTarget } = useInfiniteScroll(setSize);

  // const { mutate: globalMutate, cache } = useSWRConfig();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragTypes.KANBANITEM,
    drop: (item: {
      data: KanbanItem;
      mutate: KeyedMutator<KanbanItem[][]>;
    }) => {
      moveKanbanItem(item.data.id, category.id)
        .then((data) => {
          // remove item from old category
          // const keys = [...cache.keys()];
          // console.log("keys", keys);
          // keys
          //   .filter(
          //     (k) => typeof k === "string" && k.startsWith(`/kanban/items`)
          //   )
          //   .forEach((k) => {
          //     globalMutate(unstable_serialize(k));
          //   });

          // NOT CLEAN. GLOBAL MUTATE WAS NOT WORKING, SO I USED
          // THIS METHOD AS A PLACEHOLDER METHOD (BY PASSING MUTATE THROUGH PROPS, not recommended) TO MUTATE THE DATA IN THE PREVIOUS
          // CATEGORY. CONSIDER MAKING GLOBAL MUTATE WORK WITH THE KEY OF THE PREVIOUS
          // CATEGORY.
          item.mutate((d) => {
            if (!d) return [];
            const copy = [...d];
            copy.forEach((k, i) => {
              copy[i] = copy[i].filter((ki) => ki.id !== item.data.id);
            });

            return copy;
          });

          mutate(swrInfiniteMutate(data, "bottom"));
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
      <CreateKanbanItemModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        categoryId={category.id}
        mutate={mutate}
      />
      <Card className="flex flex-col p-5 !h-full basis-80 min-w-[20rem]">
        <div className="flex justify-between mb-10">
          <p className="text-[16px] leading-[26px]">{category.name}</p>
          <div className="flex">
            <IconButton
              onClick={() => setModalOpen(true)}
              className="-mr-2"
              iconUrl="/images/plus.svg"
              width={15}
              height={15}
            />
            <IconButton iconUrl="/images/ellipse.svg" width={15} height={15} />
          </div>
        </div>

        <ScrollableList className="grow relative" ref={drop}>
          <Fetched
            error={error}
            isLoading={itemsLoading}
            data={items}
            dataComp={(kis) =>
              kis
                .flat()
                .map((k) => (
                  <KanbanItemCard
                    mutate={mutate}
                    data={k}
                    key={k.id}
                    categoryName={category.name}
                  />
                ))
            }
          />
          <li className="h-px" ref={observerTarget}></li>
        </ScrollableList>
      </Card>
    </>
  );
}
