import useSWRInfinite from "swr/infinite";
import Button from "@/components/button";
import Card, { CardContent, CardHeader } from "@/components/card";
import Layout, { LayoutHeader } from "@/components/layout";
import Link from "next/link";
import { ExpenseTableHead, ExpenseTableRow } from "@/components/expenses/components";
import { useRouter } from "next/router";
import { Expense } from "@/types/general";
import { getPgKey } from "@/lib/util";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Fetched from "@/components/fetched";
import { Feedback } from "@/components/feedback";

export default function ExpenseList() {
  const { asPath } = useRouter();

  const {
    data: expenses,
    error,
    isLoading,
    size,
    mutate,
    setSize,
  } = useSWRInfinite<Expense[]>(getPgKey<Expense>(() => "/expenses"));

  const { observerTarget } = useInfiniteScroll(setSize);

  return (
    <Layout>
      <Card className="flex flex-col w-full h-full grow p-7">
        <div className="flex w-full justify-between items-start">
          <LayoutHeader>Dépenses 🧾</LayoutHeader>

          <Link href={`${asPath.substring(0, asPath.lastIndexOf("/"))}/new`}>
            <Button>+ Ajouter une Dépense</Button>
          </Link>
        </div>

        <Card className="relative w-full mt-4">
          <div className="p-7">
            <CardHeader title="Dépenses 🧾" subTitle="+$1200 ce mois ci" />

            <CardContent>
              <Fetched
                error={error}
                isLoading={isLoading}
                data={expenses}
                feedbackNoAbsolute
                dataComp={(data) =>
                  data[0] && data[0].length > 0 ? (
                    <table className="table-auto w-full">
                      <ExpenseTableHead />
                      <tbody>
                        {data.flat().map((d) => (
                          <ExpenseTableRow data={d} key={d.id} />
                        ))}
                        <tr className="h-px" ref={observerTarget}></tr>
                      </tbody>
                    </table>
                  ) : (
                    <Feedback noAbsolute msg="Vous n'avez créé aucune dépense" />
                  )
                }
              />
            </CardContent>
          </div>
        </Card>
      </Card>
    </Layout>
  );
}
