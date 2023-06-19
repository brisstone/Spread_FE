import useSWR from "swr";
import Button from "@/components/button";
import Card, { CardContent, CardHeader } from "@/components/card";
import { BaseHDivider } from "@/components/divider";
import {
  ExpenseTableHead,
  ExpenseTableRow,
  RecentExpenseItem,
} from "@/components/expenses/components";
import KPI from "@/components/kpi";
import Layout, { LayoutHeader } from "@/components/layout";
import Tag from "@/components/tag";
import dummyChartData from "@/data/dummy-chart";
import { valueFormatter } from "@/lib/util";
import { AreaChart } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Expense } from "@/types/general";
import Fetched from "@/components/fetched";
import { Feedback } from "@/components/feedback";

function RecentExpenses() {
  const {
    data: expenses,
    isLoading,
    error,
  } = useSWR<Expense[]>("/expenses/last?limit=4");

  return (
    <div className="relative">
      <p className="text-base text-center mt-5">Recent</p>
      <Fetched
        error={error}
        isLoading={isLoading}
        data={expenses}
        feedbackNoAbsolute
        feedbackClassName=""
        dataComp={(data) =>
          data.length > 0 ? (
            <div className="mt-3">
              {data.map((d) => (
                <RecentExpenseItem
                  key={d.id}
                  name={d.name}
                  amount={d.amount}
                  currency={d.currency.name}
                  description={d.description}
                />
              ))}
            </div>
          ) : (
            <Feedback
              noAbsolute
              className=""
              msg="Vous n'avez créé aucune dépense"
            />
          )
        }
      />
    </div>
  );
}

export function RecentExpensesTable() {
  const {
    data: expenses,
    isLoading,
    error,
  } = useSWR<Expense[]>("/expenses/last?limit=6");

  return (
    <Card className="w-full mt-4">
      <div className="p-7">
        <CardHeader title="Dépenses 🧾" subTitle="+$1200 ce mois ci" />

        <CardContent>
          <Fetched
            error={error}
            isLoading={isLoading}
            data={expenses}
            feedbackNoAbsolute
            feedbackClassName=""
            dataComp={(data) =>
              data.length > 0 ? (
                <table className="table-auto w-full">
                  <ExpenseTableHead />
                  <tbody>
                    {data.map((d) => (
                      <ExpenseTableRow smallerPadding key={d.id} data={d} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <Feedback
                  noAbsolute
                  className=""
                  msg="Vous n'avez créé aucune dépense"
                />
              )
            }
          />
        </CardContent>
      </div>
    </Card>
  );
}

export default function Expenses() {
  const { asPath } = useRouter();
  return (
    <Layout>
      <Card className="flex flex-col w-full h-full grow p-7">
        <div className="flex w-full justify-between items-start">
          <LayoutHeader>Dépenses 🧾</LayoutHeader>

          <Link href={`${asPath}/list`}>
            <Button>Voir Dépenses</Button>
          </Link>
        </div>
        <div className="grow w-full flex">
          <div className="basis-[30%] max-w-[30%]">
            <div className="">
              <KPI
                data={{
                  name: "Aujourd’hui | C.A",
                  value: "$12,000",
                }}
                className="grow"
              />
            </div>
            <div className="mt-5">
              <div>
                <p className="uppercase tracking-widest text-[16px] leading-[19px]">
                  Latest Activity
                </p>
                <BaseHDivider className="!bg-[#CECECE] mt-4 w-full" />
              </div>
            </div>
            <RecentExpenses />
          </div>

          <div className="grow ml-10 basis-[70%] max-w-[70%]">
            <Card className="w-full mt-5">
              <div className="p-7">
                <CardHeader
                  title="Chiffre d’Affaires 💰"
                  subTitle="(+5k) ce mois ci en 2023"
                />

                <CardContent>
                  <AreaChart
                    className="mt-8 h-44 overflow-auto"
                    data={dummyChartData}
                    categories={["Gross Volume"]}
                    index="Month"
                    colors={["indigo"]}
                    valueFormatter={valueFormatter}
                    showYAxis={false}
                    showLegend={false}
                  />
                </CardContent>
              </div>
            </Card>

            <RecentExpensesTable />
          </div>
        </div>
      </Card>
    </Layout>
  );
}
