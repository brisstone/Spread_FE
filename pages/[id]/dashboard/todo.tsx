import useSWRInfinite from "swr/infinite";
import Button from "@/components/button";
import Card from "@/components/card";
import { BaseHDivider } from "@/components/divider";
import Layout, { LayoutHeader } from "@/components/layout";
import { ScrollableList } from "@/components/list";
import { TodoItem } from "@/components/todo";
import { getPgKey } from "@/lib/util";
import { Task } from "@/types/general";
import { useEffect, useRef, useState } from "react";
import { entries } from "lodash";
import Fetched from "@/components/fetched";

import utilStyles from "@/styles/utils.module.css";
import CreateTodoModal from "@/components/todo/create-modal";

export function TaskHeader() {
  return <p className="text-[30px] leading-[35px]">Tâches 🎯</p>;
}

export default function Todo() {
  const {
    data: tasks,
    error,
    isLoading: tasksLoading,
    size,
    mutate,
    setSize,
  } = useSWRInfinite<Task[]>(getPgKey<Task>(() => "/tasks"));

  const [modalOpen, setModalOpen] = useState(false);

  const observerTarget = useRef(null);
  const target = observerTarget.current;

  useEffect(() => {
    console.log("effecting");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("intersecting...", entries);
          setSize((s) => s + 1);
        }
      },
      { threshold: 1 }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      console.log("unmounting");
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [target, setSize]);

  console.log("data", tasks);
  console.log("size", size);

  return (
    <Layout header="To Do List  ✅">
      <CreateTodoModal
        mutate={mutate}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
      <Card className="flex flex-col grow sticky p-10">
        <TaskHeader />
        <BaseHDivider className="mt-5" />

        <div className="flex flex-col w-full grow justify-between">
          <Fetched
            error={error}
            errorComp={
              <p
                className={`text-base text-subtitle text-center ${utilStyles.absoluteCentered}`}
              >
                Échec de la récupération des données
              </p>
            }
            isLoading={tasksLoading}
            isLoadingComp={
              <p
                className={`text-base text-subtitle text-center ${utilStyles.absoluteCentered}`}
              >
                Chargement...
              </p>
            }
            data={tasks}
            dataComp={(data) => (
              <>
                {data.flat().length > 0 ? (
                  <ScrollableList className="w-full grow mt-5">
                    {data.flat().map((t) => (
                      <TodoItem
                        mutate={mutate}
                        id={t.id}
                        key={t.id}
                        text={t.title}
                        details={t.description || ""}
                        checked={t.done}
                      />
                    ))}
                    <li className="h-px" ref={observerTarget}></li>
                  </ScrollableList>
                ) : (
                  <p className="text-base text-subtitle text-center mt-20">
                    Vous n&apos;avez pas encore créé de tâches
                  </p>
                )}
                <div className="mt-8 flex gap-6">
                  <Button
                    iconUrl="/images/plus.svg"
                    className="shadow-none !text-base"
                    onClick={() => setModalOpen(true)}
                  >
                    Nouvelle Tâche
                  </Button>
                  {/* 
                  <Button className="shadow-none !text-base bg-white text-black">
                    Modifier
                  </Button> */}
                </div>
              </>
            )}
          />
        </div>
      </Card>
    </Layout>
  );
}

Todo.Layout = Layout;
